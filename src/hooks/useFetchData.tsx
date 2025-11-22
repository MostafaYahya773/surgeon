'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '../utils/supabase/client';

export function useFetchData(endPoint: string | null) {
  const fetchManualReports = async () => {
    const { data, error } = await createClient()
      .from(endPoint!)
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  };

  return useQuery({
    queryKey: [`$fetching_${endPoint}`, endPoint],
    queryFn: fetchManualReports,
    enabled: !!endPoint,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
