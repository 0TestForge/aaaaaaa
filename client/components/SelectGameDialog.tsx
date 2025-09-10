import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function SelectGameDialog({ children }: { children: React.ReactNode }) {
  const items = [
    {
      id: "mm",
      name: "Murder Mystery",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fb2458d5aab5847128a2b754080dc1712%2F155ecd3b276d4626afdb8f1be5054597?format=webp&width=800",
    },
    {
      id: "grow",
      name: "Grow a Garden",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fb2458d5aab5847128a2b754080dc1712%2F824f285113f54ff094f70b7dac6cb138?format=webp&width=800",
    },
    {
      id: "blox",
      name: "Blox Fruits",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fa17b3953a32448139f60d7c2bcda706b%2F1e72998e48794cf699143ac972a8c060?format=webp&width=800",
    },
    {
      id: "blade",
      name: "Blade Ball",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fb2458d5aab5847128a2b754080dc1712%2F87d9886f76244cb5ba71707762c2fcd1?format=webp&width=800",
    },
    {
      id: "brainrot",
      name: "Steal a Brainrot",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fb2458d5aab5847128a2b754080dc1712%2Fd5e8426a3e46435f9c8be0bc746e8e68?format=webp&width=800",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="w-[92vw] max-w-md sm:max-w-4xl md:max-w-5xl lg:max-w-6xl max-h-[85vh] overflow-auto sm:overflow-hidden bg-cover bg-center p-4 sm:p-6 md:p-8"
        style={{
          backgroundImage:
            "url(https://cdn.builder.io/api/v1/image/assets%2F63c936af87bb4092b7300f333f376cfe%2F7521b0d700404c0ea553f70afb05386d?format=webp&width=1200)",
        }}
      >
        <div className="p-6 pt-4 md:p-8 md:pt-6">
          <DialogHeader className="-mt-1">
            <DialogTitle className="text-2xl md:text-4xl font-extrabold tracking-wider uppercase text-foreground drop-shadow-sm">Choose a Game</DialogTitle>
          </DialogHeader>
          <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-4 lg:gap-6">
            {items.map((it) => (
              <Button
                key={it.id}
                className="group w-full rounded-2xl border border-white/10 bg-white/5 p-2 sm:p-3 md:p-4 lg:p-5 hover:bg-white/10 text-center sm:text-left flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3 md:gap-4 h-auto sm:h-28 md:h-36 lg:h-40"
                onClick={() => {
                  const e = new CustomEvent("game:selected", { detail: it });
                  window.dispatchEvent(e);
                  if (it.id === "grow") window.location.assign("/grow"); else if (it.id === "mm") window.location.assign("/mm"); else if (it.id === "brainrot") window.location.assign("/brainrot"); else if (it.id === "blox") window.location.assign("/blox");
                }}
              >
                <span className="relative inline-flex h-14 w-16 sm:h-20 sm:w-24 md:h-28 md:w-36 lg:h-32 lg:w-40 shrink-0 overflow-hidden rounded-xl border border-white/10">
                  <img src={it.image} alt={`${it.name} cover`} className="h-full w-full object-cover" />
                </span>
                <span className="sm:ml-1">
                  <span className="block text-xs sm:text-base md:text-xl font-semibold leading-tight">{it.name}</span>
                  <span className="mt-0.5 hidden sm:block text-xs md:text-sm text-muted-foreground">Tap to view items</span>
                </span>
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
