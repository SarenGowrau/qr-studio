import type { QRType } from "../types/qr";

export interface QRInput {
  type: QRType;
  value: string;
  wifiPassword?: string;
  wifiSecurity?: string;
  wifiHidden?: boolean;
}

function escapeWifiValue(value: string): string {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

export function buildQRData({
  type,
  value,
  wifiPassword = "",
  wifiSecurity = "WPA",
  wifiHidden = false,
}: QRInput): string {
  switch (type) {
    case "url":
      return value;

    case "text":
      return value;

    case "email":
      return `mailto:${value}`;

    case "phone":
      return `tel:${value}`;

    case "wifi":
      return `WIFI:T:${wifiSecurity};S:${escapeWifiValue(
        value
      )};P:${escapeWifiValue(
        wifiPassword
      )};H:${wifiHidden ? "true" : "false"};;`;

    default:
      return value;
  }
}