"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { MAX_BEOBACHTUNGEN, zuProblemen } from "@/lib/vorbefund";
import {
  abonnieren,
  hydrierung,
  schnappschuss,
  serverSchnappschuss,
  setzen,
} from "@/lib/vorbefundSpeicher";
import type { Problem } from "@/data/types";

type VorbefundWert = {
  /** Erst nach der Hydrierung wahr. Vorher ist der Vorbefund leer — auf dem
   *  Server weiß niemand, was in der Sitzung dieses Besuchers steht. */
  bereit: boolean;
  kennungen: readonly string[];
  probleme: readonly Problem[];
  enthaelt: (kennung: string) => boolean;
  umschalten: (kennung: string) => void;
  leeren: () => void;
  voll: boolean;
};

const Kontext = createContext<VorbefundWert | null>(null);

export function useVorbefund(): VorbefundWert {
  const wert = useContext(Kontext);
  if (!wert) throw new Error("useVorbefund außerhalb von VorbefundProvider benutzt");
  return wert;
}

export function VorbefundProvider({ children }: { children: React.ReactNode }) {
  const kennungen = useSyncExternalStore(abonnieren, schnappschuss, serverSchnappschuss);
  const bereit = useSyncExternalStore(
    hydrierung.abonnieren,
    hydrierung.imBrowser,
    hydrierung.aufServer,
  );

  // Der Vorbefund liegt über dem Seitenende. Ohne diesen Ausgleich verdeckt er
  // die letzten Zeilen des Fußes. Die Verschiebung passiert genau einmal, im
  // Moment einer bewussten Handlung des Besuchers — das ist erklärbar, ein
  // verdeckter Fuß nicht.
  useEffect(() => {
    document.body.classList.toggle("hat-vorbefund", kennungen.length > 0);
    return () => document.body.classList.remove("hat-vorbefund");
  }, [kennungen.length]);

  const umschalten = useCallback((kennung: string) => {
    const vorher = schnappschuss();
    if (vorher.includes(kennung)) {
      setzen(vorher.filter((k) => k !== kennung));
    } else if (vorher.length < MAX_BEOBACHTUNGEN) {
      setzen([...vorher, kennung]);
    }
  }, []);

  const wert = useMemo<VorbefundWert>(
    () => ({
      bereit,
      kennungen,
      probleme: zuProblemen(kennungen),
      enthaelt: (kennung) => kennungen.includes(kennung),
      umschalten,
      leeren: () => setzen([]),
      voll: kennungen.length >= MAX_BEOBACHTUNGEN,
    }),
    [bereit, kennungen, umschalten],
  );

  return <Kontext.Provider value={wert}>{children}</Kontext.Provider>;
}
