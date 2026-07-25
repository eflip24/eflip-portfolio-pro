import { ReactNode, lazy, Suspense } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StickyCTA from "./StickyCTA";
import { useIsMobile } from "@/hooks/use-mobile";

const ParticleField = lazy(() => import("./ParticleField"));

const Layout = ({ children }: { children: ReactNode }) => {
  const isMobile = useIsMobile();
  return (
    <div className="min-h-screen flex flex-col relative">
      {!isMobile && (
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      )}
      <Navbar />
      <main className="flex-1 pt-16 relative z-10">{children}</main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default Layout;
