import HealthCard from "@/components/course-card";
import React from "react";

const AllergiesPage = () => {
  return (
    <div>
      <HealthCard
        id="1"
        title="Allergies"
        imageUrl="/next.svg"
        chaptersLength={5}
        price={100}
        category="Health"
      />
    </div>
  );
};

export default AllergiesPage;
