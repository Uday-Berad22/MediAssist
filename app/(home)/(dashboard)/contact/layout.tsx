import { Navbar } from "@/components/home/navbar";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";

const ContactLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      <div className="relative">
        <div className="w-full absolute top-0 inset-0 h-screen z-10">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default ContactLayout;
