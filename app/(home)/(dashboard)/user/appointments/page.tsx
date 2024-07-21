"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";

interface Appointment {
  id: number;
  doctor: string;
  time: string;
  status: "live" | "approved" | "cancelled";
  response?: string;
}

const Appointment: React.FC = () => {
  // Sample appointment data
  const sampleAppointments: Appointment[] = [
    { id: 1, doctor: "Dr. Smith", time: "10:00 AM", status: "live" },
    { id: 2, doctor: "Dr. Johnson", time: "11:00 AM", status: "approved" },
    {
      id: 3,
      doctor: "Dr. Lee",
      time: "1:00 PM",
      status: "cancelled",
      response: "Not available",
    },
  ];
  /*
 sampleAppointments
      .filter((appointment) => appointment.status === status)
      .map((appointment) => (
        <div
          key={appointment.id}
          className="flex justify-between items-center border-b border-gray-200 py-2 px-4"
        >
          <span className="font-semibold">{appointment.doctor}</span>
          <span className="text-gray-600">{appointment.time}</span>
        </div>
      ));
*/
  const renderAppointments = (status: "live" | "approved" | "cancelled") => {
    return (
      <Table className="text-black dark:text-white">
        <TableHeader>
          <TableRow>
            <TableHead className="text-black dark:text-white">Doctor</TableHead>
            <TableHead className="text-black dark:text-white">Time</TableHead>
            <TableHead className="text-black dark:text-white">Status</TableHead>
            {status === "cancelled" && (
              <TableHead className="text-black dark:text-white">
                Response
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        {sampleAppointments
          .filter((appointment) => appointment.status === status)
          .map((appointment) => (
            <TableBody key={appointment.id}>
              <TableRow>
                <TableCell className="w-1/12">{appointment.doctor}</TableCell>
                <TableCell className="w-1/12">{appointment.time}</TableCell>
                <TableCell className="w-1/12">{appointment.status}</TableCell>
                {status === "cancelled" && (
                  <TableCell className="w-1/12">
                    {appointment.response}
                  </TableCell>
                )}
              </TableRow>
            </TableBody>
          ))}
      </Table>
    );
  };

  return (
    <div className="flex justify-center items-start">
      <div className="w-[80vw]">
        <div className="bg-blue-200 dark:bg-blue-500 rounded-lg p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Live Appointments</h2>
          {renderAppointments("live")}
        </div>
        <div className="bg-green-200 dark:bg-green-500 rounded-lg p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Approved Appointments</h2>
          {renderAppointments("approved")}
        </div>
        <div className="bg-red-200 dark:bg-red-500 rounded-lg p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Cancelled Appointments</h2>
          {renderAppointments("cancelled")}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
