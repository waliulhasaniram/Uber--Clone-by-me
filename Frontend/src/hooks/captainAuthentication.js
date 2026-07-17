"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCaptainProfile, logoutCaptain } from "@/app/actions/loginAndSignUpActions";
import { useCaptain } from "@/app/context/captainContext";

export function useCaptainAuth() {
  const router = useRouter();
  const { captain, setCaptain } = useCaptain();
  const [isLoadingCaptain, setisLoadingCaptain] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadCaptain = async () => {
      setisLoadingCaptain(true);
      setError("");

      try {
        const response = await getCaptainProfile();
        if (isMounted) {
          setCaptain(response?.data ?? null);
        }
      } catch {
        if (isMounted) {
          setCaptain(null);
        }
      } finally {
        if (isMounted) {
          setisLoadingCaptain(false);
        }
      }
    };

    loadCaptain();

    return () => {
      isMounted = false;
    };
  }, [setCaptain]);

  const handleCaptainLogout = async () => {
    try {
      await logoutCaptain();
      setCaptain(null);
      setError("");
      router.refresh();
    } catch (err) {
      setError(err?.message || "Unable to logout.");
    }
  };

  return { captain, isLoadingCaptain, error, handleCaptainLogout };
}
