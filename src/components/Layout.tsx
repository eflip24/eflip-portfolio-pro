import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ParticleField from "./ParticleField";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col relative">
    <ParticleField />
    <Navbar />
    <main className="flex-1 pt-16 relative z-10">{children}</main>
    <Footer />
  </div>
);

export default Layout;
