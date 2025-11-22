'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '../utils/supabase/client';

export function useDeleteData(endPoint: string) {
  const queryClient = useQueryClient();
  const deleteData = async (id: string) => {
    return await createClient().from(endPoint).delete().eq('id', id);
  };

  return useMutation({
    mutationKey: [endPoint],
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`$fetching_${endPoint}`] });
    },
  });
}
