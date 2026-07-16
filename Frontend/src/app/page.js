import Link from 'next/link';
export const Home = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E30613] rounded-full blur-[180px] opacity-[0.07] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#4a90d9] rounded-full blur-[150px] opacity-[0.04] pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#E30613] rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17v2m14-2v2" />
              <circle cx="7.5" cy="17" r="1.5" fill="white" stroke="none" />
              <circle cx="16.5" cy="17" r="1.5" fill="white" stroke="none" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">Waliul's Uber</span>
        </div>
        <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
          Sign In
        </button>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center pb-12">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E30613] animate-pulse" />
          <span className="text-xs font-medium text-gray-400 tracking-wide uppercase">Now available in your city</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
          <span className="block">Go anywhere</span>
          <span className="block mt-2">
            with
            <span className="text-[#E30613] ml-3">Ryde</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-base sm:text-lg font-light max-w-md leading-relaxed mb-12">
          Request a ride, hop in, and relax. Whether you're heading to work, the airport, or exploring the city — we've got you.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mb-14">
          {[
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2" />
                  <circle cx="7.5" cy="17" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="16.5" cy="17" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              ),
              title: "Ride",
              desc: "Affordable trips at your fingertips",
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              ),
              title: "Schedule",
              desc: "Book rides up to 30 days ahead",
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                  <circle cx="12" cy="10" r="3" fill="currentColor" stroke="none" />
                </svg>
              ),
              title: "Deliver",
              desc: "Send packages across the city fast",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500 cursor-default"
            >
              <div className="w-11 h-11 rounded-xl bg-white/[0.05] flex items-center justify-center text-gray-500 group-hover:text-[#E30613] transition-colors duration-500">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
          <Link href="/captain-sign-up" className="w-full sm:flex-1 px-8 py-4 bg-[#E30613] hover:bg-[#b91c1c] text-white text-sm font-semibold tracking-wide uppercase rounded-xl transition-colors duration-300 cursor-pointer shadow-lg shadow-[#E30613]/20 text-center">
            Get Started As Driver
          </Link>
          <Link href="/user-sign-up" className="w-full sm:flex-1 px-8 py-4 border border-white/[0.1] hover:border-white/[0.25] hover:bg-white/[0.03] text-white text-sm font-semibold tracking-wide uppercase rounded-xl transition-all duration-300 cursor-pointer">
            Get Started As User
          </Link>
        </div>

        {/* Trust line */}
        <div className="mt-10 flex items-center gap-6 text-[11px] text-gray-600 uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Safe rides
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-700" />
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 12 20 22 4 22 4 12" />
              <rect x="2" y="7" width="20" height="5" />
              <line x1="12" y1="22" x2="12" y2="7" />
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
            </svg>
            2M+ drivers
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-700 hidden sm:block" />
          <span className="hidden sm:flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            900+ cities
          </span>
        </div>
      </main>

      {/* Bottom bar */}
      <footer className="relative z-10 px-6 md:px-12 py-5 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-[11px] text-gray-600">© 2025 Ryde Technologies Inc.</span>
        <div className="flex items-center gap-5">
          {["Privacy", "Terms", "Help"].map((link) => (
            <button key={link} className="text-[11px] text-gray-600 hover:text-gray-400 transition-colors duration-300 cursor-pointer">
              {link}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Home;