"use client";

import { useEffect } from "react";
import { notFound } from "next/navigation";

export default function Page() {
  useEffect(() => {
    notFound();
  }, []);
  return null;
}
