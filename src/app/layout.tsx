import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
const roboto = Roboto({
    weight: ["100","300","400","500","700","900"],
    subsets: ["latin"],
    style: ["normal","italic"],
    display: 'swap',
})
export const metadata: Metadata = {
    title: "PolyBot Dashboard",
    description: "The web dashboard for PolyBot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
      <main>
        {children}
      </main>
      <div className="bg-container">
          <svg id="Layer_2" className="bg-gradient" data-name="Layer 2" viewBox="0 0 1222 681" width="100%" height="100%" preserveAspectRatio="none">
              <defs>
                  <linearGradient id="linear-gradient" x1="235" y1="340.5" x2="1222" y2="340.5"
                                  gradientUnits="userSpaceOnUse">
                      <stop offset=".49" stopColor="#08222b"/>
                      <stop offset=".63" stopColor="#171433"/>
                      <stop offset=".75" stopColor="#28063d"/>
                      <stop offset="1" stopColor="#3b0b37"/>
                  </linearGradient>
                  <radialGradient id="radial-gradient" cx="715.98" cy="360.85" fx="1306.56" fy="18.44" r="682.67"
                                  gradientTransform="translate(-290.95) scale(1.24 1)" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#09050b" stopOpacity="0"/>
                      <stop offset=".66" stopColor="#09050b"/>
                  </radialGradient>
              </defs>
                  <rect className="cls-1" x="235" width="987" height="681"/>
                  <rect className="cls-2" width="1222" height="683"/>
          </svg>
      </div>
      </body>
    </html>
  );
}