"use client";

import React from "react";

import { Toaster } from "@/components/ui/toaster";

export default function ToasterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
