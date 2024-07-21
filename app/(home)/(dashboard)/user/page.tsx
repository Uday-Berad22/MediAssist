import Image from "next/image";
import React from "react";
import healthimage from "@/public/health.jpg";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const appointments = [
  {
    appointmentCount: 0,
    appointmentType: "Live Appointment",
    appointmentLink: "/user/appointments",
  },
  {
    appointmentCount: 0,
    appointmentType: "Approved Appointment",
    appointmentLink: "/user/appointments",
  },
  {
    appointmentCount: 0,
    appointmentType: "Cancelled Appointment",
    appointmentLink: "/user/appointments",
  },
  {
    appointmentCount: 3,
    appointmentType: "Available Doctors",
    appointmentLink: "/user/available-doctors",
  },
];

const UserPage = () => {
  return (
    <main>
      <div className="text-3xl font-bold p-4">DashBoard</div>
      <div className="relative">
        <Image
          src={healthimage}
          alt="health"
          className="w-screen h-[60vh] lg:h-80 lg:p-4 rounded-xl opacity-35"
        />
        <div className="absolute top-0 p-2 lg:p-4">
          <h3 className="lg:p-4 py-2 text-xl font-bold">Welcome !</h3>
          <div className="text-3xl font-bold py-2 lg:p-4">View Appointment</div>
          <p className=" font-serif lg:p-4 lg:w-[80vw] text-wrap">
            Thank you for choosing our service. We are committed to providing
            you with exceptional care and convenience. You can access your
            appointment details through the provided link. As part of our
            dedication to your well-being, we also offer home visits for patient
            appointments. Your health and satisfaction are our top priorities,
            and we are here to assist you every step of the way.
          </p>
          <div className="flex mt-2 lg:w-[80vw] justify-center">
            <Button className="bg-blue-600 text-white">
              <Link href="user/available-doctors">Want an Appointment?</Link>
            </Button>
          </div>
        </div>
        <h2 className="text-3xl m-4">Status</h2>
        <div className="flex flex-wrap justify-between">
          {appointments.map((appointments, index) => (
            <Link key={index} href={appointments.appointmentLink}>
              <div className="w-[40vw] border border-cyan-600 rounded-xl m-4">
                <h2 className="p-3 text-xl font-bold">
                  {appointments.appointmentCount}
                </h2>
                <p className="p-3 text-xl font-bold">
                  {appointments.appointmentType}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default UserPage;
