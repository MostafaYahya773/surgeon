'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '../utils/supabase/client';
import { useRouter } from 'next/navigation';

interface LoginValues {
  email: string;
  password: string;
}

interface DoctorData {
  auth_id?: string;
  doctor_id?: string;
  name?: string;
  phone?: string;
  date_of_birth?: string;
  specialization?: string;
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const loginUser = async (values: LoginValues): Promise<DoctorData> => {
    const { email, password } = values;
    const { data: loginData, error: loginError } =
      await createClient().auth.signInWithPassword({
        email,
        password,
      });
    if (loginError) throw new Error(loginError.message);
    if (!loginData.user) throw new Error('User not found.');
    const userId = loginData?.user?.id;

    const { data: doctorData, error: doctorError } = await createClient()
      .from('doctors')
      .select('*')
      .eq('auth_id', userId)
      .single();

    if (doctorError) throw new Error(doctorError.message);
    if (!doctorData) throw new Error('Doctor data not found.');
    return doctorData;
  };

  return useMutation({
    mutationKey: ['login'],
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      router.push('/home');
    },
  });
}
