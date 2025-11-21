'use client';

import { useMutation } from '@tanstack/react-query';
import { createClient } from '../utils/supabase/client';
import { ConfirmmPassword } from '../interfaces/index';

export function useResetPassword() {
  const supabase = createClient();

  const updatePassword = async ({ password }: ConfirmmPassword) => {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    if (error) throw new Error(error.message);
    return data;
  };

  return useMutation({
    mutationKey: ['update-password'],
    mutationFn: updatePassword,
  });
}
