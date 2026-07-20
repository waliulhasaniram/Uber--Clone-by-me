'use client'
import { useCaptainAuth } from "@/hooks/captainAuthentication";
import { useAuth } from "@/hooks/userAuthentication";

export const Navbar = () => {
    const { userData, isLoading, handleLogout } = useAuth();
    const { captain, isLoadingCaptain, handleCaptainLogout } = useCaptainAuth();

    const userFirstName = userData?.fullname?.firstName || userData?.firstName || "there";
    const captainFirstName = captain?.fullname?.firstName || captain?.firstName || "there";
    const isAuthenticated = Boolean(userData || captain);
    const isLoadingAuth = isLoading || isLoadingCaptain;
  return (
        <nav className="relative z-10  flex items-center justify-between px-6 md:px-12 py-5">
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

        <div className="flex items-center gap-3">
          {isLoadingAuth ? (
            <span className="text-sm text-gray-400">Loading...</span>
          ) : userData ? (
            <>
              <span className="text-sm font-medium text-gray-300">Hello, {userFirstName}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : captain ? (
            <>
              <span className="text-sm font-medium text-gray-300">Hello, captain {captainFirstName}</span>
              <button
                type="button"
                onClick={handleCaptainLogout}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/user-sign-in" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
              Sign In
            </Link>
          )}
        </div>
      </nav>
  )
}
export default Navbar