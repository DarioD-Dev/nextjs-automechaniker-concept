export function Liste({ titel, eintraege }: { titel: string; eintraege: readonly string[] }) {
  return (
    <div>
      <h3 className="font-mono text-label tracking-[0.09em] text-text-zweit uppercase">{titel}</h3>
      <ul className="mt-3 space-y-2">
        {eintraege.map((e) => (
          <li key={e} className="flex gap-2.5 leading-relaxed">
            <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-linie-stark" />
            <span>{e}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
