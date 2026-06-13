'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogIn, UserPlus, Eye, EyeOff, KeyRound, MailCheck } from 'lucide-react';

interface AuthFormProps {
  initialMode: 'login' | 'signup' | 'forgot-password' | 'verify-otp';
}

export function AuthForm({ initialMode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/account/dashboard';

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot-password' | 'verify-otp'>(initialMode);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otp, setOtp] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      if (mode === 'signup') {
        // Register API Call
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        
        if (!res.ok) {
          setError(data.error || 'Failed to create account.');
          setLoading(false);
          return;
        }

        // Auto login after successful registration
        const result = await signIn('credentials', { redirect: false, email, password });
        if (result?.error) {
          setError('Account created, but failed to automatically log in.');
          setLoading(false);
        } else {
          router.push(callbackUrl);
          router.refresh();
        }

      } else if (mode === 'login') {
        // Login API Call via NextAuth
        const result = await signIn('credentials', { redirect: false, email, password });
        if (result?.error) {
          setError('Invalid email or password.');
          setLoading(false);
        } else {
          router.push(callbackUrl);
          router.refresh();
        }

      } else if (mode === 'forgot-password') {
        // Send OTP API Call
        const res = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        
        if (!res.ok) {
          setError(data.error || 'Failed to send reset code.');
        } else {
          setSuccessMsg('Reset code sent! Please check your email.');
          setMode('verify-otp');
        }
        setLoading(false);

      } else if (mode === 'verify-otp') {
        // Reset Password API Call
        const res = await fetch('/api/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp, newPassword }),
        });
        const data = await res.json();
        
        if (!res.ok) {
          setError(data.error || 'Failed to reset password.');
          setLoading(false);
        } else {
          // Password reset successful, auto login with the new password
          const result = await signIn('credentials', { redirect: false, email, password: newPassword });
          if (result?.error) {
            setMode('login');
            setSuccessMsg('Password reset successfully. Please log in.');
            setLoading(false);
          } else {
            router.push(callbackUrl);
            router.refresh();
          }
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div 
      suppressHydrationWarning 
      className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans"
    >
      <div suppressHydrationWarning className="w-full max-w-[440px] bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_24px_rgba(45,106,79,0.15)] border border-border/50">
        
        {/* Top Toggle (Only show on Login/Signup) */}
        {(mode === 'login' || mode === 'signup') && (
          <div className="flex items-center justify-center mb-8">
            <div className="bg-slate-100 p-1 rounded-full flex items-center gap-1">
              <button
                onClick={() => { setMode('login'); setError(''); setSuccessMsg(''); }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  mode === 'login' ? 'bg-white text-foreground shadow-sm' : 'text-slate-500 hover:text-foreground'
                }`}
              >
                <LogIn className="w-4 h-4" /> Login
              </button>
              <button
                onClick={() => { setMode('signup'); setError(''); setSuccessMsg(''); }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  mode === 'signup' ? 'bg-white text-foreground shadow-sm' : 'text-slate-500 hover:text-foreground'
                }`}
              >
                <UserPlus className="w-4 h-4" /> Sign Up
              </button>
            </div>
          </div>
        )}

        {/* Forgot Password Headers */}
        {mode === 'forgot-password' && (
          <div className="text-center mb-8">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <KeyRound className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold font-playfair text-[#1B4332]">Forgot Password?</h2>
            <p className="text-sm text-slate-500 mt-2">Enter your email to receive a 6-digit secure reset code.</p>
          </div>
        )}

        {/* Verify OTP Headers */}
        {mode === 'verify-otp' && (
          <div className="text-center mb-8">
            <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <MailCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold font-playfair text-[#1B4332]">Check your inbox</h2>
            <p className="text-sm text-slate-500 mt-2">We sent a 6-digit code to <strong>{email}</strong></p>
          </div>
        )}

        {/* OAuth Section (Top for Sign Up) */}
        {mode === 'signup' && (
          <div className="mb-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-full h-12 rounded-xl border-border/80 text-sm font-bold flex items-center justify-center gap-3 hover:bg-slate-50"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </Button>
            
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-border/60"></div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">OR</span>
              <div className="flex-1 h-px bg-border/60"></div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium">
              {successMsg}
            </div>
          )}

          {/* Name Field (Only in Signup) */}
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">
                Full Name
              </label>
              <Input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="h-12 rounded-xl bg-slate-50 border-border/60"
              />
            </div>
          )}

          {/* Email Field (Hidden during Verify OTP) */}
          {mode !== 'verify-otp' && (
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">
                Email address
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="h-12 rounded-xl bg-slate-50 border-border/60"
              />
            </div>
          )}

          {/* OTP Field */}
          {mode === 'verify-otp' && (
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">
                6-Digit Reset Code
              </label>
              <Input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0,6))}
                placeholder="000000"
                className="h-12 rounded-xl bg-slate-50 border-border/60 tracking-[0.5em] text-center font-bold text-lg"
              />
            </div>
          )}

          {/* Password Field (Login & Signup) */}
          {(mode === 'login' || mode === 'signup') && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-slate-700">
                  Password
                </label>
                {mode === 'login' && (
                  <button type="button" onClick={() => { setMode('forgot-password'); setError(''); setSuccessMsg(''); }} className="text-xs font-bold text-primary hover:text-primary/80">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 rounded-xl bg-slate-50 border-border/60 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {/* New Password Field (Verify OTP) */}
          {mode === 'verify-otp' && (
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="h-12 rounded-xl bg-slate-50 border-border/60 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div className="flex items-start gap-3 mt-4">
              <input
                type="checkbox"
                id="newsletter"
                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="newsletter" className="text-xs text-slate-500 leading-tight">
                Please keep me updated by email with the latest news, research findings, reward programs, event updates.
              </label>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl text-base font-bold bg-[#2D6A4F] hover:bg-[#1B4332] text-white transition-all mt-4"
          >
            {loading ? 'Processing...' : 
             mode === 'login' ? 'Log In' : 
             mode === 'signup' ? 'Create an account' : 
             mode === 'forgot-password' ? 'Send Reset Code' :
             'Reset Password & Login'}
          </Button>
        </form>

        {/* OAuth Section (Bottom for Login) */}
        {mode === 'login' && (
          <div className="mt-6">
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-border/60"></div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">OR</span>
              <div className="flex-1 h-px bg-border/60"></div>
            </div>
            
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-full h-12 rounded-xl border-border/80 text-sm font-bold flex items-center justify-center gap-3 hover:bg-slate-50"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </Button>
          </div>
        )}

        {/* Footer Link */}
        <div className="mt-8 text-center bg-slate-50 -mx-8 -mb-10 sm:-mx-10 sm:-mb-10 p-6 rounded-b-3xl border-t border-border/40">
          <p className="text-sm font-medium text-slate-600">
            {mode === 'login' ? "Don't have an account yet? " : 
             mode === 'signup' ? "Already have an account? " :
             "Remembered your password? "}
            <button
              onClick={() => {
                setMode(mode === 'login' || mode === 'forgot-password' || mode === 'verify-otp' ? 'signup' : 'login');
                if (mode === 'forgot-password' || mode === 'verify-otp') setMode('login');
              }}
              className="font-bold text-foreground hover:underline ml-1"
            >
              {mode === 'login' ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
