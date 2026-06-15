"use client";

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe. Please try again later.');
      }

      setStatus('success');
      setEmail('');
    } catch (err: any) {
      console.error('Newsletter subscription error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white/10 border border-green-400/50 rounded-lg px-4 py-3 text-sm flex items-center gap-3 text-green-300">
        <CheckCircle2 className="h-5 w-5 shrink-0" />
        <span className="font-medium">Thanks for subscribing! Check your email.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="flex group relative">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address" 
          disabled={status === 'loading'}
          required
          className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-3 text-sm w-full outline-none focus:border-white focus:bg-white/15 transition-all text-white placeholder:text-white/50 disabled:opacity-50"
        />
        <Button 
          type="submit" 
          variant="secondary" 
          disabled={status === 'loading' || !email}
          className="rounded-l-none px-4 h-auto hover:bg-white transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? (
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
      
      {status === 'error' && (
        <div className="text-red-300 flex items-start gap-1.5 text-xs mt-1 bg-red-500/10 p-2 rounded">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
