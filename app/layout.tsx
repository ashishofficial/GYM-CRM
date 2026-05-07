import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PulseGym CRM",
  description: "Modern gym management & member CRM",
};

// Suppresses the harmless Recharts ResponsiveContainer warning that fires once
// on first paint before ResizeObserver reports parent dimensions.
const filterRechartsWarning = `
(function(){
  if (typeof window === 'undefined' || window.__rcWarnFiltered) return;
  window.__rcWarnFiltered = true;
  var origWarn = console.warn;
  console.warn = function(){
    var msg = arguments[0];
    if (typeof msg === 'string' && msg.indexOf('width(-1) and height(-1)') !== -1) return;
    return origWarn.apply(console, arguments);
  };
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: filterRechartsWarning }} />
      </head>
      <body className="font-sans">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "10px",
              background: "#0f172a",
              color: "#fff",
              fontSize: "13px",
              padding: "10px 14px",
            },
            success: { iconTheme: { primary: "#10b981", secondary: "#fff" } },
            error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
          }}
        />
      </body>
    </html>
  );
}
