// "use client";

// import React, { useState } from "react";
// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from "@google/generative-ai";
// import { SearchPrompt } from "./Scheme";
// import { z } from "zod";
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input";

// interface ConversationProp {
//   Question: string;
//   Answer: string;
// }
// import { IconArrowRight } from "@tabler/icons-react";
// import { useForm } from "react-hook-form";
// import ExampleComponent from "@/components/TypeAnimation/TextAnimation";
// const MODEL_NAME = "gemini-1.0-pro";
// const API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;
// export type SearchInputType = z.infer<typeof SearchPrompt>;
// const GeminiAi = () => {
//   const [Conversation, setConversation] = useState<ConversationProp[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const acceptresponse = async (data: SearchInputType) => {
//     setIsLoading(true);
//     const genAI = new GoogleGenerativeAI(API_KEY);
//     const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//     const generationConfig = {
//       temperature: 0.9,
//       topK: 1,
//       topP: 1,
//       maxOutputTokens: 2048,
//     };

//     const safetySettings = [
//       {
//         category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//     ];

//     const chat = model.startChat({
//       generationConfig,
//       safetySettings,
//       history: [
//         {
//           role: "user",
//           parts: [{ text: "Medical Input" }],
//         },
//         {
//           role: "model",
//           parts: [
//             {
//               text: ".Doctor assistant.",
//             },
//           ],
//         },
//       ],
//     });
//     const result = await chat.sendMessage(
//       data.search +
//         "and give me response in very Preciously of what medication should be taken.Respond as a medical guide with proper medical terms"
//     );
//     const response = result.response;
//     // console.log(response.text());
//     setConversation((prev) => [
//       ...prev,
//       { Question: data.search, Answer: response.text() },
//     ]);
//   };
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm<SearchInputType>();
//   const processForm = (data: SearchInputType) => {
//     acceptresponse(data);
//     if (errors.search) {
//       console.log(errors.search);
//     }
//     reset();
//     setIsLoading(false);
//   };
//   return (
//     <main className="flex flex-col justify-between h-[91vh] no-scrollbar">
//       <div className="h-[90vh] pt-1 overflow-scroll no-scrollbar">
//         {Conversation.map((item, index) => {
//           return (
//             <div key={index}>
//               {/* design below question and answer fasionable way*/}
//               <div className="py-3">
//                 <div className="flex justify-between">
//                   <div className="flex items-center">
//                     <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white dark:text-black">
//                       {index + 1}
//                     </div>
//                     <div className="ml-2 text-lg font-bold">
//                       {item.Question}
//                     </div>
//                   </div>
//                 </div>
//                 {isLoading ? (
//                   <div className="flex items-center justify-center">
//                     <div className="w-8 h-8 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
//                   </div>
//                 ) : (
//                   <div className="flex">
//                     <div className="flex pt-3">
//                       <div className="flex items-center justify-center w-8 h-8  text-left rounded-full bg-primary text-white dark:text-black">
//                         <IconArrowRight />
//                       </div>
//                     </div>
//                     <div className="ml-2 mt-2 text-lg">
//                       <ExampleComponent Answer={item.Answer} />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//         {isLoading && (
//           <div className="flex items-center justify-center">
//             {/* create a loading spinner */}
//             <div className="w-8 h-8 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
//           </div>
//         )}
//       </div>
//       <form onSubmit={handleSubmit(processForm)}>
//         <Input placeholder="Search questions" {...register("search")} />
//       </form>
//     </main>
//   );
// };

// export default GeminiAi;
"use client";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Markdown from "react-markdown";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Message {
  text: string;
  sender: "user" | "MediAssist";
}

const promptSchema = z.object({
  prompt: z
    .string()
    .min(1, { message: "Please enter a message." })
    .max(1000, { message: "Message is too long." }),
});

type PromptFormValues = z.infer<typeof promptSchema>;

const AIPage = () => {
  const { toast, toasts, dismiss } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PromptFormValues>({
    resolver: zodResolver(promptSchema),
  });

  const onSubmit = async (data: PromptFormValues) => {
    setLoading(true);
    toast({ title: "Chatting with the AI..." });

    const userMessage: Message = { text: data.prompt, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    reset();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userPrompt: data.prompt,
          chatHistory: messages.map((msg) => ({
            text: msg.text,
            sender: msg.sender,
          })),
        }),
      });

      const resData = await res.json();
      setLoading(false);
      dismiss();

      if (resData.text === "Unable to process the prompt. Please try again.") {
        toast({ title: "Unable to process the prompt. Please try again." });
      } else {
        const aiMessage: Message = { text: resData.text, sender: "MediAssist" };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      setLoading(false);
      dismiss();
      toast({ title: "Error communicating with the AI. Please try again." });
    }
  };
  const userImage = user?.imageUrl || "/user.png";
  return (
    <div className="container mx-auto items-center px-4 py-8 flex">
      <div className="shadow-md rounded-lg p-4 max-w-2xl mr-auto bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Hello {user ? user.fullName : "Anonymous"} meet Medi Mentor
        </h1>
        <h2 className="mb-4 text-gray-700 dark:text-gray-300">
          Our own AI assistant to help you with your health queries.
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
          <input
            type="text"
            {...register("prompt")}
            placeholder="Type your message..."
            className="w-full p-2 border border-gray-300 rounded-lg mb-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
          />
          {errors.prompt && (
            <p className="text-red-500">{errors.prompt.message}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 p-2 rounded-lg cursor-none text-white hover:bg-blue-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
        <div className="p-4 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-900 h-96 overflow-y-auto dark:border-gray-700">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start my-2 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "MediAssist" && (
                <div className="flex items-center">
                  <Image
                    src="/anantya.png"
                    alt="AI Avatar"
                    className="w-10 h-10 rounded-full ml-2"
                    width={40}
                    height={40}
                  />
                  <div
                    className={`p-2 rounded-lg max-w-sm ${
                      msg.sender === "MediAssist"
                        ? "bg-blue-500 text-white self-end"
                        : "bg-gray-200 text-gray-800 self-start dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <Markdown>{msg.text}</Markdown>
                  </div>
                </div>
              )}
              {msg.sender === "user" && (
                <div className="flex items-center">
                  <Image
                    src={userImage || "/user.png"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full mr-2"
                    width={40}
                    height={40}
                  />
                  <div
                    className={`p-2 rounded-lg max-w-sm ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white self-end"
                        : "bg-gray-200 text-gray-800 self-start dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <Markdown>{msg.text}</Markdown>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {toasts.map((t) => (
          <div
            key={t.id}
            className="mt-4 p-2 bg-yellow-300 text-black rounded-lg dark:bg-yellow-600 dark:text-gray-200"
          >
            {t.title}
          </div>
        ))}
      </div>
      <div className="hidden md:block h-[80vh] w-3/5">
        <Image
          src="/aidoctor.jpg"
          alt="AI Avatar"
          className="w-full h-full rounded-lg"
          width={320}
          height={320}
        />
      </div>
    </div>
  );
};

export default AIPage;
