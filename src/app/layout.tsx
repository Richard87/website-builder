import type {Metadata} from "next";
import localFont from "next/font/local";
import './globals.css'

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Webpage build demo",
    description: "Webpage build demo",
};


export default async function RootLayout({children}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ slug: string }>
}>) {
    return (
        <html lang="en" data-theme="cupcake">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            {children}
        </body>
        </html>
    );
}
