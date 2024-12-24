import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./component/ThemeProvider";
import Header from "./component/Header";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VidGrab - Download Content Seamlessly",
  description: "VidGrab lets you effortlessly download videos, images, and other content from your favorite social media platforms.",
  keywords: "VidGrab, video downloader, social media video dwwnloader, TikTok, Facebook, content downloader, Next.js, React",
  author: "Ahmed",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "VidGrab - Download Content Seamlessly",
    description: "Access and download videos, images, and posts from TikTok, Facebook, and other platforms with VidGrab.",
    url: "https://social-media-tool-kohl.vercel.app/", // Replace with your app's URL
    image: "https://qu.ax/HRBWX.jpg", // Replace with your app's image URL
    type: "website",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
