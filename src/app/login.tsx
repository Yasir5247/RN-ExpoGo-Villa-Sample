import { useRouter } from 'expo-router';
import React from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { FocusAwareStatusBar } from '@/components/ui';
import { useAuth, useIsFirstTime } from '@/lib';

export default function Login() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [, setIsFirstTime] = useIsFirstTime();

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    console.log(data);
    await setIsFirstTime(false);
    await signIn({ access: 'access-token', refresh: 'refresh-token' });
    router.replace('/');
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
