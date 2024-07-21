"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Toaster, toast } from "sonner";
import { useEdgeStore } from "@/lib/edgestore";
import { FileState, MultiFileDropzone } from "@/components/MultiFileDropzone";

const MedicalReport = z.object({
  id: z.string(),
  date: z.string(),
  doctor: z.string(),
  diagnosis: z.string(),
  test: z.string(),
  testResult: z.string(),
  medication: z.string(),
});

type MedicalReportSchema = z.infer<typeof MedicalReport>;

const MedicalReportPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MedicalReportSchema>({
    // resolver: zodResolver(ContactFormSchema),
  });

  //   const { userId } = useAuth();
  //   useEffect(() => {
  //     const getInsuranceData = async () => {
  //       try {
  //         const response = await fetch(`/api/medical-report/${userId}`);
  //         const data = await response.json();
  //         setCheckupRecord(data);
  //       } catch (error) {
  //         console.error("Error fetching insurance data:", error);
  //       }
  //     };
  //     getInsuranceData();
  //   }, [userId]);
  const [CheckupRecord, setCheckupRecord] = useState<MedicalReportSchema[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle dark mode

  // Function to add a new insurance plan
  const addInsurancePlan = (plan: MedicalReportSchema) => {
    setCheckupRecord([...CheckupRecord, plan]);
  };
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  const [url, setUrl] = useState<string>("");

  const processForm: SubmitHandler<MedicalReportSchema> = async (data) => {
    data.testResult = url!;
    const response = await fetch("/api/medical-report", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const { success } = await response.json();
    console.log(success);
    if (success) {
      addInsurancePlan(data);
      toast("Data has been sent!");
      setUrl("");
      reset();
      return;
    }
    toast("Something went wrong!");
    return;
  };

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
  return (
    <div>
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
                    placeholder="Patient Id"
                    className={`rounded-lg border-${
                      darkMode ? "white" : "gray"
                    }-300 p-2 mr-2`}
                    {...register("id", { required: true })}
                  />
                  <Input
                    type="text"
                    placeholder="Date"
                    className={`rounded-lg border-${
                      darkMode ? "white" : "gray"
                    }-300 p-2 mr-2`}
                    {...register("date", { required: true })}
                  />
                  <Input
                    type="text"
                    placeholder="Doctor"
                    className={`rounded-lg border-${
                      darkMode ? "white" : "gray"
                    }-300 p-2 mr-2`}
                    {...register("doctor", { required: true })}
                  />
                  <Input
                    type="text"
                    placeholder="Diagnosis"
                    step="0.01"
                    className={`rounded-lg border-${
                      darkMode ? "white" : "gray"
                    }-300 p-2 mr-2`}
                    {...register("diagnosis", { required: true })}
                  />
                  <Input
                    type="number"
                    placeholder="Bill"
                    step="0.01"
                    className={`rounded-lg border-${
                      darkMode ? "white" : "gray"
                    }-300 p-2 mr-2`}
                    {...register("test", { required: true })}
                  />
                  <Input
                    type="text"
                    placeholder="Precription"
                    className={`rounded-lg border-${
                      darkMode ? "white" : "gray"
                    }-300 p-2 mr-2`}
                    {...register("medication", { required: true })}
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
                                updateFileProgress(
                                  addedFileState.key,
                                  progress
                                );
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
                            setUrl(res.url);
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
                    disabled={url === "" || isSubmitting}
                  >
                    Add
                  </Button>
                </div>
              </form>
            </div>
            {/* Render existing insurance plans */}
          </div>
        </div>
        {/* <div className="mt-8 lg:w-[80vw]">{renderCheckupRecord()}</div> */}
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
};

export default MedicalReportPage;
