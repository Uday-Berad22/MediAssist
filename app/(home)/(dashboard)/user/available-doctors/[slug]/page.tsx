import {
  getDoctorBySlug,
  getEducationById,
  getSpecialtiesById,
  getWork,
} from "@/sanity/sanity-util";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Appointmentpage from "./appointment";

const DoctorAppointmentPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const doctor = await getDoctorBySlug(params.slug);
  const specialty = await getSpecialtiesById(doctor.specialty);
  const work = await getWork(doctor.pastExperience);
  const education = await getEducationById(doctor.education);
  // console.log(doctor);
  const { userId } = auth();
  // console.log(work);
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 flex justify-center items-start  p-4">
        <div className="relative md:w-1/2 h-96">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <Image
              src={doctor.image}
              alt={doctor.name}
              height={500}
              width={500}
              className="object-cover w-full h-full rounded-3xl"
            />
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
                {doctor.name}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mt-1">
                Speciality : {specialty.name}
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-4 mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <FaPhoneAlt className="mr-2" />
                <span className="text-lg md:text-xl lg:text-2xl font-semibold">
                  {doctor.phone}
                </span>
              </div>
              <div className="flex items-center mb-4 md:mb-0">
                <FaEnvelope className="mr-2" />
                <span className="text-lg md:text-xl lg:text-2xl font-semibold">
                  {doctor.email}
                </span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span className="text-lg md:text-xl lg:text-2xl font-semibold">
                  {doctor.location}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 flex flex-col justify-center md:w-1/2">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Experience & Education
            </h2>
            <div className="text-lg md:text-xl lg:text-2xl text-gray-700">
              <p>
                <strong>Past Experience:</strong>{" "}
                {work.map((m, i) => (
                  <div key={i}>{m.hospital}</div>
                ))}
              </p>
              <p>
                <strong>Education:</strong>
                {education.map((e, i) => (
                  <div key={i}>{e.college}</div>
                ))}
              </p>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Bio
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700">
              {doctor.bio}
            </p>
          </div>
          {/* Add Certifications Section Here */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Timing
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700">
              {doctor.timing}
            </p>
          </div>
          <Appointmentpage id={doctor.doctorid} userid={userId!} />
        </div>
      </div>
    </>
  );
};

export default DoctorAppointmentPage;
