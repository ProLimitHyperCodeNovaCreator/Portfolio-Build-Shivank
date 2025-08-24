import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Portfolio - Shivank Goyal | Robotics & Autonomous Systems Engineer | IIT Patna",
  description:
    "I’m Shivank Goyal, a B.Tech student at IIT Patna with a deep focus on robotics and simulations. My portfolio showcases projects in PX4, ROS, GNSS-denied navigation, and fault-tolerant drone systems — bridging the gap between simulation and real-world autonomy.",
  keywords: [
    "Shivank Goyal",
    "Robotics Engineer",
    "Autonomous Systems Engineer",
    "Aerial Robotics",
    "Techeagle",
    "Drone Engineer",
    "GNSS-denied navigation",
    "IIT Patna",
  ],
  authors: [
    {
      name: "Shivank Goyal",
      url: "https://www.linkedin.com/in/shivankgoyal23",
    },
  ],
  openGraph: {
    title: "Shivank Goyal | Robotics & Autonomous Systems Engineer",
    description:
      "Portfolio showcasing PX4, ROS, GNSS-denied navigation, and fault-tolerant drone systems.",
    url: "https://www.shivank.me/",
    siteName: "Shivank Goyal Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shivank Goyal - Robotics Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivank Goyal | Robotics & Autonomous Systems Engineer",
    description:
      "Portfolio showcasing PX4, ROS, GNSS-denied navigation, and autonomous drones.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
