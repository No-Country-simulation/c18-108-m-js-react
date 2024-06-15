import ToasterProvider from "@/contexts/toaster-notify";

import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "Studium",
  description: "Tu Portal de Aprendizaje Integral",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='es' className={`${GeistSans.variable}`}>
        <body>
          <ToasterProvider>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </ToasterProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
