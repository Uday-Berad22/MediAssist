"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, currentUser } from "@clerk/nextjs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InsuranceSchema } from "./schema";
import { z } from "zod";
import { Toaster, toast } from "sonner";
import { useEdgeStore } from "@/lib/edgestore";
import { FileState, MultiFileDropzone } from "@/components/MultiFileDropzone";
import Link from "next/link";
interface InsurancePlan {
  id: string;
  policynumber: string;
  name: string;
  company: string;
  claimdate: string;
  insuranceCost: number;
  benificial: string;
  document: string[];
}
export type InsuaranceFormSchema = z.infer<typeof InsuranceSchema>;
const InsurancePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InsuaranceFormSchema>({
    // resolver: zodResolver(ContactFormSchema),
  });

  const { userId } = useAuth();
  useEffect(() => {
    const getInsuranceData = async () => {
      try {
        const response = await fetch(`/api/insurance/${userId}`);
        const data = await response.json();
        setInsurancePlans(data);
      } catch (error) {
        console.error("Error fetching insurance data:", error);
      }
    };
    getInsuranceData();
  }, [userId]);
  const [insurancePlans, setInsurancePlans] = useState<InsurancePlan[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle dark mode

  // Function to add a new insurance plan
  const addInsurancePlan = (plan: InsurancePlan) => {
    setInsurancePlans([...insurancePlans, plan]);
  };
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  const [url, setUrl] = useState<string[]>([]);

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }
  const processForm: SubmitHandler<InsuaranceFormSchema> = async (data) => {
    data.document = url;
    const response = await fetch("/api/insurance", {
      method: "POST",
      body: JSON.stringify({ ...data, id: userId! }),
    });
    const { success } = await response.json();
    console.log(success);
    if (success) {
      addInsurancePlan({
        ...data,
        id: userId!,
      });
      toast("Data has been sent!");
      setUrl([]);
      reset();
      return;
    }
    toast("Something went wrong!");
    return;
  };
  // Display insurance plans
  const renderInsurancePlans = () => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Policy Number</TableHead>
            <TableHead>Policy Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Claim Date</TableHead>
            <TableHead>Benificial</TableHead>
            <TableHead>Policy Amount</TableHead>
            <TableHead>Document</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {insurancePlans.map((plan, index) => (
            <TableRow key={index}>
              <TableCell>{plan.policynumber}</TableCell>
              <TableCell className="font-medium">{plan.name}</TableCell>

              <TableCell>{plan.company}</TableCell>
              <TableCell>{plan.claimdate}</TableCell>
              <TableCell>{plan.benificial}</TableCell>
              <TableCell>${plan.insuranceCost}</TableCell>
              <TableCell className="flex flex-col my-2">
                {plan.document
                  ? plan.document.map((doc, index) => (
                      <Link
                        key={index}
                        href={doc}
                        target="_blank"
                        className="text-blue-500"
                      >
                        Document {index + 1}
                      </Link>
                    ))
                  : "No Document"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="flex flex-col items-center justify-start mt-8">
      <div>
        <div
          className={`rounded-lg shadow-lg p-4 ${
            darkMode ? "bg-gray-800" : "bg-white dark:bg-gray-800"
          } border ${
            darkMode
              ? "border-gray-700"
              : "border-gray-200 dark:border-gray-700"
          }`}
        >
          <h2
            className={`text-lg font-semibold mb-4 ${
              darkMode ? "text-white" : "text-gray-800 dark:text-white"
            }`}
          >
            Insurance Plans
          </h2>
          <div className="mb-4">
            {/* Dark mode toggle button */}

            {/* Form to add a new insurance plan */}
            <h3
              className={`text-md font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-800 dark:text-white"
              }`}
            >
              Add New Insurance Plan
            </h3>
            <form onSubmit={handleSubmit(processForm)}>
              <div className="flex items-center">
                <Input
                  type="text"
                  placeholder="Policy Number"
                  className={`rounded-lg border-${
                    darkMode ? "white" : "gray"
                  }-300 p-2 mr-2`}
                  {...register("policynumber", { required: true })}
                />
                <Input
                  type="text"
                  placeholder="Policy Name"
                  className={`rounded-lg border-${
                    darkMode ? "white" : "gray"
                  }-300 p-2 mr-2`}
                  {...register("name", { required: true })}
                />
                <Input
                  type="text"
                  placeholder="Company"
                  className={`rounded-lg border-${
                    darkMode ? "white" : "gray"
                  }-300 p-2 mr-2`}
                  {...register("company", { required: true })}
                />
                <Input
                  type="number"
                  placeholder="Insurance Cost"
                  step="0.01"
                  className={`rounded-lg border-${
                    darkMode ? "white" : "gray"
                  }-300 p-2 mr-2`}
                  {...register("insuranceCost", { required: true })}
                />
                <Input
                  placeholder="Claim Date"
                  step="0.01"
                  className={`rounded-lg border-${
                    darkMode ? "white" : "gray"
                  }-300 p-2 mr-2`}
                  {...register("claimdate", { required: true })}
                />
                <Input
                  type="text"
                  placeholder="Benificial"
                  className={`rounded-lg border-${
                    darkMode ? "white" : "gray"
                  }-300 p-2 mr-2`}
                  {...register("benificial", { required: true })}
                />
              </div>
              <div className="flex mt-6 justify-center">
                <MultiFileDropzone
                  value={fileStates}
                  onChange={(files) => {
                    setFileStates(files);
                  }}
                  onFilesAdded={async (addedFiles) => {
                    setFileStates([...fileStates, ...addedFiles]);
                    await Promise.all(
                      addedFiles.map(async (addedFileState) => {
                        try {
                          const res = await edgestore.publicFiles.upload({
                            file: addedFileState.file,
                            onProgressChange: async (progress) => {
                              updateFileProgress(addedFileState.key, progress);
                              if (progress === 100) {
                                // wait 1 second to set it to complete
                                // so that the user can see the progress bar at 100%
                                await new Promise((resolve) =>
                                  setTimeout(resolve, 1000)
                                );
                                updateFileProgress(
                                  addedFileState.key,
                                  "COMPLETE"
                                );
                              }
                            },
                          });
                          setUrl((url) => [...url, res.url]);
                        } catch (err) {
                          updateFileProgress(addedFileState.key, "ERROR");
                        }
                      })
                    );
                  }}
                />
              </div>
              <div className="flex justify-center w-full mt-3">
                <Button
                  type="submit"
                  className={`bg-blue-500 text-white py-2 px-4 rounded-lg  ${
                    darkMode ? "hover:bg-blue-600" : "hover:bg-blue-400"
                  } focus:outline-none`}
                  disabled={url.length === 0 || isSubmitting}
                >
                  Add
                </Button>
              </div>
            </form>
          </div>
          {/* Render existing insurance plans */}
        </div>
      </div>
      <div className="mt-8 lg:w-[80vw]">{renderInsurancePlans()}</div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default InsurancePage;
