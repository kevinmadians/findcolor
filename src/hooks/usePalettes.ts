
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const usePalettes = (tag?: string) => {
  return useQuery({
    queryKey: ['palettes', tag],
    queryFn: async () => {
      let query = supabase
        .from('palettes')
        .select('*');
      
      if (tag) {
        query = query.contains('tags', [tag]);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });
};
