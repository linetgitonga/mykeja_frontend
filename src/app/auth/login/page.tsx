'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (loginMethod === 'email' && !email) {
      alert('Please enter email');
      return;
    }
    if (loginMethod === 'phone' && !phone) {
      alert('Please enter phone');
      return;
    }
    if (!password) {
      alert('Please enter password');
      return;
    }
    // TODO: Call login API
    console.log({
      method: loginMethod,
      email: loginMethod === 'email' ? email : undefined,
      phone: loginMethod === 'phone' ? phone : undefined,
      password,
      rememberMe,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary to-accent-secondary py-12 px-4 flex items-center">
      <div className="max-w-md w-full mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-display text-white mb-2">
            MyKeja
          </h1>
          <p className="text-white/80">Welcome back</p>
        </div>

        <Card variant="glass" padding="lg">
          <h2 className="text-heading-2 font-semibold mb-6 text-white">
            Sign In
          </h2>

          {/* Login Method Toggle */}
          <div className="flex gap-2 mb-6 bg-white/10 p-1 rounded-lg">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 rounded-md font-semibold transition-all ${
                loginMethod === 'email'
                  ? 'bg-white text-brand-primary'
                  : 'text-white'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-2 rounded-md font-semibold transition-all ${
                loginMethod === 'phone'
                  ? 'bg-white text-brand-primary'
                  : 'text-white'
              }`}
            >
              Phone
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {loginMethod === 'email' ? (
              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <Input
                label="Phone"
                type="tel"
                placeholder="+254712345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            )}

            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 px-4 pr-10 rounded-md border border-border-default bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-text-secondary"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="text-sm text-white/80">Remember me</span>
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-white hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button className="w-full mb-4" onClick={handleLogin}>
            Sign In
          </Button>

          <p className="text-center text-white/80 text-sm">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-white font-semibold hover:underline">
              Register
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
