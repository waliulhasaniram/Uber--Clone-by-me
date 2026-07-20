import React from 'react'

export const Footer = () => {
  return (
      <footer className="relative z-10 px-6 md:px-12 py-5 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-[11px] text-gray-600">© 2025 Waliul Technologies Inc.</span>
        <div className="flex items-center gap-5">
          {["Privacy", "Terms", "Help"].map((link) => (
            <button key={link} className="text-[11px] text-gray-600 hover:text-gray-400 transition-colors duration-300 cursor-pointer">
              {link}
            </button>
          ))}
        </div>
      </footer>
  )
}
export default Footer