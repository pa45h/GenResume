import { Loader } from "lucide-react";
import React from "react";

function loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
}

export default loading;
