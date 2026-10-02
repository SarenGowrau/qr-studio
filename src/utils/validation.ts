import type { QRType } from "../types/qr";

export function validateQRInput(
  type: QRType,
  value: string,
  
): string {
  if (!value.trim()) {
    return "Please enter the required information.";
  }

  switch (type) {
    case "url":
      try {
        new URL(value);
        return "";
      } catch {
        return "Please enter a valid URL.";
      }

    case "email":
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Please enter a valid email address.";
      }

      return "";

    case "phone":
      if (!/^\+?[0-9\s-]{7,15}$/.test(value)) {
        return "Please enter a valid phone number.";
      }

      return "";

    case "wifi":
      // Wi-Fi passwords can be empty when using "No password".
      return "";

    case "text":
      return "";

    default:
      return "";
  }
}