import { HakenIcon, KreuzIcon } from "@/components/icons/UiIcons";

export function Umfang({
  titel,
  eintraege,
  zeichen,
}: {
  titel: string;
  eintraege: readonly string[];
  zeichen: "haken" | "kreuz";
}) {
  const Zeichen = zeichen === "haken" ? HakenIcon : KreuzIcon;
  return (
    <section>
      <h2 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">{titel}</h2>
      <ul className="mt-3 space-y-2.5">
        {eintraege.map((e) => (
          <li key={e} className="flex gap-2.5 leading-relaxed">
            <Zeichen className="mt-1 size-4 shrink-0 text-text-zweit" />
            <span>{e}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
