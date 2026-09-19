import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#060c1c] text-white px-6 text-center">
      <img
        src="/assets/skyx-logo.png"
        alt="SKYX Digi Solutions"
        className="h-10 w-auto object-contain mb-8 drop-shadow-[0_0_20px_rgba(0,145,255,0.4)]"
      />
      <h1 className="text-6xl font-bold font-['Space_Grotesk'] text-[#0091ff] mb-4">404</h1>
      <p className="text-xl text-white/70 max-w-md mb-8">
        The page you are looking for does not exist or has been relocated.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-[#0091ff] via-[#10b981] to-[#ff7a1a] text-white shadow-[0_0_20px_rgba(0,145,255,0.4)] hover:scale-105 transition-transform"
      >
        Return to Home
      </Link>
    </div>
  );
}
