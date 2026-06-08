'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Badge } from '@/components/Badge';
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
    <div className="min-h-screen bg-gradient-to-br from-brand-primary to-accent-secondary py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-display text-white mb-2">
            MyKeja
          </h1>
          <p className="text-white/80">Join Kenya's trusted property platform</p>
        </div>

        {/* Step 1: Role Selection */}
        {step === 'role' && (
          <Card variant="glass" padding="lg">
            <h2 className="text-heading-2 font-semibold mb-6 text-white">
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
              <Link href="/auth/login" className="text-white font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </Card>
        )}

        {/* Step 2: Contact Information */}
        {step === 'contact' && (
          <Card variant="glass" padding="lg">
            <h2 className="text-heading-2 font-semibold mb-6 text-white">
              Your Contact Information
            </h2>

            <div className="space-y-4 mb-6">
              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <Input
                label="Phone"
                type="tel"
                placeholder="+254712345678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />

              <div>
                <label className="block text-sm font-semibold mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handlePasswordChange}
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
                {/* Password Strength Indicator */}
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full ${
                        level <= passwordStrength
                          ? 'bg-state-success'
                          : 'bg-border-default'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  {passwordStrength === 0 && 'Weak password'}
                  {passwordStrength === 1 && 'Fair'}
                  {passwordStrength === 2 && 'Good'}
                  {passwordStrength === 3 && 'Strong'}
                  {passwordStrength === 4 && 'Very Strong'}
                </p>
              </div>

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            <label className="flex items-start gap-2 mb-6">
              <input type="checkbox" className="mt-1" required />
              <span className="text-sm text-white">
                I agree to the Terms of Service and Privacy Policy
              </span>
            </label>

            <Button
              className="w-full mb-3"
              onClick={handleContactSubmit}
            >
              Send OTP
            </Button>

            <Button
              variant="ghost"
              className="w-full text-white"
              onClick={() => setStep('role')}
            >
              Back
            </Button>
          </Card>
        )}

        {/* Step 3: OTP Verification */}
        {step === 'otp' && (
          <Card variant="glass" padding="lg">
            <h2 className="text-heading-2 font-semibold mb-2 text-white">
              Verify Your Phone
            </h2>
            <p className="text-white/80 mb-6">
              We've sent a code to {formData.phone}
            </p>

            <div className="space-y-4 mb-6">
              <Input
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                maxLength={6}
              />
            </div>

            <p className="text-center text-white/80 text-sm mb-6">
              Didn't receive code?{' '}
              <button className="text-white font-semibold hover:underline">
                Resend (59s)
              </button>
            </p>

            <Button
              className="w-full mb-3"
              onClick={handleOtpSubmit}
            >
              Verify
            </Button>

            <Button
              variant="ghost"
              className="w-full text-white"
              onClick={() => setStep('contact')}
            >
              Back
            </Button>
          </Card>
        )}

        {/* Step 4: Account Setup (Agent Only) */}
        {step === 'setup' && (
          <Card variant="glass" padding="lg">
            <h2 className="text-heading-2 font-semibold mb-6 text-white">
              Business Information
            </h2>

            <div className="space-y-4 mb-6">
              <Input
                label="Full Name"
                placeholder="Your Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />

              <Input
                label="Business Name"
                placeholder="Your Agency Name"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              />

              <Input
                label="Office Phone (Optional)"
                type="tel"
                placeholder="+254712345678"
                value={formData.officePhone}
                onChange={(e) => setFormData({ ...formData, officePhone: e.target.value })}
              />
            </div>

            <Button
              className="w-full mb-3"
              onClick={handleAccountSetup}
            >
              Complete Registration
            </Button>

            <Button
              variant="ghost"
              className="w-full text-white"
              onClick={() => setStep('otp')}
            >
              Back
            </Button>
          </Card>
        )}

        {/* Step 5: Success */}
        {step === 'success' && (
          <Card variant="glass" padding="lg" className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-state-success/20 rounded-full flex items-center justify-center mx-auto">
                <Check className="text-state-success" size={32} />
              </div>
            </div>

            <h2 className="text-heading-2 font-semibold mb-2 text-white">
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

            <Button className="w-full mb-3">
              Get Started
            </Button>

            <Link href="/auth/login" className="text-white hover:underline text-sm">
              Go to Home Page
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
