"use client";
import React, { useEffect, useState } from "react";

interface Checkup {
  id: number;
  date: string;
  doctor: string;
  diagnosis: string;
  bill: number;
  precription: string;
  document: string;
}
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

const CheckupHistory: React.FC = () => {
  // Sample checkup history data
  // const sampleCheckupHistory: Checkup[] = [
  //   {
  //     id: 1,
  //     date: "2023-12-10",
  //     doctor: "Dr. Smith",
  //     diagnosis: "Fever",
  //     precription: "paracetamol",
  //     bill: 100,
  //     document: "https://www.google.com",
  //   },
  //   {
  //     id: 2,
  //     date: "2023-12-10",
  //     doctor: "Dr. Johnson",
  //     bill: 100,
  //     diagnosis: "Cough",
  //     precription: "paracetamol",
  //     document: "https://www.google.com",
  //   },
  //   {
  //     id: 3,
  //     date: "2023-12-10",
  //     doctor: "Dr. Lee",
  //     bill: 100,
  //     diagnosis: "Headache",
  //     precription: "paracetamol",
  //     document: "https://www.google.com",
  //   },
  //   {
  //     id: 4,
  //     date: "2023-12-10",
  //     doctor: "Dr. Kim",
  //     diagnosis: "Stomachache",
  //     bill: 100,
  //     precription: "paracetamol",
  //     document: "https://www.google.com",
  //   },
  // ];
  const [Checkups, setCheckups] = useState<Checkup[]>([]);
  const { userId } = useAuth();
  useEffect(() => {
    const getCheckupData = async () => {
      try {
        const response = await fetch(`/api/checkup-history/${userId}`);
        const data = await response.json();
        setCheckups(data);
      } catch (error) {
        console.error("Error fetching insurance data:", error);
      }
    };
    getCheckupData();
  }, [userId]);
  const renderCheckupHistory = () => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Diagnosis</TableHead>
            <TableHead>Doctors</TableHead>
            <TableHead>Bill</TableHead>
            <TableHead>Precription</TableHead>
            <TableHead>Document</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Checkups.map((checkup) => (
            <TableRow key={checkup.id}>
              <TableCell className="font-medium">{checkup.date}</TableCell>
              <TableCell>{checkup.diagnosis}</TableCell>
              <TableCell>{checkup.doctor}</TableCell>
              <TableCell>{checkup.bill}</TableCell>
              <TableCell>{checkup.precription}</TableCell>
              <TableCell>
                <Link
                  href={checkup.document}
                  target="_blank"
                  className="text-primary"
                >
                  View Document
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="flex justify-center items-start">
      <div
        className={`flex flex-col items-center justify-start dark:text-white`}
      >
        <div className="w-[85vw] mt-4">
          <h2 className="text-lg font-semibold mb-4">Checkup History</h2>
          {renderCheckupHistory()}
        </div>
      </div>
    </div>
  );
};

export default CheckupHistory;
