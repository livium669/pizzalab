import Link from "next/link";
import GlitchTitle from "@/components/GlitchTitle";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden text-center p-4">
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* 404 Large Text */}
      <h1 className="text-[150px] md:text-[250px] font-marker text-neon-pink leading-none opacity-20 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 blur-sm">
        404
      </h1>

      <div className="relative z-10 space-y-6">
        {/* Signal Lost Glitch Title */}
        <GlitchTitle 
          text="SIGNAL LOST" 
          as="h2"
          className="text-6xl md:text-8xl font-oswald text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        />

        <div className="h-1 w-32 bg-neon-green mx-auto my-6 animate-pulse"></div>

        <p className="text-xl md:text-2xl font-mono text-gray-400 max-w-lg mx-auto">
          The slice you are looking for has been consumed or never existed.
          <br/>
          <span className="text-neon-pink text-sm mt-2 block opacity-80">
            ERROR_CODE: PIZZA_NOT_FOUND
          </span>
        </p>

        {/* Return Button */}
        <div className="pt-8">
          <Link 
            href="/"
            className="inline-block px-8 py-3 border border-white text-white font-oswald text-xl hover:bg-white hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
          >
            RETURN TO BASE
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 text-xs font-mono text-gray-600">
        SYS.STATUS: CRITICAL
      </div>
      <div className="absolute top-10 right-10 text-xs font-mono text-gray-600 text-right">
        TRY_REBOOT( )
      </div>
    </div>
  );
}
