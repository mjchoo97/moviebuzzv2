import YearDetail from "@/components/YearDetail";
import React, { Suspense } from "react";

function Yearpage() {
  return (
    <div>
      <Suspense fallback={"loading"}>
        <YearDetail />
      </Suspense>
    </div>
  );
}

export default Yearpage;
