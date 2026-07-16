import Link from 'next/link';

export const CaptainSignIn = () => {
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

        <h1 className="text-2xl font-bold tracking-tight mb-1">Sign In as a User</h1>
        <p className="text-gray-500 text-sm mb-8">Sign in to your account</p>

        <form className="w-full max-w-md flex flex-col gap-5">
          {/* email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-400">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:border-[#E30613]/50 transition-colors duration-300"
            />
          </div>

          {/* password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-400">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:border-[#E30613]/50 transition-colors duration-300"
            />
          </div>

          {/* submit */}
          <button
            type="submit"
            className="w-full py-3.5 bg-[#E30613] hover:bg-[#b91c1c] text-white text-sm font-semibold tracking-wide uppercase rounded-xl transition-colors duration-300 cursor-pointer mt-2"
          >
            Sign In
          </button>

          {/* sign in link */}
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/user-sign-up" className="text-[#E30613] hover:underline cursor-pointer font-medium">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default CaptainSignIn