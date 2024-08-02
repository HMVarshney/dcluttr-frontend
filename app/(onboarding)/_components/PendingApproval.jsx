"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export default function PendingApproval({ goNext }) {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold mt-20">Pending Approval</h2>
      <p className="text-xs mt-4 mb-10 w-1/2 text-center">
        We have received your request to register a brand with dcluttr. Our support team will get back to you soon. This
        might take up to 48 hours.
      </p>
      <Button className="w-1/4" onClick={goNext}>
        Contact Support
      </Button>
    </div>
  );
}
