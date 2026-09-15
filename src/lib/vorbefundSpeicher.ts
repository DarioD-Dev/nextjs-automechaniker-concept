import { liesKennungen, schreibeKennungen } from "./vorbefund";

/**
 * Der Vorbefund liegt im sessionStorage — also in einem Speicher außerhalb von
 * React. Genau dafür gibt es `useSyncExternalStore`: Der Server liefert einen
 * leeren Schnappschuss, der Browser nach dem Einhängen den echten, und React
 * kennt den Unterschied. Das ist der Grund, warum hier kein `useEffect` mit
 * `setState` steht — das wäre ein nachgebauter Abonnementmechanismus mit
 * Kaskadenrendern obendrauf.
 *
 * Die Schnappschuss-Funktion MUSS bei unverändertem Zustand dieselbe Referenz
 * liefern, sonst rendert React endlos. Deshalb der Zwischenspeicher.
 */
const LEER: readonly string[] = [];

let zwischenspeicher: readonly string[] = LEER;
let geladen = false;
const hoerer = new Set<() => void>();

export function abonnieren(benachrichtigen: () => void): () => void {
  hoerer.add(benachrichtigen);
  return () => {
    hoerer.delete(benachrichtigen);
  };
}

export function schnappschuss(): readonly string[] {
  if (!geladen) {
    zwischenspeicher = liesKennungen();
    geladen = true;
  }
  return zwischenspeicher;
}

export function serverSchnappschuss(): readonly string[] {
  return LEER;
}

export function setzen(kennungen: readonly string[]): void {
  zwischenspeicher = kennungen;
  geladen = true;
  schreibeKennungen(kennungen);
  for (const h of hoerer) h();
}

/** Stabile Referenz, damit useSyncExternalStore nicht bei jedem Rendern neu
 *  abonniert. Der Hydrierungszustand ändert sich genau einmal — von React
 *  selbst, nicht von einem externen Ereignis. */
const keinAbonnement = () => () => {};
export const hydrierung = {
  abonnieren: keinAbonnement,
  imBrowser: () => true,
  aufServer: () => false,
};
