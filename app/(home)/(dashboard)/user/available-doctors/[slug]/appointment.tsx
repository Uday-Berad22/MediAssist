"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Toaster, toast } from "sonner";

const UserAppointmentpageForm = z.object({
  name: z.string(),
  date: z.string(),
  time: z.string(),
  query: z.string(),
});

type AppointmentpageForm = z.infer<typeof UserAppointmentpageForm>;

const Appointmentpage = ({ id, userid }: { id: string; userid: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentpageForm>({
    // resolver: zodResolver(ContactFormSchema),
  });
  // const [CheckupRecord, setCheckupRecord] = useState<AppointmentpageForm[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const processForm: SubmitHandler<AppointmentpageForm> = async (data) => {
    const response = await fetch("/api/appointment", {
      method: "POST",
      body: JSON.stringify({ ...data, id: id, userid: userid }),
    });
    const { success } = await response.json();
    if (success) {
      toast("Data has been sent!");
      reset();
      return;
    }
    toast("Something went wrong!");
    return;
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
                  placeholder="Name"
                  className={`rounded-lg border-${
                    darkMode ? "white" : "gray"
                  }-300 p-2 mr-2`}
                  {...register("name", { required: true })}
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
                  placeholder="Time"
                  className={`rounded-lg border-${
                    darkMode ? "white" : "gray"
                  }-300 p-2 mr-2`}
                  {...register("time", { required: true })}
                />
                <Input
                  type="text"
                  placeholder="Query"
                  className={`rounded-lg border-${
                    darkMode ? "white" : "gray"
                  }-300 p-2 mr-2`}
                  {...register("query", { required: true })}
                />
              </div>
              <div className="flex justify-center w-full mt-3">
                <Button
                  type="submit"
                  className={`bg-blue-500 text-white py-2 px-4 rounded-lg  ${
                    darkMode ? "hover:bg-blue-600" : "hover:bg-blue-400"
                  } focus:outline-none`}
                  disabled={isSubmitting}
                >
                  Book Appointment
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
  );
};

export default Appointmentpage;
