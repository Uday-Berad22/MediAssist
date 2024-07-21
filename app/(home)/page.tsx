import GlobeDemo from "@/components/3D/globe";
import React from "react";
import { Navbar } from "@/components/home/navbar";
import { SparklesCore } from "@/components/ui/sparkles";

const Home = () => {
  return (
    <main>
      <div className="h-full">
        <div className="h-[80px] fixed inset-y-0 w-full z-50">
          <Navbar />
        </div>
        <div className="h-[40rem] relative">
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
          <main className="py-[80px] h-full">
            <div className="p-4 bg-white dark:bg-black rounded-lg flex items-center flex-col w-screen">
              <h2 className="text-navy text-2xl mb-4">
                Get Started with MediAssist
              </h2>
              <p className="text-lg">
                Create a secure and shareable medical record system for patients
                and doctors.
              </p>
            </div>
            <GlobeDemo />
          </main>
        </div>
      </div>
    </main>
  );
};

export default Home;
