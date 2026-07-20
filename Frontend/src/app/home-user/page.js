'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useAuth } from '@/hooks/userAuthentication';

export default function HomeUser() {
    const router = useRouter();
    const { userData, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && !userData) {
          router.push("/"); // redirect to home
        }
    }, [userData, isLoading, router]);

    if (isLoading) return <div>Loading...</div>;
    if (!userData) return null;
  return (
    <>
        {userData ? (
        <div>Welcome, {userData.firstName || 'User'}!</div>
        ) : (
        <div>Welcome, User!</div>
        )}   
    </>
  )
}
