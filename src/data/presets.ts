export interface QRPreset {
  id: string;
  name: string;
  foregroundColor: string;
  backgroundColor: string;
  errorCorrection: string;
  margin: number;
}

export const qrPresets: QRPreset[] = [
  {
    id: "classic",
    name: "Classic",
    foregroundColor: "#000000",
    backgroundColor: "#ffffff",
    errorCorrection: "M",
    margin: 4,
  },
  {
    id: "ocean",
    name: "Ocean",
    foregroundColor: "#075985",
    backgroundColor: "#e0f2fe",
    errorCorrection: "M",
    margin: 4,
  },
  {
    id: "midnight",
    name: "Midnight",
    foregroundColor: "#ffffff",
    backgroundColor: "#111827",
    errorCorrection: "H",
    margin: 4,
  },
  {
    id: "soft",
    name: "Soft",
    foregroundColor: "#374151",
    backgroundColor: "#f3f4f6",
    errorCorrection: "Q",
    margin: 5,
  },
];