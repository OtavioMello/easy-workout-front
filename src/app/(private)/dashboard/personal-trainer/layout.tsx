import DashboardLayout from "@/components/layouts/DashBoardLayout";
import React from "react";

export default function TraineeDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
