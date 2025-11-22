import { createClient } from '../utils/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateData(endPoint: string) {
  const queryClient = useQueryClient();

  const updateData = async ({
    id,
    updatedData,
  }: {
    id: string;
    updatedData: any;
  }) => {
    const { data, error } = await createClient()
      .from(endPoint)
      .update(updatedData)
      .eq('id', id)
      .select();
    if (error) throw error;

    return data;
  };

  return useMutation({
    mutationKey: [`update_${endPoint}`],
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`$fetching_${endPoint}`] });
    },
    onError: (e) => {
      console.log(e);
    },
  });
}
