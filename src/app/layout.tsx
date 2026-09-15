// Die echte Hülle steht in app/[locale]/layout.tsx — dort ist die Sprache
// bekannt, die das <html lang> braucht.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
