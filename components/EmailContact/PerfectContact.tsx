"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ContactFormSchema } from "./schema";
import { Toaster, toast } from "sonner";
export type ContactFormInputs = z.infer<typeof ContactFormSchema>;
const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(ContactFormSchema),
  });
  const processForm: SubmitHandler<ContactFormInputs> = async (data) => {
    toast.success("Message sent successfully");
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(processForm)}
      className="mx-auto flex flex-1 dark:text-white d flex-col rounded-sm gap-4 text-gray-600 sm:w-2/3 mt-24"
      id="contact"
      name="ContactName"
    >
      <div>
        <input
          placeholder="name"
          className="w-full p-3 border-2 border-black rounded-lg"
          {...register("name")}
        />
        {errors.name?.message && (
          <p className="ml-1 mt-1 text-sm text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <input
          placeholder="email"
          className="w-full p-3 border-2 border-black rounded-lg"
          {...register("email")}
        />
        {errors.email?.message && (
          <p className="ml-1 mt-1 text-sm text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <textarea
          rows={5}
          cols={5}
          placeholder="message"
          className="w-full p-3 border-2 border-black rounded-lg"
          {...register("message")}
        />
        {errors.message?.message && (
          <p className="ml-1 text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        className="rounded-lg border w-full border-black bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      <Toaster position="bottom-right" />
    </form>
  );
};

export default ContactForm;
