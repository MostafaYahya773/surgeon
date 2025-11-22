'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '../utils/supabase/client';
export function useAddData(endPoint: string) {
  const queryClient = useQueryClient();
  const addData = async (values: any) => {
    const {
      data: { user },
    } = await createClient().auth.getUser();
    const dataInsert = {
      ...values,
      auth_id: user?.id,
    };
    return await createClient().from(endPoint).insert([dataInsert]);
  };

  return useMutation({
    mutationKey: [endPoint],
    mutationFn: addData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`$fetching_${endPoint}`] });
    },
  });
}
