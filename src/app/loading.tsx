export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Neon Loader Container */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Outer Ring - Pink */}
        <div className="absolute inset-0 border-4 border-neon-pink/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-neon-pink border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin shadow-[0_0_15px_#ff00ff]"></div>
        
        {/* Inner Ring - Green (Counter-rotating or slower) */}
        <div className="absolute inset-6 border-4 border-neon-green/20 rounded-full"></div>
        <div className="absolute inset-6 border-4 border-b-neon-green border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin shadow-[0_0_15px_#ccff00] direction-reverse" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
        
        {/* Center Icon/Dot */}
        <div className="absolute w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></div>
      </div>

      {/* Loading Text */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="text-2xl font-oswald text-white tracking-[0.2em] animate-pulse">
          LOADING
        </div>
        <div className="text-xs font-mono text-neon-green">
          SYSTEM_CHECK_INTEGRITY...
        </div>
      </div>

      {/* Progress Bar Decoration */}
      <div className="mt-6 w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-neon-pink to-neon-green w-1/2 animate-[shimmer_2s_infinite] translate-x-[-100%]"></div>
      </div>
      
      {/* Inline style for custom keyframes if not in global css */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
