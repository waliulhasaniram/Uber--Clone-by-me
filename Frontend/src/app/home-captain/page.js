"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useCaptainAuth } from "@/hooks/captainAuthentication";

export default function HomeCaptain() {
  const router = useRouter();
  const { captain, isLoadingCaptain } = useCaptainAuth();

  useEffect(() => {
    if (!isLoadingCaptain && !captain) {
      router.replace("/");
    }
  }, [captain, isLoadingCaptain, router]);

  if (isLoadingCaptain) return <div>Loading...</div>;
  if (!captain) return null;

  const captainFirstName = captain?.fullname?.firstName || captain?.firstName || "...";

  return (
    <>
      {captainFirstName ? (
        <div>Welcome, Captain {captainFirstName}!</div>
      ) : (
        <div>Welcome, Captain!</div>
      )}
    </>
  );
}
