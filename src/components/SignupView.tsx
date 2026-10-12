import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

interface SignupViewProps {
  onSuccess: (user: UserProfile) => void;
  onShowToast: (msg: string) => void;
}

export const SignupView: React.FC<SignupViewProps> = ({ onSuccess, onShowToast }) => {
  const [isLoginMode, setIsLoginMode] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('Alex Johnson');
  const [email, setEmail] = useState<string>('alex.johnson@travelconnect.com');
  const [password, setPassword] = useState<string>('Travel1234!');
  const [confirmPassword, setConfirmPassword] = useState<string>('Travel1234!');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoginMode) {
      if (!fullName.trim()) {
        onShowToast('Please enter your full name');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        onShowToast('Please enter a valid email address');
        return;
      }
      if (password.length < 6) {
        onShowToast('Password must be at least 6 characters');
        return;
      }
      if (password !== confirmPassword) {
        onShowToast('Passwords do not match');
        return;
      }
    }

    onShowToast(isLoginMode ? 'Welcome back!' : 'Account created successfully!');
    const user: UserProfile = {
      name: isLoginMode ? (email.split('@')[0] || 'Traveler') : fullName,
      email: email,
      joinedDate: new Date().toLocaleDateString(),
    };
    setTimeout(() => {
      onSuccess(user);
    }, 600);
  };

  const handleSocialAuth = (provider: 'Google' | 'Apple') => {
    onShowToast(`Signing in with ${provider}...`);
    setTimeout(() => {
      onShowToast(`Connected with ${provider}!`);
      onSuccess({
        name: `${provider} Traveler`,
        email: `user@${provider.toLowerCase()}.com`,
        joinedDate: new Date().toLocaleDateString(),
      });
    }, 800);
  };

  const handleSkipAsGuest = () => {
    onShowToast('Continuing as Guest');
    onSuccess({
      name: 'Guest Traveler',
      email: 'guest@travelconnect.app',
      joinedDate: new Date().toLocaleDateString(),
    });
  };

  return (
    <div className="flex flex-col justify-center flex-1 p-6 bg-white min-h-[520px]">
      {/* Brand Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/30">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </div>
          <span className="font-extrabold text-lg text-slate-900 tracking-tight">Travel Connect</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          {isLoginMode ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {isLoginMode ? 'Sign in to access your routes & bookings' : 'Join us and start your journey today'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {!isLoginMode && (
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-slate-50/50"
            />
          </div>
        )}

        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-slate-50/50"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-slate-50/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {!isLoginMode && (
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-slate-50/50"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-teal-600/30 active:scale-98 transition-all flex items-center justify-center gap-1.5"
        >
          <span>{isLoginMode ? 'Sign In to Account' : 'Create Account'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Social divider */}
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-[10px] uppercase font-bold text-slate-400">or continue with</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* Social login buttons */}
      <div className="flex gap-2.5">
        <button
          onClick={() => handleSocialAuth('Google')}
          className="flex-1 py-2.5 px-3 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-all active:scale-95 shadow-2xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span>Google</span>
        </button>

        <button
          onClick={() => handleSocialAuth('Apple')}
          className="flex-1 py-2.5 px-3 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-all active:scale-95 shadow-2xs"
        >
          <svg className="w-4 h-4 fill-current text-slate-900" viewBox="0 0 24 24">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.52.03 2.64.66 3.37 1.84-3.15 1.86-2.58 5.87.54 7.06-.58 1.52-1.36 3-2.58 4.03zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          <span>Apple</span>
        </button>
      </div>

      {/* Switch mode & Skip button */}
      <div className="mt-5 text-center space-y-2">
        <p className="text-xs text-slate-500 font-medium">
          {isLoginMode ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-teal-600 font-bold hover:underline"
          >
            {isLoginMode ? 'Create one now' : 'Sign In'}
          </button>
        </p>

        <button
          type="button"
          onClick={handleSkipAsGuest}
          className="text-[11px] text-slate-400 hover:text-slate-600 font-semibold underline"
        >
          Skip & Explore as Guest
        </button>
      </div>
    </div>
  );
};
