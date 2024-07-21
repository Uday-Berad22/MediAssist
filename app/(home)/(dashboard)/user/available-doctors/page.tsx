import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDoctors, getSpecialties } from "@/sanity/sanity-util";
import Link from "next/link";
import React from "react";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  available: boolean;
}

const AvailableDocter: React.FC = async () => {
  // Sample doctor data
  const doctors = await getDoctors();
  const specility = await getSpecialties();
  // const specialty = await getSpecialtiesbyID(doctors[].specialty);

  // <div
  //   key={doctor.id}
  //   className={`flex justify-between items-center border-b border-gray-200 py-2 px-4 ${
  //     doctor.available ? "text-green-600" : "text-red-600"
  //   }`}
  // >
  //   <span className="font-semibold">{doctor.name}</span>
  //   <span>{doctor.specialty}</span>
  //   <span>{doctor.available ? "Available" : "Not Available"}</span>
  // </div>
  const renderDoctors = () => {
    return (
      <Table className="p-4">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Appointment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{doctor.name}</TableCell>
              <TableCell>
                {specility.map((sp) => {
                  if (sp._id === doctor.specialty) return sp.name;
                })}
              </TableCell>
              <TableCell>{doctor.timing}</TableCell>
              <TableCell>
                {
                  <Link
                    href={`/user/available-doctors/${doctor.slug}`}
                    className="text-blue-600"
                  >
                    Take Appointment
                  </Link>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="flex justify-center items-start mt-8">
      <div className="bg-white rounded-lg shadow-lg p-4 dark:bg-gray-900 w-[80vw]">
        <h2 className="text-lg font-semibold mb-4">Available Doctors</h2>
        {renderDoctors()}
      </div>
    </div>
  );
};

export default AvailableDocter;
