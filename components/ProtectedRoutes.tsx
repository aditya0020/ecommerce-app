import React, { ReactNode } from "react";

type Props = {
  isLoggedIn: boolean;
  children: ReactNode;
};

export default function ProtectedRoute({ isLoggedIn, children }: Props) {
  return <>{children}</>;
}
