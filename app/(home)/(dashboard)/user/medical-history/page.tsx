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

import { Toaster } from "sonner";
import Link from "next/link";
interface MedicalRecord {
  date: string;
  doctor: string;
  diagnosis: string;
  test: string;
  testResult: string;
  medication: string;
}

const MedicalHistory: React.FC = () => {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const { userId } = useAuth();
  useEffect(() => {
    const getCheckupData = async () => {
      try {
        const response = await fetch(`/api/medical-report/${userId}`);
        const data = await response.json();
        setMedicalRecords(data);
      } catch (error) {
        console.error("Error fetching insurance data:", error);
      }
    };
    getCheckupData();
  }, [userId]);
  const renderMedicalRecords = () => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Diagnosis</TableHead>
            <TableHead>Test</TableHead>
            <TableHead>Medication</TableHead>
            <TableHead>Test Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicalRecords.map((plan, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{plan.date}</TableCell>
              <TableCell>{plan.doctor}</TableCell>
              <TableCell>{plan.diagnosis}</TableCell>
              <TableCell>{plan.test}</TableCell>
              <TableCell>{plan.medication}</TableCell>
              <TableCell>
                <Link
                  href={plan.testResult}
                  className="text-blue-600 underline"
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
    <div className={`flex flex-col items-center justify-start dark:text-white`}>
      <div className="w-[85vw] mt-4">
        <h2 className="text-lg font-semibold mb-4">Medical Records</h2>
        {renderMedicalRecords()}
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default MedicalHistory;
