import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/custom/ThemeProvider";
import Header from "@/components/custom/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "VidGrab - Universal Social Media Media Engine",
  description: "VidGrab lets you effortlessly download HD videos, images, and MP3 audio from TikTok, Instagram, X (Twitter), YouTube, Facebook, and Spotify.",
  keywords: "VidGrab, video downloader, social media video downloader, TikTok downloader, YouTube MP3, Twitter downloader, Next.js, React",
  author: "Ahmed",
  robots: "index, follow",
  openGraph: {
    title: "VidGrab - Universal Social Media Media Engine",
    description: "Access and download videos, images, and audio seamlessly with VidGrab.",
    url: "https://social-media-tool-kohl.vercel.app/",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="flex-1">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
