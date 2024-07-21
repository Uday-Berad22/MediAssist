import Image from "next/image";
import React from "react";
import healthimage from "@/public/health.jpg";
import Link from "next/link";
import Isavailable from "./_components/isavailable";

const doctorAppointments = [
  {
    appointmentCount: 0,
    appointmentType: "New Appointment",
    appointmentLink: "/doctor/appointments",
  },
  {
    appointmentCount: 0,
    appointmentType: "Approved Appointment",
    appointmentLink: "/doctor/appointments",
  },
  {
    appointmentCount: 0,
    appointmentType: "Cancelled Appointment",
    appointmentLink: "/doctor/appointments",
  },
  {
    appointmentCount: 0,
    appointmentType: "Total Appointment",
    appointmentLink: "/doctor/appointments",
  },
];

const DoctorPage = () => {
  return (
    <main>
      <div className="text-3xl font-bold p-4">DashBoard</div>
      <div className="relative">
        <Image
          src={healthimage}
          alt="health"
          className="w-screen h-[70vh] lg:h-96 lg:p-4 rounded-xl opacity-35"
        />
        <div className="absolute top-0 p-2 lg:p-4">
          <h3 className="lg:p-4 py-2 text-xl font-bold">Welcome !</h3>
          <div className="text-3xl font-bold py-2 lg:p-4">View Appointment</div>
          <p className=" font-serif lg:p-4 lg:w-[80vw] text-wrap">
            Thank you for entrusting us with your healthcare needs. As your
            dedicated healthcare provider, I am committed to delivering the
            highest standard of care and attention to your well-being. Your
            appointment details are accessible through the provided link,
            ensuring seamless access to your healthcare journey. Additionally, I
            am available for home visits to ensure your comfort and convenience.
            Your health is my priority, and I am here to support you in
            achieving your wellness goals.
          </p>

          <div className="flex mt-6 lg:w-[80vw] justify-center items-center">
            <Isavailable />
          </div>
        </div>
        <h2 className="text-3xl m-4">Status</h2>
        <div className="flex flex-wrap justify-between">
          {doctorAppointments.map((appointments, index) => (
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

export default DoctorPage;
