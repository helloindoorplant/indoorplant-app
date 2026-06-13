'use client';

import { Suspense } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center">Loading...</div>}>
      <AuthForm initialMode="signup" />
    </Suspense>
  );
}
