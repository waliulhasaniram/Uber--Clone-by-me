"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { registerUser } from '../actions/loginAndSignUpActions';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export const UserSignUp = () => {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await registerUser(form);
      setMessage(response?.message || 'Account created successfully.');
      setForm(initialForm);
      router.push('/user-sign-in');
    } catch (err) {
      setError(err.message || 'Unable to create your account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden">

      {/* subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#E30613] rounded-full blur-[200px] opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">

        {/* logo */}
        <div className="w-14 h-14 bg-[#E30613] rounded-2xl flex items-center justify-center mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17v2m14-2v2" />
            <circle cx="7.5" cy="17" r="1.5" fill="white" stroke="none" />
            <circle cx="16.5" cy="17" r="1.5" fill="white" stroke="none" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold tracking-tight mb-1">Create Your Account As A User</h1>
        <p className="text-gray-500 text-sm mb-8">Sign up and start riding</p>

        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-5">
          {message ? (
            <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
              {message}
            </p>
          ) : null}
          {error ? (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          ) : null}

          {/* name row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-400">First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                type="text"
                placeholder="John"
                className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:border-[#E30613]/50 transition-colors duration-300"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-400">Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                type="text"
                placeholder="Doe"
                className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:border-[#E30613]/50 transition-colors duration-300"
              />
            </div>
          </div>

          {/* email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-400">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:border-[#E30613]/50 transition-colors duration-300"
            />
          </div>

          {/* password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-400">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength="6"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:border-[#E30613]/50 transition-colors duration-300"
            />
          </div>

          {/* submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#E30613] hover:bg-[#b91c1c] disabled:cursor-not-allowed disabled:opacity-70 text-white text-sm font-semibold tracking-wide uppercase rounded-xl transition-colors duration-300 cursor-pointer mt-2"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          {/* sign in link */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/user-sign-in" className="text-[#E30613] hover:underline cursor-pointer font-medium">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default UserSignUp