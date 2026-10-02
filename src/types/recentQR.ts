import type { QRType } from "./qr";

export interface RecentQR {
  id: string;
  type: QRType;
  text: string;
  wifiPassword: string;
  wifiSecurity: string;
  wifiHidden: boolean;
  qrSize: number;
  foregroundColor: string;
  backgroundColor: string;
  errorCorrection: string;
  qrMargin: number;
  createdAt: number;
}