'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '../utils/supabase/client';

export function useSelectDataById(dataId: string, endPoint: string) {
  const fetchManualReport = async () => {
    const { data } = await createClient()
      .from(endPoint)
      .select('*')
      .eq('id', dataId)
      .single();
    return data;
  };

  return useQuery({
    queryKey: [`$edit_${endPoint}`, dataId, endPoint],
    queryFn: fetchManualReport,
    enabled: !!dataId && !!endPoint,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
