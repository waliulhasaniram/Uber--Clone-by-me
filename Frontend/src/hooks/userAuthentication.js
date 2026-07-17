"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile, logoutUser } from "@/app/actions/loginAndSignUpActions";
import { useUser } from "@/app/context/userContext";

export function useAuth() {
  const router = useRouter();
  const { userData, setUserdata } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await getUserProfile();
        if (isMounted) setUserdata(response?.data ?? null);
      } catch {
        if (isMounted) {
          setUserdata(null);
        //   setError(err.message || "Unable to load profile.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadUser();
    return () => { isMounted = false; };
  }, [setUserdata]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUserdata(null);
      setError("");
      router.refresh();
    } catch (err) {
      setError(err?.message || "Unable to logout.");
    }
  };

  return { userData, isLoading, error, handleLogout };
}