import { cn } from "@/lib/cn";

export function CheckIcon({ muted = false }: { muted?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 14 11" fill="none" className="h-5 w-3.5 shrink-0">
      <path
        d="M1.1665 6.46387L4.49984 9.7972L12.8332 1.46387"
        stroke={muted ? "#B0BAC9" : "#27B7D5"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CustomPlanIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 15 14" fill="none" className="h-5 w-3.5 shrink-0">
      <path
        d="M2.19 13.13c-.39 0-.72-.14-1-.41a1.37 1.37 0 0 1-.42-1V1.8c0-.39.14-.72.42-1 .28-.28.61-.42 1-.42h9.92c.39 0 .72.14 1 .42.28.28.42.61.42 1v4a4.6 4.6 0 0 0-1.42-.41V1.8H2.19v6.38h2.98c.1.32.28.6.53.83.25.24.52.4.83.5a4.6 4.6 0 0 0-.04 1.43 3.8 3.8 0 0 1-2.18-1.35H2.19v2.13h4.48c.08.26.18.5.28.74.11.24.24.46.39.67H2.19Zm8.52.71-.21-1.06a3.6 3.6 0 0 1-.78-.43l-1.03.32-.71-1.2.82-.71a2.7 2.7 0 0 1 0-.92l-.82-.71.71-1.2 1.03.32c.13-.1.25-.17.38-.24.12-.06.25-.13.4-.19l.21-1.06h1.42l.21 1.06c.14.06.27.12.4.19.12.07.25.15.38.24l1.03-.32.71 1.2-.82.71a2.7 2.7 0 0 1 0 .92l.82.71-.71 1.2-1.03-.32c-.13.1-.26.17-.38.24-.12.07-.26.13-.4.19l-.21 1.06h-1.42Zm.71-2.12c.39 0 .72-.14 1-.42.28-.28.42-.61.42-1s-.14-.72-.42-1c-.28-.28-.61-.42-1-.42s-.72.14-1 .42c-.28.28-.42.61-.42 1s.14.72.42 1c.28.28.61.42 1 .42Z"
        fill="#27B7D5"
      />
    </svg>
  );
}

export function FaqChevron({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" width="32" height="33" viewBox="0 0 32 33" fill="none" className={cn("shrink-0", className)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.94 15.19a1.33 1.33 0 0 1 0 1.88l-7.54 7.55a1.33 1.33 0 1 1-1.89-1.89l6.6-6.6-6.6-6.6a1.33 1.33 0 0 1 1.89-1.88l7.54 7.54Z"
        fill="#27B7D5"
      />
    </svg>
  );
}
