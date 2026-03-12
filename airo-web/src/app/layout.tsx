import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import "./globals.css";

export const metadata = {
  title: "Airo — AI-Powered Nutrition Tracking",
  description:
    "The world's most advanced AI nutrition tracker. Snap a photo of any meal, get instant macros, and build healthier habits — effortlessly.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          {/* ── Fixed Navigation ── */}
          <header
            className="fixed top-0 left-0 right-0 z-[100] px-6 h-16 flex items-center justify-between"
            style={{
              background: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Logo */}
            <a
              href="/"
              className="flex items-center no-underline"
            >
              <span
                className="text-3xl font-black tracking-tighter"
                style={{ color: "#f5f5f7", letterSpacing: "-0.08em" }}
              >
                airo!
              </span>
            </a>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-8">
              {["Features", "How it works", "FAQ"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
                  className="text-sm font-medium transition-colors duration-300"
                  style={{ color: "#86868b", textDecoration: "none" }}
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* Auth */}
            <div className="flex items-center gap-4">
              {!userId ? (
                <>
                  <SignInButton mode="modal">
                    <button
                      className="text-sm font-medium cursor-pointer transition-colors duration-300"
                      style={{
                        color: "#86868b",
                        background: "transparent",
                        border: "none",
                      }}
                    >
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button
                      className="text-sm font-semibold cursor-pointer px-5 py-2 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                      style={{
                        background: "#175e29",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      Get Started
                    </button>
                  </SignUpButton>
                </>
              ) : (
                <UserButton />
              )}
            </div>
          </header>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
