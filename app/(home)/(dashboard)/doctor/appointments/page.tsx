"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@clerk/nextjs";
interface MedicalRecord {
  date: string;
  name: string;
  time: string;
}

const MedicalHistory: React.FC = () => {
  const [appointment, setAppointment] = useState<MedicalRecord[]>([]);
  const { userId } = useAuth();
  useEffect(() => {
    const getCheckupData = async () => {
      try {
        const response = await fetch(`/api/appointment/${userId}`);
        const data = await response.json();
        setAppointment(data);
      } catch (error) {
        console.error("Error fetching insurance data:", error);
      }
    };
    getCheckupData();
  }, [userId]);
  const renderappointment = () => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointment.map((plan, index) => (
            <TableRow key={index}>
              <TableCell>{plan.name}</TableCell>
              <TableCell>{plan.date}</TableCell>
              <TableCell>{plan.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  return (
    <div
      className={`flex flex-col items-center justify-start mt-8 dark:text-white`}
    >
      <div className="w-[85vw] mt-4">
        <h2 className="text-lg font-semibold mb-4">Appointment</h2>
        {renderappointment()}
      </div>
    </div>
  );
};

export default MedicalHistory;
