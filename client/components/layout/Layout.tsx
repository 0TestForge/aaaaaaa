import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isCheckout = location.pathname.startsWith("/checkout");
  return (
    <div className={isCheckout ? "min-h-screen bg-[#00140d] text-foreground relative" : "min-h-screen bg-gradient-to-b from-[#0b0d1a] via-[#0f1224] to-[#0b0d1a] text-foreground relative"}>
      {/* decorative site background accents */}
      {!isCheckout && (
        <div className="pointer-events-none fixed inset-0 z-0">
          {/* grid pattern */}
          <div className="absolute inset-0 bg-grid opacity-35" />
          {/* top-to-bottom green wash (subtle, full height) */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-700/10 via-emerald-600/5 to-transparent" />
          {/* soft blobs */}
          <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-[-6rem] right-1/5 h-80 w-80 rounded-full bg-teal-400/10 blur-[100px]" />
        </div>
      )}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground px-3 py-2 rounded-md"
      >
        Skip to content
      </a>
      {isCheckout ? (
        <>
          <div className="fixed top-0 left-0 z-[100] w-full border-b border-white/5 bg-inherit relative overflow-hidden">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F5c5b380fe72143a0b67648f4f64f4bf0%2F1313854b765941a69515b27ddb90a7ff?format=webp&width=800"
              alt="Checkout banner"
              className="w-full h-16 md:h-24 object-contain object-center cursor-pointer"
              onClick={() => navigate('/')}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('/'); }}
            />

            {/* decorative liquid spill on the left */}
            <svg className="absolute left-0 top-0 bottom-0 w-20 md:w-32 h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              <path d="M0,0 C40,20 60,20 80,0 C95,10 95,40 80,55 C60,75 40,80 20,70 C5,62 0,50 0,30 Z" fill="#00140d" fillOpacity="0.98" />
            </svg>

            {/* decorative liquid spill on the right (mirrored) */}
            <svg className="absolute right-0 top-0 bottom-0 w-20 md:w-32 h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              <path d="M100,0 C60,20 40,20 20,0 C5,10 5,40 20,55 C40,75 60,80 80,70 C95,62 100,50 100,30 Z" fill="#00140d" fillOpacity="0.98" />
            </svg>

            {/* Left & right masks to hide exposed background when image is contained */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 pointer-events-none bg-gradient-to-r from-[#00140d] to-transparent" aria-hidden />
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 pointer-events-none bg-gradient-to-l from-[#00140d] to-transparent" aria-hidden />
          </div>
          <div className="h-16 md:h-24" />
        </>
      ) : (
        <SiteHeader />
      )}
      <main id="main" className="relative">
        <Outlet />
      </main>
      {isCheckout ? null : <SiteFooter />}
    </div>
  );
}
