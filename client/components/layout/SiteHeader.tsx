import { cn } from "@/lib/utils";
import { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { useGeo } from "@/hooks/useGeo";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const [curSearch, setCurSearch] = useState("");
  const [navSearch, setNavSearch] = useState("");
  const geo = useGeo();
  const override = typeof window !== "undefined" ? localStorage.getItem("currencyOverride") : null;
  const activeCurrency = override || geo.currency || "USD";
  const location = useLocation();
  const showHow = location.pathname === "/" || location.pathname === "";
  const isHome = showHow;

  // Start mobile with filters closed
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        document.body.classList.add('filters-closed');
      }
    } catch {}
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    try {
      if (menuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    } catch {}
    return () => {
      try { document.body.style.overflow = ''; } catch {}
    };
  }, [menuOpen]);

  const games = [
    { id: "mm", name: "Murder Mystery", image: "https://cdn.builder.io/api/v1/image/assets%2Fb2458d5aab5847128a2b754080dc1712%2F155ecd3b276d4626afdb8f1be5054597?format=webp&width=400" },
    { id: "grow", name: "Grow a Garden", image: "https://cdn.builder.io/api/v1/image/assets%2Fb2458d5aab5847128a2b754080dc1712%2F824f285113f54ff094f70b7dac6cb138?format=webp&width=400" },
    { id: "blox", name: "Blox Fruits", image: "https://cdn.builder.io/api/v1/image/assets%2Fa17b3953a32448139f60d7c2bcda706b%2F1e72998e48794cf699143ac972a8c060?format=webp&width=400" },
    { id: "blade", name: "Blade Ball", image: "https://cdn.builder.io/api/v1/image/assets%2Fb2458d5aab5847128a2b754080dc1712%2F87d9886f76244cb5ba71707762c2fcd1?format=webp&width=400" },
    { id: "brainrot", name: "Steal a Brainrot", image: "https://cdn.builder.io/api/v1/image/assets%2Fb2458d5aab5847128a2b754080dc1712%2Fd5e8426a3e46435f9c8be0bc746e8e68?format=webp&width=400" },
  ];

  const list = useMemo(
    () => [
      "USD","EUR","GBP","GEL","TRY","INR","JPY","CNY","AUD","CAD","BRL","CHF","RUB","PLN","SEK","NOK","DKK","HUF","CZK","AED","SAR","ZAR","MXN"
    ].filter((c) => c.toLowerCase().includes(curSearch.toLowerCase())),
    [curSearch],
  );

  const setCurrency = (code: string) => {
    localStorage.setItem("currencyOverride", code);
    window.dispatchEvent(new CustomEvent("currency:override", { detail: code }));
  };

  const [showCurrencyDialog, setShowCurrencyDialog] = useState(false);
  const [menuCurrencyOpen, setMenuCurrencyOpen] = useState(false);

  // Map currency codes to flag file names (rounded flags in /assets/flags/rounded) — kept for possible future use
  const currencyToFlag = (cur: string) => {
    const map: Record<string, string> = {
      USD: 'us',
      EUR: 'eu',
      GBP: 'gb',
      GEL: 'ge',
      TRY: 'tr',
      INR: 'in',
      JPY: 'jp',
      CNY: 'cn',
      AUD: 'au',
      CAD: 'ca',
      BRL: 'br',
      CHF: 'ch',
      RUB: 'ru',
      PLN: 'pl',
      SEK: 'se',
      NOK: 'no',
      DKK: 'dk',
      HUF: 'hu',
      CZK: 'cz',
      AED: 'ae',
      SAR: 'sa',
      ZAR: 'za',
      MXN: 'mx',
    };
    return map[cur] || cur.slice(0, 2).toLowerCase();
  };

  const flagSrc = `/assets/flags/rounded/${currencyToFlag(activeCurrency)}.svg`;

  return (
    <header className="sticky top-0 z-[100] w-full backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/70 border-b border-white/5">
      <div className="container flex h-12 md:h-16 items-center gap-3">
        <a href="/" className="flex items-center gap-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fb2458d5aab5847128a2b754080dc1712%2F59703aedd2134312974c10a72e7d28f4?format=webp&width=220"
            alt="RO-CART logo"
            className="h-8 md:h-9 w-auto object-contain"
          />
          <span className="sr-only">RO-CART</span>
        </a>


        <div className="ml-auto flex items-center gap-2">
          {!isHome && (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/10"
                  aria-label="Search"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-current">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 21l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" className="text-muted-foreground"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  <Input
                    autoFocus
                    placeholder="Search items..."
                    value={navSearch}
                    onChange={(e) => setNavSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const q = navSearch.trim();
                        try { sessionStorage.setItem('search:q', q); } catch {}
                        window.dispatchEvent(new CustomEvent('global:search', { detail: q }));
                        if (!location.pathname.startsWith('/grow')) window.location.assign('/grow');
                      }
                    }}
                  />
                  <Button size="sm" onClick={() => {
                    const q = navSearch.trim();
                    try { sessionStorage.setItem('search:q', q); } catch {}
                    window.dispatchEvent(new CustomEvent('global:search', { detail: q }));
                    if (!location.pathname.startsWith('/grow')) window.location.assign('/grow');
                  }}>Go</Button>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {!isHome && (
            <Popover open={gameOpen} onOpenChange={setGameOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="hidden sm:inline-flex mr-2 items-center gap-2 bg-slate-900/80 text-white border border-white/10 px-3 py-2 rounded-md shadow-sm hover:bg-slate-900/95">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="2" y="6" width="20" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
                    <circle cx="9" cy="11" r="1.3" fill="currentColor" />
                    <circle cx="15" cy="11" r="1.3" fill="currentColor" />
                    <path d="M7 15c0 .8.6 1.4 1.4 1.4H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Pick a Game</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className={`opacity-80 transition-transform duration-200 ${gameOpen ? 'rotate-180' : 'rotate-0'}`}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 rounded-lg bg-slate-900/90 border border-white/10 p-2 shadow-lg">
                <div className="grid gap-2">
                  {games.map((it) => (
                    <button
                      key={it.id}
                      onClick={() => {
                        if (it.id === "grow") window.location.assign("/grow"); else if (it.id === "mm") window.location.assign("/mm"); else if (it.id === "brainrot") window.location.assign("/brainrot"); else if (it.id === "blox") window.location.assign("/blox"); else if (it.id === "blade") window.location.assign("/blade");
                      }}
                      className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-white/5"
                    >
                      <img src={it.image} alt={it.name} className="h-10 w-12 rounded-md object-cover" />
                      <div className="text-left">
                        <div className="text-sm font-medium">{it.name}</div>
                        <div className="text-xs text-muted-foreground">Tap to view items</div>
                      </div>
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}

          {showHow && (
            <>
              <Button variant="ghost" className="hidden sm:inline-flex mr-2" onClick={() => window.location.assign('/#how')}>How it works</Button>
              <Button variant="ghost" className="hidden sm:inline-flex mr-2" onClick={() => window.location.assign('/#faq')}>FAQ</Button>
            </>
          )}

          {!isHome && (
            <Popover>
              <PopoverTrigger asChild>
                <div className="px-4 hidden sm:block relative">
                  <button type="button" onClick={() => setMenuCurrencyOpen((s) => !s)} className="w-full justify-center transition-all duration-200 focus:outline focus:outline-offset-2 focus-visible:outline disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden active:translate-y-px whitespace-nowrap bg-gradient-to-b from-[rgba(188,195,231,0.08)] to-[rgba(188,195,231,0.032)] backdrop-blur-[12px] hover:bg-[rgba(188,195,231,0.12)] text-gray-50 focus:outline-secondary rounded-full outline-none flex items-center gap-2 font-medium ring-1 ring-gray-50/10 py-3 px-4" aria-label={`Change language and currency. Currently set to English and ${activeCurrency}`}>
                    English
                    <span className="text-muted-foreground" aria-hidden>/</span>
                    {activeCurrency}
                    <span className="sr-only">Change language and currency</span>
                  </button>

                  {menuCurrencyOpen && (
                    <div className="absolute left-0 top-full mt-2 w-72 rounded-md border border-white/5 bg-[#0b1220] p-3 z-50">
                      <Input placeholder="Search currency..." value={curSearch} onChange={(e) => setCurSearch(e.target.value)} />
                      <div className="grid gap-2 mt-2" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
                        {list.map((c) => (
                          <button key={c} type="button" onClick={() => { setCurrency(c); setMenuCurrencyOpen(false); }} className="px-3 py-2 rounded-md bg-transparent hover:bg-white/5 text-white text-sm">{c}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-72" style={{ display: 'none' }}>
                <div role="dialog" aria-labelledby="lang-currency-title" className="fixed top-[35%] left-[50%] z-[999] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-xl duration-200 lg:top-[50%] sm:rounded-lg focus:outline-none border-[#282847] bg-[#141425] sm:max-w-[425px]" tabIndex={-1} style={{ pointerEvents: 'auto' }}>
                  <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                    <h2 id="lang-currency-title" className="tracking-tight font-bold text-white text-xl">Language &amp; Currency</h2>
                  </div>

                  <div className="grid gap-6 py-4">
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-1 text-sm">Select Language</h3>
                      <div className="relative w-full">
                        <div>
                          <div className="relative flex items-center gap-3 text-start w-full">
                            <button
                              className="flex items-center justify-center disabled:opacity-75 text-white transition-all duration-300 ease-in-out font-sans rounded-[12px] bg-input border-border border-[2px] text-base font-medium leading-6 px-6 xs:px-5 py-3 lg:px-8 hover:opacity-80 active:opacity-100 active:scale-95 whitespace-nowrap w-full"
                              type="button"
                              aria-label="Change language"
                              style={{ padding: 10 }}
                            >
                              <div className="flex items-center w-full justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <div style={{ width: 28, height: 28, borderRadius: 9999, display: 'inline-block' }} />
                                  <span className="text-gray-1">English</span>
                                </div>
                                <svg className="duration-500 fill-gray-300 rotate-0 transition-all" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><title>Arrow Icon</title><path d="M16.7354 8.35363C17.0904 7.99547 17.0878 7.41737 16.7297 7.0624C16.3715 6.70743 15.7934 6.71001 15.4385 7.06816L13.3113 9.21439C12.448 10.0854 11.8539 10.6829 11.3504 11.0872C10.8614 11.4799 10.5473 11.6147 10.266 11.6505C10.0894 11.673 9.91063 11.673 9.734 11.6505C9.45268 11.6147 9.13857 11.4799 8.64955 11.0872C8.14613 10.6829 7.55199 10.0854 6.6887 9.21439L4.56154 7.06816C4.20657 6.71001 3.62846 6.70743 3.27031 7.0624C2.91216 7.41737 2.90958 7.99548 3.26455 8.35363L5.43003 10.5385C6.24561 11.3614 6.91219 12.034 7.50613 12.511C8.12374 13.007 8.75062 13.366 9.50311 13.462C9.83305 13.504 10.1669 13.504 10.4969 13.462C11.2494 13.366 11.8763 13.007 12.4939 12.511C13.0878 12.034 13.7544 11.3614 14.57 10.5385L16.7354 8.35363Z"/></svg>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-1 text-sm">Select Currency</h3>
                      <div className="relative w-full">
                        <div>
                          <div className="relative flex items-center gap-3 text-start w-full">
                            <button
                              className="flex items-center justify-center disabled:opacity-75 text-white transition-all duration-300 ease-in-out font-sans rounded-[12px] bg-input border-border border-[2px] text-base font-medium leading-6 px-6 xs:px-5 py-3 lg:px-8 hover:opacity-80 active:opacity-100 active:scale-95 whitespace-nowrap w-full"
                              type="button"
                              aria-label="Change currency"
                              style={{ padding: '0.75rem', color: 'rgb(161, 146, 199)', fontWeight: 700 }}
                            >
                              <div className="flex items-center w-full justify-between">
                                <div className="flex items-center gap-2"><span>$</span><span>{activeCurrency}</span></div>
                                <svg className="duration-500 fill-gray-300 rotate-0 transition-all" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><title>Arrow Icon</title><path d="M16.7354 8.35363C17.0904 7.99547 17.0878 7.41737 16.7297 7.0624C16.3715 6.70743 15.7934 6.71001 15.4385 7.06816L13.3113 9.21439C12.448 10.0854 11.8539 10.6829 11.3504 11.0872C10.8614 11.4799 10.5473 11.6147 10.266 11.6505C10.0894 11.673 9.91063 11.673 9.734 11.6505C9.45268 11.6147 9.13857 11.4799 8.64955 11.0872C8.14613 10.6829 7.55199 10.0854 6.6887 9.21439L4.56154 7.06816C4.20657 6.71001 3.62846 6.70743 3.27031 7.0624C2.91216 7.41737 2.90958 7.99548 3.26455 8.35363L5.43003 10.5385C6.24561 11.3614 6.91219 12.034 7.50613 12.511C8.12374 13.007 8.75062 13.366 9.50311 13.462C9.83305 13.504 10.1669 13.504 10.4969 13.462C11.2494 13.366 11.8763 13.007 12.4939 12.511C13.0878 12.034 13.7544 11.3614 14.57 10.5385L16.7354 8.35363Z"/></svg>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="grid max-h-64 gap-1 overflow-auto pr-1" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
                        {list.map((c) => (
                          <Button key={c} size="sm" variant={c === activeCurrency ? 'default' : 'secondary'} onClick={() => setCurrency(c)}>
                            {c}
                          </Button>
                        ))}
                      </div>

                      <p className="!mt-4 text-gray-1 text-sm">The selected currency is for display purposes only. All transactions are processed in USD.</p>
                    </div>
                  </div>

                  <button type="button" className="absolute top-4 right-4 z-[999] rounded-sm opacity-70 ring-offset-background transition-opacity disabled:pointer-events-none hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x flex items-center justify-center disabled:opacity-75 text-white transition-all duration-300 ease-in-out font-sans rounded-[12px] bg-input border-border border-[2px] text-base font-medium leading-6 px-6 xs:px-5 py-3 lg:px-8 hover:opacity-80 active:opacity-100 active:scale-95 whitespace-nowrap min-h-[40px] min-w-[40px] text-gray-300" style={{ padding: '0.5rem', background: 'rgb(45, 55, 72)' }}>
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                    <span className="sr-only">Close</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
          <div className="flex gap-2 pl-5 md:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="navigation-drawer"
              aria-haspopup="dialog"
              data-state={menuOpen ? 'open' : 'closed'}
              className="inline-flex items-center border border-emerald-300/30 justify-center rounded-md bg-emerald-400 p-2 text-slate-900 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.7)]"
            >
              <span className="sr-only">Open menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-menu-2 h-6 w-6 text-black" aria-hidden="true">
                <path d="M4 6l16 0" />
                <path d="M4 12l16 0" />
                <path d="M4 18l16 0" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {menuOpen && createPortal(
        <div className="md:hidden fixed inset-0 z-[2147483652] bg-background/95 backdrop-blur overflow-auto">
          <div className="container py-3 grid gap-3 pt-[calc(env(safe-area-inset-top)+8px)]">
            <div className="flex justify-end">
              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/10"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                ×
              </button>
            </div>

            {!isHome && (
              <div className="text-xs text-muted-foreground">{geo.country ? `${geo.country} · ` : ""}Currency {activeCurrency}</div>
            )}

            {!isHome && (
              <Accordion type="single" collapsible className="rounded-lg border border-white/10 bg-white/5">
                <AccordionItem value="games" className="border-b-0">
                  <AccordionTrigger className="px-3 text-sm">Pick a Game</AccordionTrigger>
                  <AccordionContent className="px-3">
                    <div className="grid gap-2">
                      {games.map((it) => (
                        <button
                          key={it.id}
                          onClick={() => {
                            if (it.id === "grow") window.location.assign("/grow"); else if (it.id === "mm") window.location.assign("/mm"); else if (it.id === "brainrot") window.location.assign("/brainrot"); else if (it.id === "blox") window.location.assign("/blox"); else if (it.id === "blade") window.location.assign("/blade");
                          }}
                          className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-white/10"
                        >
                          <img src={it.image} alt={it.name} className="h-10 w-12 rounded-md object-cover" />
                          <div className="text-left">
                            <div className="text-sm font-medium">{it.name}</div>
                            <div className="text-xs text-muted-foreground">Tap to view items</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {!isHome && (
              <div className="hidden">
                <div className="text-sm font-medium px-1 mb-2">Categories</div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {[
                    { key: 'best', label: 'Best Sellers', color: 'text-red-400 hover:bg-gradient-to-t hover:from-red-500/10 hover:text-red-300', rect: '#FE5050', stroke: '#FE5050' },
                    { key: 'sheckle', label: 'Sheckles', color: 'text-gray-400 hover:bg-gradient-to-t hover:from-emerald-500/10 hover:text-emerald-300', rect: '#22c55e', stroke: '#22c55e' },
                    { key: 'pets', label: 'Pets', color: 'text-gray-400 hover:bg-gradient-to-t hover:from-emerald-500/10 hover:text-emerald-300', rect: '#22c55e', stroke: '#22c55e' },
                    { key: 'bundles', label: 'Bundles', color: 'text-gray-400 hover:bg-gradient-to-t hover:from-emerald-500/10 hover:text-emerald-300', rect: '#22c55e', stroke: '#22c55e' },
                    { key: 'fruits', label: 'Fruits', color: 'text-gray-400 hover:bg-gradient-to-t hover:from-emerald-500/10 hover:text-emerald-300', rect: '#22c55e', stroke: '#22c55e' },
                    { key: 'mega', label: 'Mega Pets', color: 'text-gray-400 hover:bg-gradient-to-t hover:from-emerald-500/10 hover:text-emerald-300', rect: '#22c55e', stroke: '#22c55e' },
                  ].map((b) => (
                    <button key={b.key}
                      type="button"
                      onClick={() => {
                        try { window.dispatchEvent(new CustomEvent('filter:set', { detail: b.key } as any)); } catch {}
                        if (!location.pathname.startsWith('/grow') && !location.pathname.startsWith('/mm')) window.location.assign('/grow');
                        setMenuOpen(false);
                      }}
                      className={cn('relative flex h-[70px] min-w-[80px] flex-col items-center justify-center gap-1 overflow-hidden rounded-lg px-3 py-2 text-center transition-all duration-200 touch-manipulation select-none active:scale-95', b.color)}
                      style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent', userSelect: 'none' } as any}
                    >
                      <div className="mb-1 flex items-center justify-center">
                        <div className="scale-75">
                          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="42" height="42" rx="10" fill={b.rect} fillOpacity="0.1"></rect>
                            <g transform="translate(4, 4)">
                              {b.key === 'best' && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke={b.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                  <path d="M12 10.941c2.333 -3.308 .167 -7.823 -1 -8.941c0 3.395 -2.235 5.299 -3.667 6.706c-1.43 1.408 -2.333 3.621 -2.333 5.588c0 3.704 3.134 6.706 7 6.706s7 -3.002 7 -6.706c0 -1.712 -1.232 -4.403 -2.333 -5.588c-2.084 3.353 -3.257 3.353 -4.667 2.235"></path>
                                </svg>
                              )}
                              {b.key === 'sheckle' && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke={b.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                                  <path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1"></path>
                                  <path d="M12 7v10"></path>
                                </svg>
                              )}
                              {b.key === 'pets' && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke={b.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                  <path d="M14.7 13.5c-1.1 -2 -1.441 -2.5 -2.7 -2.5c-1.259 0 -1.736 .755 -2.836 2.747c-.942 1.703 -2.846 1.845 -3.321 3.291c-.097 .265 -.145 .677 -.143 .962c0 1.176 .787 2 1.8 2c1.259 0 3 -1 4.5 -1s3.241 1 4.5 1c1.013 0 1.8 -.823 1.8 -2c0 -.285 -.049 -.697 -.146 -.962c-.475 -1.451 -2.512 -1.835 -3.454 -3.538z"></path>
                                  <path d="M20.188 8.082a1.039 1.039 0 0 0 -.406 -.082h-.015c-.735 .012 -1.56 .75 -1.993 1.866c-.519 1.335 -.28 2.7 .538 3.052c.129 .055 .267 .082 .406 .082c.739 0 1.575 -.742 2.011 -1.866c.516 -1.335 .273 -2.7 -.54 -3.052z"></path>
                                  <path d="M9.474 9c.055 0 .109 0 .163 -.011c.944 -.128 1.533 -1.346 1.32 -2.722c-.203 -1.297 -1.047 -2.267 -1.932 -2.267c-.055 0 -.109 0 -.163 .011c-.944 .128 -1.533 1.346 -1.32 2.722c.204 1.293 1.048 2.267 1.933 2.267z"></path>
                                  <path d="M16.456 6.733c.214 -1.376 -.375 -2.594 -1.32 -2.722a1.164 1.164 0 0 0 -.162 -.011c-.885 0 -1.728 .97 -1.93 2.267c-.214 1.376 .375 2.594 1.32 2.722c.054 .007 .108 .011 .162 .011c.885 0 1.73 -.974 1.93 -2.267z"></path>
                                  <path d="M5.69 12.918c.816 -.352 1.054 -1.719 .536 -3.052c-.436 -1.124 -1.271 -1.866 -2.009 -1.866c-.14 0 -.277 .027 -.407 .082c-.816 .352 -1.054 1.719 -.536 3.052c.436 1.124 1.271 1.866 2.009 1.866c.14 0 .277 -.027 .407 -.082z"></path>
                                </svg>
                              )}
                              {b.key === 'bundles' && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke={b.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                                </svg>
                              )}
                              {b.key === 'fruits' && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke={b.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                  <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                  <path d="M12 2a3 3 0 0 1 3 3c0 .562 -.259 1.442 -.776 2.64l-.724 1.36l1.76 -1.893c.499 -.6 .922 -1 1.27 -1.205a2.968 2.968 0 0 1 4.07 1.099a3.011 3.011 0 0 1 -1.09 4.098c-.374 .217 -.99 .396 -1.846 .535l-2.664 .366l2.4 .326c1 .145 1.698 .337 2.11 .576a3.011 3.011 0 0 1 1.09 4.098a2.968 2.968 0 0 1 -4.07 1.098c-.348 -.202 -.771 -.604 -1.27 -1.205l-1.76 -1.893l.724 1.36c.516 1.199 .776 2.079 .776 2.64a3 3 0 0 1 -6 0c0 -.562 .259 -1.442 .776 -2.64l.724 -1.36l-1.76 1.893c-.499 .601 -.922 1 -1.27 1.205a2.968 2.968 0 0 1 -4.07 -1.098a3.011 3.011 0 0 1 1.09 -4.098c.374 -.218 .99 -.396 1.846 -.536l2.664 -.366l-2.4 -.325c-1 -.145 -1.698 -.337 -2.11 -.576a3.011 3.011 0 0 1 -1.09 -4.099a2.968 2.968 0 0 1 4.07 -1.099c.348 .203 .771 .604 1.27 1.205l1.76 1.894c-1 -2.292 -1.5 -3.625 -1.5 -4a3 3 0 0 1 3 -3z"></path>
                                </svg>
                              )}
                              {b.key === 'mega' && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke={b.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                  <path d="M6 5h12l3 5l-8.5 9.5a.7 .7 0 0 1 -1 0l-8.5 -9.5l3 -5"></path>
                                  <path d="M10 12l-2 -2.2l.6 -1"></path>
                                </svg>
                              )}
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="text-xs font-semibold leading-3">{b.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!isHome && (
              <div className="px-4">
                <div>
                  <button type="button" onClick={() => setMenuCurrencyOpen((s) => !s)} className="w-full text-left justify-center transition-all duration-200 focus:outline focus:outline-offset-2 focus-visible:outline disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden active:translate-y-px whitespace-nowrap bg-gradient-to-b from-[rgba(188,195,231,0.08)] to-[rgba(188,195,231,0.032)] backdrop-blur-[12px] hover:bg-[rgba(188,195,231,0.12)] text-gray-50 focus:outline-secondary rounded-full outline-none flex items-center gap-2 font-medium ring-1 ring-gray-50/10 py-3 px-4" aria-label={`Change language and currency. Currently set to English and ${activeCurrency}`}>
                    <span className="flex items-center gap-2"><span>English</span><span className="text-muted-foreground">/</span><span>{activeCurrency}</span></span>
                    <span className="ml-auto">{menuCurrencyOpen ? '▴' : '▾'}</span>
                  </button>

                  {menuCurrencyOpen && (
                    <div className="mt-4 rounded-md border border-white/5 bg-[#0b1220] p-3">
                      <Input placeholder="Search currency..." value={curSearch} onChange={(e) => setCurSearch(e.target.value)} />
                      <div className="grid gap-2 mt-2" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
                        {list.map((c) => (
                          <button key={c} type="button" onClick={() => { setCurrency(c); setMenuOpen(false); setMenuCurrencyOpen(false); }} className="px-3 py-2 rounded-md bg-transparent hover:bg-white/5 text-white text-sm">{c}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {isHome && (
              <>
                <a href="#how" className="px-3 py-2 rounded-md hover:bg-white/5 transition">How it works</a>
                <a href="#faq" className="px-3 py-2 rounded-md hover:bg-white/5 transition">FAQ</a>
              </>
            )}
          </div>
        </div>,
        document.body
      )}

    </header>
  );
}
