import { Preis } from "@/components/ui/Preis";

export function Konstante({
  titel,
  betrag,
  text,
  className,
}: {
  titel: string;
  betrag: string;
  text: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">{titel}</p>
      <p className="mt-3 leading-none">
        <Preis preis={betrag} className="text-zahl" />
      </p>
      <p className="mt-4 max-w-[46ch] leading-relaxed text-text-zweit">{text}</p>
    </div>
  );
}
