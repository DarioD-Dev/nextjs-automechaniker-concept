import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Ohne diese Erweiterung hält tailwind-merge unsere eigenen Schriftgrad-Token
// (text-hero, text-abschnitt, …) für Textfarben und wirft sie still weg,
// sobald daneben eine echte Textfarbe steht.
const kwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["marke", "hero", "abschnitt", "block", "lead", "label", "zahl", "zahl-klein"] },
      ],
      py: [{ py: ["abschnitt", "abschnitt-lg"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return kwMerge(clsx(inputs));
}
