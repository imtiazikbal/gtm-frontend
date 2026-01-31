// app/auth/callback/page.tsx
'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function AuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('token');
    const refresh = searchParams.get('refresh');

    if (token) {
      // 1. Save to LocalStorage or Cookies for persistence
      localStorage.setItem('auth_token', token);
      localStorage.setItem('refresh_token', refresh || '');

      // 2. Send user to the GTM Setup page
      router.push('/'); 
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-slate-600 font-medium">Authenticating with Google...</p>
      </div>
    </div>
  );
}