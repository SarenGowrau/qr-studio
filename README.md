# QR Studio

> Beautiful QR codes, made simple.

QR Studio is a modern, responsive QR code generator and designer built with React and TypeScript. It supports multiple QR formats, live customization, presets, validation, scanability warnings, PNG downloads, and recent QR code history.

## 🚀 Live Demo

https://qr-studio-seven-fawn.vercel.app/

## ✨ Features

- Generate QR codes in real time
- URL QR codes
- Plain text QR codes
- Email QR codes
- Phone number QR codes
- Wi-Fi QR codes
- Customize foreground and background colors
- Adjust QR code size
- Adjust margin
- Choose error correction level
- Predefined visual presets
- Modify presets after applying them
- Input validation with contextual error messages
- Scanability warnings for risky customizations
- Download QR codes as PNG
- Save recent QR codes using LocalStorage
- Reuse previous QR codes
- Clear recent QR history
- Responsive desktop and mobile interface

## 📱 Supported QR Types

| Type | Description |
|---|---|
| URL | Generate a QR code for a website or URL |
| Text | Encode plain text |
| Email | Generate a `mailto:` QR code |
| Phone | Generate a `tel:` QR code |
| Wi-Fi | Generate a Wi-Fi network QR code with security options |

## 🎨 Customization

QR Studio provides live customization controls for:

- QR code size
- Foreground color
- Background color
- Error correction level
- Margin / quiet zone

Changes are reflected immediately in the QR preview.

## 🎨 Presets

QR Studio includes predefined visual presets such as:

- Classic
- Ocean
- Midnight
- Soft

Presets automatically apply a combination of colors, error correction, and margin settings. Users can continue modifying the settings after selecting a preset.

## ⚠️ Validation & Scanability

QR Studio validates user input according to the selected QR type.

Examples include:

- Invalid URL detection
- Invalid email detection
- Invalid phone number detection
- Empty input detection

The application also provides scanability warnings when customization settings may make a QR code harder to scan, such as:

- Low foreground/background contrast
- Very small QR size
- Insufficient margin

These warnings help users maintain practical QR code readability while still allowing customization.

## 🕘 Recent QR Codes

Recently generated QR codes are stored locally using the browser's `localStorage`.

Users can:

- Reuse previous QR codes
- View recent QR configurations
- Keep recent QR codes after refreshing the page
- Clear their recent QR history

No backend or user account is required.

## 📥 Download

Generated QR codes can be downloaded as PNG files using the same configuration displayed in the live preview.

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- CSS
- `qrcode`
- Browser LocalStorage

## 📂 Project Structure

```text
qr-studio/
├── public/
├── src/
│   ├── data/
│   │   └── presets.ts
│   ├── types/
│   │   ├── qr.ts
│   │   └── recentQR.ts
│   ├── utils/
│   │   ├── qrData.ts
│   │   ├── readability.ts
│   │   └── validation.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## ▶️ Run Locally

Clone the repository:

```bash
git clone https://github.com/SarenGowrau/qr-studio.git
```

Move into the project directory:

```bash
cd qr-studio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## 🧪 Testing

The application was tested for:

- URL generation
- Plain text generation
- Email generation
- Phone number generation
- Wi-Fi generation
- Invalid and empty inputs
- Preset application
- Custom colors
- Size changes
- Margin changes
- Error correction changes
- Scanability warnings
- PNG downloads
- Recent QR persistence
- Refresh persistence
- Clearing recent QR codes
- Responsive layouts

## 📸 Screenshots

<img width="1888" height="855" alt="image" src="https://github.com/user-attachments/assets/fd027fca-c578-4ace-adf7-dd3f7b0efff8" />
<img width="1884" height="909" alt="image" src="https://github.com/user-attachments/assets/6745c73a-f0f6-4089-a8fa-81b4d8da753a" />
<img width="1897" height="864" alt="image" src="https://github.com/user-attachments/assets/fbebd2ca-8fbe-403f-ae51-74e88a01da6c" />
<img width="1896" height="865" alt="image" src="https://github.com/user-attachments/assets/28508bd7-b816-44da-b6f2-70833d3739ef" />


## 📜 Project Context

QR Studio was created as a frontend project for the **GDG on Campus SRM Technical Domain Recruitment 2026–27**.

The project focuses on creating a polished, responsive QR code generation and customization experience using modern frontend technologies.

## 👤 Author

**Saren Gowrau**

GitHub: https://github.com/SarenGowrau/qr-studio
```
