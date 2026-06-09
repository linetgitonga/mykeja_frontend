'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Check } from 'lucide-react';

type Role = 'tenant' | 'agent' | 'owner';
type Step = 'role' | 'contact' | 'otp' | 'setup' | 'success';

export default function RegisterPage() {
  const [step, setStep] = useState<Step>('role');
  const [role, setRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    businessName: '',
    officePhone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setFormData({ ...formData, password: pwd });

    // Calculate password strength
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    setPasswordStrength(strength);
  };

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setStep('contact');
  };

  const handleContactSubmit = () => {
    // Validation
    if (!formData.email || !formData.phone || !formData.password) {
      alert('Please fill all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setStep('otp');
  };

  const handleOtpSubmit = () => {
    if (otp.length !== 6) {
      alert('Please enter 6-digit code');
      return;
    }
    if (role === 'agent') {
      setStep('setup');
    } else {
      setStep('success');
    }
  };

  const handleAccountSetup = () => {
    if (!formData.fullName || !formData.businessName) {
      alert('Please fill all fields');
      return;
    }
    setStep('success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-accent py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-heading text-white mb-2">
            MyKeja
          </h1>
          <p className="text-white/80">Join Kenya&apos;s trusted property platform</p>
        </div>

        {/* Step 1: Role Selection */}
        {step === 'role' && (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-glow-lg">
            <h2 className="text-2xl font-bold font-heading mb-6 text-white">
              What brings you here?
            </h2>

            <div className="space-y-3">
              {[
                { value: 'tenant', label: "I'm Looking for a Home", icon: '🏠' },
                { value: 'agent', label: "I'm a Realtor/Agent", icon: '💼' },
                { value: 'owner', label: "I'm a Property Owner", icon: '🔑' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleRoleSelect(option.value as Role)}
                  className="w-full p-4 rounded-lg border-2 border-white/20 bg-white/10 hover:bg-white/20 text-white transition-all text-left flex items-center gap-3"
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="font-semibold">{option.label}</span>
                </button>
              ))}
            </div>

            <p className="text-center text-white/80 text-sm mt-6">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-white font-semibold hover:text-white/90">
                Sign In
              </Link>
            </p>
          </div>
        )}

        {/* Step 2: Contact Information */}
        {step === 'contact' && (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-glow-lg">
            <h2 className="text-2xl font-bold font-heading mb-6 text-white">
              Your Contact Information
            </h2>

            <div className="space-y-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+254712345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handlePasswordChange}
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
                {/* Password Strength Indicator */}
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full ${
                        level <= passwordStrength
                          ? 'bg-success'
                          : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-white/70 mt-1">
                  {passwordStrength === 0 && 'Weak password'}
                  {passwordStrength === 1 && 'Fair'}
                  {passwordStrength === 2 && 'Good'}
                  {passwordStrength === 3 && 'Strong'}
                  {passwordStrength === 4 && 'Very Strong'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 mb-6">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm text-white cursor-pointer">
                I agree to the Terms of Service and Privacy Policy
              </Label>
            </div>

            <Button
              className="w-full mb-3"
              size="lg"
              onClick={handleContactSubmit}
            >
              Send OTP
            </Button>

            <Button
              variant="ghost"
              className="w-full text-white hover:text-white/90"
              onClick={() => setStep('role')}
            >
              Back
            </Button>
          </div>
        )}

        {/* Step 3: OTP Verification */}
        {step === 'otp' && (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-glow-lg">
            <h2 className="text-2xl font-bold font-heading mb-2 text-white">
              Verify Your Phone
            </h2>
            <p className="text-white/80 mb-6">
              We&apos;ve sent a code to {formData.phone}
            </p>

            <div className="space-y-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-white">Enter Code</Label>
                <Input
                  id="otp"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                  maxLength={6}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <p className="text-center text-white/80 text-sm mb-6">
              Didn&apos;t receive code?{' '}
              <button className="text-white font-semibold hover:text-white/90">
                Resend (59s)
              </button>
            </p>

            <Button
              className="w-full mb-3"
              size="lg"
              onClick={handleOtpSubmit}
            >
              Verify
            </Button>

            <Button
              variant="ghost"
              className="w-full text-white hover:text-white/90"
              onClick={() => setStep('contact')}
            >
              Back
            </Button>
          </div>
        )}

        {/* Step 4: Account Setup (Agent Only) */}
        {step === 'setup' && (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-glow-lg">
            <h2 className="text-2xl font-bold font-heading mb-6 text-white">
              Business Information
            </h2>

            <div className="space-y-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="fullname" className="text-white">Full Name</Label>
                <Input
                  id="fullname"
                  placeholder="Your Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business" className="text-white">Business Name</Label>
                <Input
                  id="business"
                  placeholder="Your Agency Name"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="officphone" className="text-white">Office Phone (Optional)</Label>
                <Input
                  id="officphone"
                  type="tel"
                  placeholder="+254712345678"
                  value={formData.officePhone}
                  onChange={(e) => setFormData({ ...formData, officePhone: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <Button
              className="w-full mb-3"
              size="lg"
              onClick={handleAccountSetup}
            >
              Complete Registration
            </Button>

            <Button
              variant="ghost"
              className="w-full text-white hover:text-white/90"
              onClick={() => setStep('otp')}
            >
              Back
            </Button>
          </div>
        )}

        {/* Step 5: Success */}
        {step === 'success' && (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-glow-lg text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                <Check className="text-success" size={32} />
              </div>
            </div>

            <h2 className="text-2xl font-bold font-heading mb-2 text-white">
              Welcome to MyKeja!
            </h2>

            <p className="text-white/80 mb-6">
              {role === 'tenant' &&
                "You're all set! Browse listings, lock properties, and find your next home."}
              {role === 'agent' &&
                "You're all set! Your account is now awaiting verification. Complete the verification process to start listing properties."}
              {role === 'owner' &&
                "You're all set! Register your properties and start managing bookings."}
            </p>

            <Button className="w-full mb-3" size="lg">
              Get Started
            </Button>

            <Link href="/" className="text-white hover:text-white/90 text-sm">
              Go to Home Page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
