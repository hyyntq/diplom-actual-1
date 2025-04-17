import React from "react";

const ZodErrors = ({ error }: { error: string[] }) => {
  if (!error) return null;
  return error.map((err: string, index: number) => (
    <div key={index} className="text-destructive font-medium text-sm py-2">
      {err}
    </div>
  ));
};

export default ZodErrors;
