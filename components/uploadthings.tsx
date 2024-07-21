"use client";

import { useState } from "react";
import { UploadButton } from "./uploadthing";
import Image from "next/image";

const Uploadthing = () => {
  const [file, setFile] = useState<string>();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(url) => {
          setFile(url[0].url);
        }}
        onUploadError={(error) => {
          console.error(error);
        }}
      />
      {file && (
        <Image
          src={file}
          alt="Uploaded file"
          className="w-full h-full rounded-lg"
          width={500}
          height={500}
        />
      )}
      {/* <embed src={file} className="w-full h-full rounded-lg" /> */}
    </main>
  );
};

export default Uploadthing;
