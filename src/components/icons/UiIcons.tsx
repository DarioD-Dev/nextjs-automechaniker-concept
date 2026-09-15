import type { SVGProps } from "react";

// Fünf Symbole selbst gezeichnet statt ein Icon-Paket als Abhängigkeit
// aufzunehmen. Bei dreißig ohnehin handgezeichneten Fachsymbolen wäre eine
// zweite Strichstärke aus fremder Hand nur Bruch im Bild.
type Props = SVGProps<SVGSVGElement>;

const gemeinsam = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function TelefonIcon(props: Props) {
  return (
    <svg {...gemeinsam} {...props}>
      <path d="M7.5 3.5h-3a1.5 1.5 0 0 0-1.5 1.6C3.6 13.3 10.7 20.4 18.9 21a1.5 1.5 0 0 0 1.6-1.5v-3a1.5 1.5 0 0 0-1.3-1.5l-2.6-.4a1.5 1.5 0 0 0-1.4.6l-.9 1.2a13 13 0 0 1-5.3-5.3l1.2-.9a1.5 1.5 0 0 0 .6-1.4l-.4-2.6a1.5 1.5 0 0 0-1.5-1.3z" />
    </svg>
  );
}

export function PfeilRechtsIcon(props: Props) {
  return (
    <svg {...gemeinsam} {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function DruckenIcon(props: Props) {
  return (
    <svg {...gemeinsam} {...props}>
      <path d="M7 9V3h10v6M7 19H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M7 15h10v6H7z" />
    </svg>
  );
}

export function ChevronIcon(props: Props) {
  return (
    <svg {...gemeinsam} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function HakenIcon(props: Props) {
  return (
    <svg {...gemeinsam} {...props}>
      <path d="m4 12.5 5.5 5.5L20 7" />
    </svg>
  );
}

export function KreuzIcon(props: Props) {
  return (
    <svg {...gemeinsam} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
