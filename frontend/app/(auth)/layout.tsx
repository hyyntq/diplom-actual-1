import React from "react";

const AuthLayout = ({ children }: { readonly children: React.ReactNode }) => {
  return (
    <div className="flex-grow grid place-items-center py-30 ">
      {children}
    </div>
  );
};

export default AuthLayout;
