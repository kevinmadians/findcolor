import { createClient, RealtimePostgresChangesPayload } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Generate a consistent user ID for the current browser
const getUserId = () => {
  let userId = localStorage.getItem('color_palette_user_id')
  if (!userId) {
    userId = Math.random().toString(36).substring(2) + Date.now().toString(36)
    localStorage.setItem('color_palette_user_id', userId)
  }
  return userId
}

export interface PaletteLikes {
  id: string
  palette_id: string
  likes_count: number
  created_at: string
}

// Cache for likes counts to avoid excessive API calls
const likesCache = new Map<string, { count: number; timestamp: number }>()
const CACHE_DURATION = 2000 // 2 seconds cache

// Callback registry for real-time updates
type UpdateCallback = (paletteId: string, newCount: number) => void
const updateCallbacks = new Set<UpdateCallback>()

// Subscribe to real-time changes
const channel = supabase.channel('palette_likes_changes')

channel
  .on('broadcast', { event: 'likes_update' }, (payload) => {
    const { paletteId, newCount } = payload.payload as { paletteId: string; newCount: number }
    if (paletteId) {
      likesCache.set(paletteId, { count: newCount, timestamp: Date.now() })
      updateCallbacks.forEach(callback => callback(paletteId, newCount))
    }
  })
  .subscribe()

// Function to broadcast like updates
const broadcastLikeUpdate = (paletteId: string, newCount: number) => {
  channel.send({
    type: 'broadcast',
    event: 'likes_update',
    payload: { paletteId, newCount }
  })
}

// Function to register for updates
export const onLikesUpdate = (callback: UpdateCallback) => {
  updateCallbacks.add(callback)
  return () => updateCallbacks.delete(callback)
}

// Helper functions for likes
export const getLikesCount = async (paletteId: string): Promise<number> => {
  // Check cache first
  const cached = likesCache.get(paletteId)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.count
  }

  const { data, error } = await supabase
    .from('palette_likes')
    .select('likes_count')
    .eq('palette_id', paletteId)
    .single()

  if (error) {
    console.error('Error fetching likes:', error)
    return 0
  }

  const count = data?.likes_count || 0
  // Update cache
  likesCache.set(paletteId, { count, timestamp: Date.now() })
  return count
}

export const getLikesCountBatch = async (paletteIds: string[]): Promise<Record<string, number>> => {
  const result: Record<string, number> = {}
  
  // Check cache first
  const uncachedIds = paletteIds.filter(id => {
    const cached = likesCache.get(id)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      result[id] = cached.count
      return false
    }
    return true
  })

  if (uncachedIds.length > 0) {
    const { data, error } = await supabase
      .from('palette_likes')
      .select('palette_id, likes_count')
      .in('palette_id', uncachedIds)

    if (error) {
      console.error('Error fetching batch likes:', error)
    } else if (data) {
      data.forEach(item => {
        result[item.palette_id] = item.likes_count
        // Update cache
        likesCache.set(item.palette_id, { count: item.likes_count, timestamp: Date.now() })
      })
    }

    // Set remaining uncached ids to 0
    uncachedIds.forEach(id => {
      if (!(id in result)) {
        result[id] = 0
        likesCache.set(id, { count: 0, timestamp: Date.now() })
      }
    })
  }

  return result
}

export const hasUserLikedPalette = async (paletteId: string): Promise<boolean> => {
  const userId = getUserId()
  const { data } = await supabase
    .from('user_palette_likes')
    .select('id')
    .eq('user_id', userId)
    .eq('palette_id', paletteId)
    .single()

  return !!data
}

export const getUserLikedPalettes = async (): Promise<string[]> => {
  const userId = getUserId()
  const { data } = await supabase
    .from('user_palette_likes')
    .select('palette_id')
    .eq('user_id', userId)

  return data?.map(row => row.palette_id) || []
}

export const incrementLikes = async (paletteId: string): Promise<number> => {
  try {
    const userId = getUserId()

    // First check if user has already liked this palette
    const hasLiked = await hasUserLikedPalette(paletteId)
    if (hasLiked) {
      throw new Error('User has already liked this palette')
    }

    // Start a transaction by adding user like first
    const { error: userLikeError } = await supabase
      .from('user_palette_likes')
      .insert([{ user_id: userId, palette_id: paletteId }])

    if (userLikeError) {
      throw userLikeError
    }

    // Then increment the total likes count
    const { data: currentData } = await supabase
      .from('palette_likes')
      .select('likes_count')
      .eq('palette_id', paletteId)
      .single()

    if (currentData) {
      const { data: updateData, error: updateError } = await supabase
        .from('palette_likes')
        .update({ likes_count: (currentData.likes_count || 0) + 1 })
        .eq('palette_id', paletteId)
        .select('likes_count')
        .single()

      if (updateError) {
        throw updateError
      }

      const newCount = updateData?.likes_count || currentData.likes_count + 1
      likesCache.set(paletteId, { count: newCount, timestamp: Date.now() })
      // Broadcast the update
      broadcastLikeUpdate(paletteId, newCount)
      return newCount
    }

    // If no record exists, create new record
    const { data: insertData, error: insertError } = await supabase
      .from('palette_likes')
      .insert([{ palette_id: paletteId, likes_count: 1 }])
      .select('likes_count')
      .single()

    if (insertError) {
      throw insertError
    }

    const newCount = insertData?.likes_count || 1
    likesCache.set(paletteId, { count: newCount, timestamp: Date.now() })
    // Broadcast the update
    broadcastLikeUpdate(paletteId, newCount)
    return newCount
  } catch (error) {
    console.error('Error in incrementLikes:', error)
    throw error
  }
}
