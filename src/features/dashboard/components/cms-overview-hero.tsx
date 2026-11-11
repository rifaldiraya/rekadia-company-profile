"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import { Box, Button, Chip, Paper, Stack, Typography, keyframes } from "@mui/material";
import { ArrowDownwardRounded, OpenInNewRounded } from "@mui/icons-material";
import { CMS_COLLECTION_GROUPS } from "@/features/dashboard/data/cms-collections";
import { CMS_ROUTES } from "@/features/cms/config/cms-resources";
import { useCmsCollections } from "@/features/cms/hook/use-cms";
import type { CmsCollectionSummary } from "@/features/cms/types/cms";
import { usePrefersReducedMotion } from "@/hook/use-prefers-reduced-motion";

const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";
const COUNT_UP_MS = 900;

const float = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -14px, 0); }
`;

const rise = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

const greetingFor = (hour: number) => {
  if (hour < 11) return "Good morning";
  if (hour < 15) return "Good afternoon";
  if (hour < 19) return "Good evening";
  return "Good night";
};

function useCountUp(target: number, enabled: boolean) {
  const [value, setValue] = useState(enabled ? 0 : target);

  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return undefined;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / COUNT_UP_MS, 1);
      setValue(Math.round(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, enabled]);

  return value;
}

function Stat({ label, value, animate }: { label: string; value: number; animate: boolean }) {
  const shown = useCountUp(value, animate);
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        px: { xs: 1.5, sm: 2 },
        py: 1.5,
        borderRadius: 3,
        bgcolor: "rgba(255,255,255,.1)",
        border: "1px solid rgba(255,255,255,.18)",
        backdropFilter: "blur(10px)",
        transition: "background-color 200ms ease, transform 200ms ease",
        "&:hover": { bgcolor: "rgba(255,255,255,.16)", transform: "translateY(-2px)" },
        [REDUCED_MOTION]: { "&:hover": { transform: "none" } },
      }}
    >
      <Typography sx={{ fontSize: { xs: 22, sm: 26 }, fontWeight: 700, lineHeight: 1.2 }}>{shown}</Typography>
      <Typography noWrap sx={{ fontSize: { xs: 12, sm: 13 }, color: "rgba(255,255,255,.75)" }}>{label}</Typography>
    </Box>
  );
}

const NO_COLLECTIONS: CmsCollectionSummary[] = [];

export default function CmsOverviewHero() {
  const { data: session } = useSession();
  const reducedMotion = usePrefersReducedMotion();
  const { data: collections = NO_COLLECTIONS } = useCmsCollections();
  const totalItems = collections.reduce((total, collection) => total + collection.itemCount, 0);
  const topCollections = useMemo(
    () => [...collections].sort((a, b) => b.itemCount - a.itemCount).slice(0, 5),
    [collections],
  );
  const topMax = Math.max(topCollections[0]?.itemCount ?? 1, 1);
  const panelRef = useRef<HTMLDivElement>(null);
  const [greeting, setGreeting] = useState("Welcome back");
  const [barsReady, setBarsReady] = useState(false);

  useEffect(() => {
    setGreeting(greetingFor(new Date().getHours()));
    const timer = setTimeout(() => setBarsReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    if (!panel || reducedMotion) return;
    const rect = panel.getBoundingClientRect();
    panel.style.setProperty("--mx", (((event.clientX - rect.left) / rect.width) * 2 - 1).toFixed(3));
    panel.style.setProperty("--my", (((event.clientY - rect.top) / rect.height) * 2 - 1).toFixed(3));
  };

  const role = session?.user?.roles?.[0];

  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 2fr) minmax(0, 1fr)" },
        mb: 4,
      }}
    >
      <Box
        ref={panelRef}
        onMouseMove={handleMouseMove}
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 4,
          p: { xs: 3, sm: 4 },
          color: "white",
          background: "linear-gradient(135deg, #063646 0%, #006876 52%, #00c2dc 100%)",
          boxShadow: "0 24px 48px -28px rgba(0,104,118,.9)",
          animation: `${rise} 600ms ease both`,
          [REDUCED_MOTION]: { animation: "none" },
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
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse at 80% 20%, black 10%, transparent 70%)",
          }}
        />
        {[
          { size: 240, top: -90, right: -40, color: "rgba(37,193,218,.4)", depth: -20, delay: "0s" },
          { size: 120, top: 110, right: 160, color: "rgba(196,243,255,.16)", depth: 26, delay: "-4s" },
        ].map((blob) => (
          <Box
            key={blob.size}
            aria-hidden="true"
            sx={{
              position: "absolute",
              top: blob.top,
              right: blob.right,
              width: blob.size,
              height: blob.size,
              transform: `translate3d(calc(var(--mx, 0) * ${blob.depth}px), calc(var(--my, 0) * ${blob.depth}px), 0)`,
              transition: "transform 400ms ease-out",
              [REDUCED_MOTION]: { transform: "none" },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: blob.color,
                animation: `${float} 8s ease-in-out ${blob.delay} infinite`,
                [REDUCED_MOTION]: { animation: "none" },
              }}
            />
          </Box>
        ))}

        <Box sx={{ position: "relative" }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
            <Box component="span" sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "#25c1da" }} />
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#c4f3ff" }}>{greeting}</Typography>
            {role && (
              <Chip
                label={role}
                size="small"
                sx={{ height: 22, fontSize: 11, fontWeight: 600, color: "white", bgcolor: "rgba(255,255,255,.16)" }}
              />
            )}
          </Stack>
          <Typography component="h2" sx={{ fontSize: { xs: 24, sm: 30 }, fontWeight: 700, lineHeight: 1.2 }}>
            Hi, {session?.user?.name ?? "there"}
          </Typography>
          <Typography sx={{ mt: 1, maxWidth: 520, fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,.8)" }}>
            Manage the news, case studies, clients, and testimonials shown on rekadia.co.id.
          </Typography>

          <Stack direction="row" spacing={{ xs: 1, sm: 1.5 }} sx={{ mt: 3 }}>
            <Stat label="Collections" value={collections.length} animate={!reducedMotion} />
            <Stat label="Total items" value={totalItems} animate={!reducedMotion} />
            <Stat label="Groups" value={CMS_COLLECTION_GROUPS.length} animate={!reducedMotion} />
          </Stack>

          <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1.5} sx={{ mt: 3 }}>
            <Button
              href="#collections"
              endIcon={<ArrowDownwardRounded />}
              sx={{
                px: 2.5,
                borderRadius: 2.5,
                color: "#063646",
                bgcolor: "white",
                "&:hover": { bgcolor: "#c4f3ff" },
              }}
            >
              Browse collections
            </Button>
            <Button
              href="/"
              target="_blank"
              rel="noopener"
              endIcon={<OpenInNewRounded />}
              sx={{
                px: 2.5,
                borderRadius: 2.5,
                color: "white",
                border: "1px solid rgba(255,255,255,.4)",
                "&:hover": { bgcolor: "rgba(255,255,255,.1)", borderColor: "white" },
              }}
            >
              View website
            </Button>
          </Stack>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid #e3eaef",
          animation: `${rise} 600ms ease 120ms both`,
          [REDUCED_MOTION]: { animation: "none" },
        }}
      >
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#22272f" }}>Largest collections</Typography>
        <Typography sx={{ fontSize: 13, color: "#667991", mb: 2.5 }}>By number of items</Typography>
        <Stack component="ol" spacing={2} sx={{ listStyle: "none", m: 0, p: 0 }}>
          {topCollections.map((collection, index) => (
            <Box component="li" key={collection.slug}>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                <Typography
                  component={NextLink}
                  href={CMS_ROUTES.list(collection.slug)}
                  sx={{ fontSize: 14, fontWeight: 600, color: "#22272f", textDecoration: "none", "&:hover": { color: "#006876" } }}
                >
                  {collection.name}
                </Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#006876" }}>{collection.itemCount}</Typography>
              </Stack>
              <Box sx={{ height: 8, borderRadius: 4, bgcolor: "#ecf3f6", overflow: "hidden" }}>
                <Box
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    width: barsReady ? `${(collection.itemCount / topMax) * 100}%` : 0,
                    background: "linear-gradient(90deg, #006876, #00c2dc)",
                    transition: `width 900ms cubic-bezier(.2,.8,.2,1) ${index * 90}ms`,
                    [REDUCED_MOTION]: { transition: "none" },
                  }}
                />
              </Box>
            </Box>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}
