'use client';

import { useMutation } from '@tanstack/react-query';
import { createClient } from '../utils/supabase/client';

interface ResetEmailValues {
  email: string;
}

export function useConfirmEmail() {
  const supabase = createClient();

  const sendReset = async ({ email }: ResetEmailValues) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://surgeon-woad.vercel.app/auth/ResetPassword',
    });

    if (error) throw new Error(error.message);

    return true;
  };

  return useMutation({
    mutationKey: ['send-reset-email'],
    mutationFn: sendReset,
  });
}
