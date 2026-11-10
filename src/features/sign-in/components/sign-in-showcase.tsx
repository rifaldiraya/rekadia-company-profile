"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { Box, Stack, Typography, keyframes } from "@mui/material";
import { CMS_COLLECTIONS, CMS_TOTAL_ITEMS } from "@/features/dashboard/data/cms-collections";
import { usePrefersReducedMotion } from "@/hook/use-prefers-reduced-motion";

const PREVIEW = ["News", "Case Studies", "Clients", "Industries", "Careers"]
  .map((name) => CMS_COLLECTIONS.find((collection) => collection.name === name))
  .filter((collection) => collection !== undefined);

const HIGHLIGHT_MS = 2200;

const float = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(0, -18px, 0) scale(1.05); }
`;

const rise = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

function Blob({ size, top, left, color, depth, delay }: {
  size: number;
  top: string;
  left: string;
  color: string;
  depth: number;
  delay: string;
}) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        top,
        left,
        width: size,
        height: size,
        transform: `translate3d(calc(var(--mx, 0) * ${depth}px), calc(var(--my, 0) * ${depth}px), 0)`,
        transition: "transform 400ms ease-out",
        [REDUCED_MOTION]: { transform: "none" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: color,
          filter: "blur(2px)",
          animation: `${float} 9s ease-in-out ${delay} infinite`,
          [REDUCED_MOTION]: { animation: "none" },
        }}
      />
    </Box>
  );
}

export default function SignInShowcase() {
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const timer = setInterval(() => setActive((index) => (index + 1) % PREVIEW.length), HIGHLIGHT_MS);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    if (!panel || reducedMotion) return;
    const rect = panel.getBoundingClientRect();
    panel.style.setProperty("--mx", (((event.clientX - rect.left) / rect.width) * 2 - 1).toFixed(3));
    panel.style.setProperty("--my", (((event.clientY - rect.top) / rect.height) * 2 - 1).toFixed(3));
  };

  return (
    <Box
      ref={panelRef}
      onMouseMove={handleMouseMove}
      sx={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        p: { md: 6, lg: 8 },
        color: "white",
        background: "linear-gradient(135deg, #063646 0%, #006876 48%, #00c2dc 100%)",
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at 30% 40%, black 20%, transparent 75%)",
        }}
      />
      <Blob size={320} top="-80px" left="55%" color="rgba(37,193,218,.35)" depth={-24} delay="0s" />
      <Blob size={220} top="62%" left="-60px" color="rgba(196,243,255,.18)" depth={18} delay="-3s" />
      <Blob size={120} top="38%" left="72%" color="rgba(255,255,255,.12)" depth={32} delay="-6s" />

      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ position: "relative" }}>
        <Box sx={{ bgcolor: "white", borderRadius: 2, p: 0.75, display: "flex" }}>
          <Image src="/logo.png" alt="" width={32} height={32} />
        </Box>
        <Typography fontWeight={700} fontSize={20} letterSpacing={0.2}>
          Rekadia <Box component="span" sx={{ fontWeight: 500, opacity: 0.8 }}>CMS</Box>
        </Typography>
      </Stack>

      <Box sx={{ position: "relative", maxWidth: 520, animation: `${rise} 700ms ease both`, [REDUCED_MOTION]: { animation: "none" } }}>
        <Typography
          component="p"
          sx={{ display: "inline-flex", alignItems: "center", gap: 1, fontSize: 14, fontWeight: 600, color: "#c4f3ff", mb: 2 }}
        >
          <Box component="span" sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "#25c1da" }} />
          Content Management
        </Typography>
        <Typography component="h2" sx={{ fontSize: { md: 34, lg: 40 }, lineHeight: 1.15, fontWeight: 700 }}>
          Make IT work for your website content.
        </Typography>
        <Typography sx={{ mt: 2, fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,.78)" }}>
          Update news, case studies, clients, and testimonials for rekadia.co.id from one place.
        </Typography>

        <Box
          sx={{
            mt: 5,
            p: 2.5,
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,.1)",
            border: "1px solid rgba(255,255,255,.2)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" mb={1.5}>
            <Typography fontWeight={600} fontSize={14}>
              {CMS_COLLECTIONS.length} collections
            </Typography>
            <Typography fontSize={13} sx={{ color: "rgba(255,255,255,.7)" }}>
              {CMS_TOTAL_ITEMS} items
            </Typography>
          </Stack>
          <Stack component="ul" spacing={0.75} sx={{ listStyle: "none", m: 0, p: 0 }}>
            {PREVIEW.map((collection, index) => {
              const isActive = index === active;
              return (
                <Box
                  component="li"
                  key={collection.slug}
                  onMouseEnter={() => setActive(index)}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 1.5,
                    py: 1,
                    borderRadius: 2,
                    fontSize: 14,
                    cursor: "default",
                    transition: "background-color 300ms ease, transform 300ms ease",
                    bgcolor: isActive ? "rgba(255,255,255,.18)" : "transparent",
                    transform: isActive ? "translateX(6px)" : "none",
                    [REDUCED_MOTION]: { transform: "none" },
                  }}
                >
                  <span>{collection.name}</span>
                  <Box
                    component="span"
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      px: 1,
                      py: 0.25,
                      borderRadius: 10,
                      bgcolor: isActive ? "#25c1da" : "rgba(255,255,255,.14)",
                      transition: "background-color 300ms ease",
                    }}
                  >
                    {collection.itemCount}
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Box>

      <Typography sx={{ position: "relative", fontSize: 13, color: "rgba(255,255,255,.6)" }}>
        © PT. Rekadia Solusi Teknologi
      </Typography>
    </Box>
  );
}
