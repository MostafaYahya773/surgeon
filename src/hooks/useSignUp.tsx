'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '../utils/supabase/client';

export function useSignUp() {
  const queryClient = useQueryClient();

  const addDoctor = async (values: any) => {
    const { email, password, name, phone, date_of_birth, specialization } =
      values;

    // 1️⃣ تسجيل الدكتور في Supabase Auth
    const { data: signUpData, error: signUpError } =
      await createClient().auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone,
            date_of_birth,
            specialization,
          },
        },
      });

    if (signUpError) throw signUpError;
    if (!signUpData.user) throw new Error('User not created');

    const user = signUpData.user;

    const { data: doctorData, error: doctorError } = await createClient()
      .from('doctors')
      .insert([
        {
          auth_id: user.id,
          name,
          email,
          date_of_birth,
          phone,
          specialization,
        },
      ])
      .select();

    if (doctorError) throw doctorError;
    return doctorData;
  };

  return useMutation({
    mutationKey: ['signUp'],
    mutationFn: addDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signUp'] });
    },
  });
}
