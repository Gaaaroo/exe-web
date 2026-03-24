'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');

  useEffect(() => {
    const run = async () => {
      const url = new URL(window.location.href);
      const params = url.searchParams;
      const next = params.get('next') ?? '/';
      const section = params.get('section');

      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setStatus('error');
        router.replace('/login?error=auth');
        return;
      }

      if (!data.session) {
        setStatus('error');
        router.replace('/login?error=auth');
        return;
      }

      setStatus('ok');
      const target = section ? `${next}#${section}` : next;
      router.replace(target);
    };
    run();
  }, [router]);

  const messages = {
    loading: { text: 'Đang xác thực...', icon: Loader2 },
    ok: {
      text: 'Đăng nhập thành công, đang chuyển hướng...',
      icon: CheckCircle2,
    },
    error: { text: 'Đang chuyển về trang đăng nhập...', icon: ArrowLeft },
  };
  const { text, icon: Icon } = messages[status];
  const isSpinning = status === 'loading';

  return (
    <div className='min-h-screen bg-background flex items-center justify-center px-6 dong-son-pattern'>
      <div className='w-full max-w-sm border border-parchment/10 bg-card/80 backdrop-blur-sm p-8 text-center'>
        <div className='flex justify-center mb-6'>
          <Icon
            className={`w-12 h-12 text-gold ${isSpinning ? 'animate-spin' : ''}`}
            strokeWidth={1.5}
          />
        </div>
        <p className='font-body text-parchment/80 text-sm tracking-wide'>
          {text}
        </p>
        {status === 'loading' && (
          <p className='font-body text-parchment/40 text-xs mt-3'>
            Vui lòng đợi trong giây lát
          </p>
        )}
      </div>
    </div>
  );
}
