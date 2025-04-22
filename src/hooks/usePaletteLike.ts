
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const usePaletteLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ paletteId }: { paletteId: string }) => {
      const { error: existingLikeError, data: existingLike } = await supabase
        .from('palette_likes')
        .select()
        .eq('palette_id', paletteId)
        .single();

      if (existingLike) {
        // Unlike
        await supabase.from('palette_likes').delete().eq('palette_id', paletteId);
        await supabase.rpc('decrement_likes', { palette_id: paletteId });
      } else {
        // Like
        await supabase.from('palette_likes').insert({ palette_id: paletteId });
        await supabase.rpc('increment_likes', { palette_id: paletteId });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Please sign in to like palettes",
        variant: "destructive"
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['palettes'] });
    }
  });
};
