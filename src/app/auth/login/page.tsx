'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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
    <div className="min-h-screen bg-gradient-to-br from-primary to-accent py-12 px-4 flex items-center">
      <div className="max-w-md w-full mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-heading text-white mb-2">
            MyKeja
          </h1>
          <p className="text-white/80">Welcome back</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-glow-lg">
          <h2 className="text-2xl font-bold font-heading mb-6 text-white">
            Sign In
          </h2>

          {/* Login Method Toggle */}
          <div className="flex gap-2 mb-6 bg-white/10 p-1 rounded-lg">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 rounded-md font-semibold transition-all ${
                loginMethod === 'email'
                  ? 'bg-white text-primary'
                  : 'text-white'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-2 rounded-md font-semibold transition-all ${
                loginMethod === 'phone'
                  ? 'bg-white text-primary'
                  : 'text-white'
              }`}
            >
              Phone
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {loginMethod === 'email' ? (
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+254712345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm text-white/80 cursor-pointer">Remember me</Label>
            </div>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button className="w-full mb-4" size="lg" onClick={handleLogin}>
            Sign In
          </Button>

          <p className="text-center text-white/80 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-white font-semibold hover:text-white/90">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
