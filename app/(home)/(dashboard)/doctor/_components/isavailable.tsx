"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Isavailable = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  return (
    <div>
      <Button
        onClick={() => setIsAvailable(!isAvailable)}
        className={`text-white ${
          isAvailable
            ? "bg-red-600 hover:bg-red-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isAvailable ? "Not Available" : "Available"}
      </Button>
    </div>
  );
};

export default Isavailable;
