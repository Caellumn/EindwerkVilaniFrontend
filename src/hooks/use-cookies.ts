"use client";

import { useState, useEffect } from "react";

interface CookieOptions {
  days?: number;
  sameSite?: "strict" | "lax" | "none";
  secure?: boolean;
  domain?: string;
  path?: string;
}

export function useCookie<T>(
  name: string,
  defaultValue: T,
  options: CookieOptions = {}
): [T, (value: T) => void, () => void] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return defaultValue;

    try {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`));

      if (cookie) {
        const cookieValue = cookie.split("=")[1];
        return JSON.parse(decodeURIComponent(cookieValue));
      }
    } catch (error) {
      console.error("Error reading cookie:", error);
    }

    return defaultValue;
  });

  const setCookie = (newValue: T) => {
    try {
      setValue(newValue);

      if (typeof window !== "undefined") {
        const {
          days = 30,
          sameSite = "lax",
          secure = true,
          domain,
          path = "/",
        } = options;

        let cookieString = `${name}=${encodeURIComponent(
          JSON.stringify(newValue)
        )}; path=${path}`;

        if (days) {
          const date = new Date();
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
          cookieString += `; expires=${date.toUTCString()}`;
        }

        cookieString += `; SameSite=${sameSite}`;

        if (secure) {
          cookieString += "; Secure";
        }

        if (domain) {
          cookieString += `; Domain=${domain}`;
        }

        document.cookie = cookieString;
      }
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  };

  const removeCookie = () => {
    try {
      setValue(defaultValue);

      if (typeof window !== "undefined") {
        const { domain, path = "/" } = options;

        let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;

        if (domain) {
          cookieString += `; Domain=${domain}`;
        }

        document.cookie = cookieString;
      }
    } catch (error) {
      console.error("Error removing cookie:", error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const cookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`${name}=`));

        if (cookie) {
          const cookieValue = cookie.split("=")[1];
          const parsedValue = JSON.parse(decodeURIComponent(cookieValue));
          setValue(parsedValue);
        } else {
          setValue(defaultValue);
        }
      } catch (error) {
        console.error("Error in storage change handler:", error);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [name, defaultValue]);

  return [value, setCookie, removeCookie];
}
