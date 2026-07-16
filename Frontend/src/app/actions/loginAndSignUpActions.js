"use server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

async function parseJsonResponse(res) {
  const text = await res.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

export async function loginUser(data) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const payload = await parseJsonResponse(res);

  if (!res.ok) {
    throw new Error(payload?.message || "Failed to login user");
  }

  return payload;
}

export async function registerUser(data) {
  const res = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const payload = await parseJsonResponse(res);

  if (!res.ok) {
    throw new Error(payload?.message || "Failed to register user");
  }

  return payload;
}

export async function logoutUser() {
  const res = await fetch(`${API_BASE_URL}/logout`, {
    method: "POST",
  });

  const payload = await parseJsonResponse(res);

  if (!res.ok) {
    throw new Error(payload?.message || "Failed to logout user");
  }

  return payload;
}

export async function getUserProfile() {
  const res = await fetch(`${API_BASE_URL}/profile`, {
    method: "GET",
    credentials: "include", // Include cookies for authentication
  });

  const payload = await parseJsonResponse(res);

  if (!res.ok) {
    throw new Error(payload?.message || "Failed to get user profile");
  }

  return payload;
}

export async function registerCaptain(data) {
    const res = await fetch(`${API_BASE_URL}/captain/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const payload = await parseJsonResponse(res);

    if (!res.ok) {
        throw new Error(payload?.message || "Failed to register captain");
    }
    return payload;
}

export async function loginCaptain(data) {
    const res = await fetch(`${API_BASE_URL}/captain/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const payload = await parseJsonResponse(res);

    if (!res.ok) {
        throw new Error(payload?.message || "Failed to login captain");
    }
    return payload;
}

export async function getCaptainProfile() {
    const res = await fetch(`${API_BASE_URL}/captain/profile`, {
        method: "GET",
        credentials: "include", // Include cookies for authentication
    });
    const payload = await parseJsonResponse(res);

    if (!res.ok) {
        throw new Error(payload?.message || "Failed to get captain profile");
    }
    return payload;
}

export async function logoutCaptain() {
    const res = await fetch(`${API_BASE_URL}/captain/logout`, {
        method: "POST",
    });
    const payload = await parseJsonResponse(res);       
    if (!res.ok) {
        throw new Error(payload?.message || "Failed to logout captain");
    }   
    return payload;
}