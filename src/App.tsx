import { useEffect, useState } from "react";
import QRCode from "qrcode";

import type { QRType } from "./types/qr";
import type { RecentQR } from "./types/recentQR";

import { buildQRData } from "./utils/qrData";
import { validateQRInput } from "./utils/validation";
import { getContrastRatio } from "./utils/readability";
import { qrPresets } from "./data/presets";

function App() {
  const [qrType, setQrType] = useState<QRType>("url");

  const [text, setText] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiSecurity, setWifiSecurity] = useState("WPA");
  const [wifiHidden, setWifiHidden] = useState(false);

  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");

  const [qrSize, setQrSize] = useState(250);
  const [foregroundColor, setForegroundColor] =
    useState("#202124");
  const [backgroundColor, setBackgroundColor] =
    useState("#ffffff");
  const [errorCorrection, setErrorCorrection] =
    useState("M");
  const [qrMargin, setQrMargin] = useState(4);

  const [recentQRs, setRecentQRs] = useState<RecentQR[]>([]);

  useEffect(() => {
    const savedQRs = localStorage.getItem("qr-studio-recent");

    if (!savedQRs) return;

    try {
      setRecentQRs(JSON.parse(savedQRs));
    } catch {
      localStorage.removeItem("qr-studio-recent");
    }
  }, []);

  useEffect(() => {
    if (!text.trim()) {
      setQrCode("");
      setError("");
      return;
    }

    const validationError = validateQRInput(
      qrType,
      text,
      wifiPassword
    );

    if (validationError) {
      setError(validationError);
      setQrCode("");
      return;
    }

    setError("");

    const qrData = buildQRData({
      type: qrType,
      value: text,
      wifiPassword,
      wifiSecurity,
      wifiHidden,
    });

    QRCode.toDataURL(qrData, {
      width: qrSize,
      margin: qrMargin,
      errorCorrectionLevel: errorCorrection,
      color: {
        dark: foregroundColor,
        light: backgroundColor,
      },
    })
      .then((url) => setQrCode(url))
      .catch(() => {
        setQrCode("");
        setError("Unable to generate the QR code.");
      });
  }, [
    text,
    qrType,
    wifiPassword,
    wifiSecurity,
    wifiHidden,
    qrSize,
    foregroundColor,
    backgroundColor,
    errorCorrection,
    qrMargin,
  ]);

  const typeOptions: {
    id: QRType;
    label: string;
    icon: string;
  }[] = [
    { id: "url", label: "URL", icon: "↗" },
    { id: "text", label: "Text", icon: "T" },
    { id: "email", label: "Email", icon: "@" },
    { id: "phone", label: "Phone", icon: "⌕" },
    { id: "wifi", label: "Wi-Fi", icon: "⌁" },
  ];

  const renderValidationMessage = () => {
    if (!error) return null;

    return (
      <div className="inline-error">
        <span className="inline-error-icon">!</span>
        <span>{error}</span>
      </div>
    );
  };

  const renderInputFields = () => {
    switch (qrType) {
      case "url":
        return (
          <>
            <div className="input-wrapper">
              <span className="input-icon">↗</span>

              <input
                type="url"
                placeholder="https://example.com"
                value={text}
                onChange={(event) =>
                  setText(event.target.value)
                }
              />
            </div>

            {renderValidationMessage()}
          </>
        );

      case "text":
        return (
          <>
            <textarea
              placeholder="Type anything you want to share..."
              value={text}
              onChange={(event) =>
                setText(event.target.value)
              }
            />

            {renderValidationMessage()}
          </>
        );

      case "email":
        return (
          <>
            <div className="input-wrapper">
              <span className="input-icon">@</span>

              <input
                type="email"
                placeholder="name@example.com"
                value={text}
                onChange={(event) =>
                  setText(event.target.value)
                }
              />
            </div>

            {renderValidationMessage()}
          </>
        );

      case "phone":
        return (
          <>
            <div className="input-wrapper">
              <span className="input-icon">⌕</span>

              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={text}
                onChange={(event) =>
                  setText(event.target.value)
                }
              />
            </div>

            {renderValidationMessage()}
          </>
        );

      case "wifi":
        return (
          <>
            <div className="wifi-fields">
              <input
                type="text"
                placeholder="Network name"
                value={text}
                onChange={(event) =>
                  setText(event.target.value)
                }
              />

              <input
                type="password"
                placeholder="Wi-Fi password"
                value={wifiPassword}
                onChange={(event) =>
                  setWifiPassword(event.target.value)
                }
              />

              <select
                value={wifiSecurity}
                onChange={(event) =>
                  setWifiSecurity(event.target.value)
                }
              >
                <option value="WPA">WPA / WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">
                  No password
                </option>
              </select>

              <label className="check-row">
                <input
                  type="checkbox"
                  checked={wifiHidden}
                  onChange={(event) =>
                    setWifiHidden(event.target.checked)
                  }
                />

                <span>Hidden network</span>
              </label>
            </div>

            {renderValidationMessage()}
          </>
        );
    }
  };

  const contrastRatio = getContrastRatio(
    foregroundColor,
    backgroundColor
  );

  const readabilityWarnings: string[] = [];

  if (contrastRatio < 3) {
    readabilityWarnings.push(
      "The color contrast is low and may affect scanning."
    );
  }

  if (qrSize < 180) {
    readabilityWarnings.push(
      "A small QR code may be harder to scan."
    );
  }

  if (qrMargin < 2) {
    readabilityWarnings.push(
      "A small quiet zone may reduce scan reliability."
    );
  }

  const saveRecentQR = () => {
    if (!qrCode) return;

    const newQR: RecentQR = {
      id: Date.now().toString(),
      type: qrType,
      text,
      wifiPassword,
      wifiSecurity,
      wifiHidden,
      qrSize,
      foregroundColor,
      backgroundColor,
      errorCorrection,
      qrMargin,
      createdAt: Date.now(),
    };

    const updatedQRs = [
      newQR,
      ...recentQRs.filter(
        (qr) =>
          !(
            qr.type === newQR.type &&
            qr.text === newQR.text &&
            qr.wifiPassword === newQR.wifiPassword &&
            qr.wifiSecurity === newQR.wifiSecurity &&
            qr.wifiHidden === newQR.wifiHidden &&
            qr.qrSize === newQR.qrSize &&
            qr.foregroundColor ===
              newQR.foregroundColor &&
            qr.backgroundColor ===
              newQR.backgroundColor &&
            qr.errorCorrection ===
              newQR.errorCorrection &&
            qr.qrMargin === newQR.qrMargin
          )
      ),
    ].slice(0, 5);

    setRecentQRs(updatedQRs);

    localStorage.setItem(
      "qr-studio-recent",
      JSON.stringify(updatedQRs)
    );
  };

  const handleDownload = () => {
    if (!qrCode) return;

    saveRecentQR();

    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qr-code.png";
    link.click();
  };

  const handleReuseQR = (qr: RecentQR) => {
    setQrType(qr.type);
    setText(qr.text);
    setWifiPassword(qr.wifiPassword);
    setWifiSecurity(qr.wifiSecurity);
    setWifiHidden(qr.wifiHidden);

    setQrSize(qr.qrSize);
    setForegroundColor(qr.foregroundColor);
    setBackgroundColor(qr.backgroundColor);
    setErrorCorrection(qr.errorCorrection);
    setQrMargin(qr.qrMargin);

    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearRecentQRs = () => {
    setRecentQRs([]);
    localStorage.removeItem("qr-studio-recent");
  };

  return (
    <div className="app">
      <div className="ambient ambient-blue" />
      <div className="ambient ambient-red" />
      <div className="ambient ambient-yellow" />

      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div>
            <h1>QR Studio</h1>
            <p>Beautiful QR codes, made simple.</p>
          </div>
        </div>

        <div className="header-pill">
          <span className="live-dot" />
          Live preview
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <div>
            <p className="eyebrow">QR CODE GENERATOR</p>

            <h2>
              Create something
              <br />
              <span>worth scanning.</span>
            </h2>

            <p className="hero-description">
              Generate, customize and download beautiful QR
              codes in seconds.
            </p>
          </div>
        </section>

        <div className="workspace">
          <section className="editor-column">
            <div className="panel type-panel">
              <div className="panel-heading">
                <div>
                  <span className="step-number">01</span>
                  <h3>Choose your QR type</h3>
                </div>
              </div>

              <div className="type-grid">
                {typeOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`type-card ${
                      qrType === option.id ? "active" : ""
                    }`}
                    onClick={() => {
                      setQrType(option.id);
                      setText("");
                      setWifiPassword("");
                      setError("");
                    }}
                  >
                    <span className="type-icon">
                      {option.icon}
                    </span>

                    <span>{option.label}</span>

                    {qrType === option.id && (
                      <span className="selected-check">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="field-section">
                <label className="field-label">
                  {qrType === "wifi"
                    ? "Network details"
                    : "Your content"}
                </label>

                {renderInputFields()}
              </div>
            </div>

            <div className="panel">
              <div className="panel-heading">
                <div>
                  <span className="step-number">02</span>
                  <h3>Pick a style</h3>
                </div>

                <span className="helper-text">
                  You can customize it later
                </span>
              </div>

              <div className="preset-grid">
                {qrPresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className="preset-card"
                    onClick={() => {
                      setForegroundColor(
                        preset.foregroundColor
                      );

                      setBackgroundColor(
                        preset.backgroundColor
                      );

                      setErrorCorrection(
                        preset.errorCorrection
                      );

                      setQrMargin(preset.margin);
                    }}
                  >
                    <div
                      className="preset-preview"
                      style={{
                        backgroundColor:
                          preset.backgroundColor,
                      }}
                    >
                      <div
                        className="mini-qr"
                        style={{
                          backgroundColor:
                            preset.foregroundColor,
                        }}
                      />
                    </div>

                    <span>{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-heading">
                <div>
                  <span className="step-number">03</span>
                  <h3>Make it yours</h3>
                </div>
              </div>

              <div className="custom-grid">
                <div className="control-card">
                  <div className="control-top">
                    <span>Size</span>
                    <strong>{qrSize}px</strong>
                  </div>

                  <input
                    type="range"
                    min="150"
                    max="500"
                    value={qrSize}
                    onChange={(event) =>
                      setQrSize(Number(event.target.value))
                    }
                  />

                  <div className="range-labels">
                    <span>Small</span>
                    <span>Large</span>
                  </div>
                </div>

                <div className="control-card">
                  <div className="control-top">
                    <span>Margin</span>
                    <strong>{qrMargin}</strong>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={qrMargin}
                    onChange={(event) =>
                      setQrMargin(Number(event.target.value))
                    }
                  />

                  <div className="range-labels">
                    <span>Tight</span>
                    <span>Spacious</span>
                  </div>
                </div>

                <label className="color-card">
                  <span>Foreground</span>

                  <div className="color-value">
                    <span
                      className="color-circle"
                      style={{
                        backgroundColor:
                          foregroundColor,
                      }}
                    />

                    <span>{foregroundColor}</span>

                    <input
                      type="color"
                      value={foregroundColor}
                      onChange={(event) =>
                        setForegroundColor(
                          event.target.value
                        )
                      }
                    />
                  </div>
                </label>

                <label className="color-card">
                  <span>Background</span>

                  <div className="color-value">
                    <span
                      className="color-circle"
                      style={{
                        backgroundColor:
                          backgroundColor,
                      }}
                    />

                    <span>{backgroundColor}</span>

                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(event) =>
                        setBackgroundColor(
                          event.target.value
                        )
                      }
                    />
                  </div>
                </label>
              </div>

              <label className="select-field">
                <span>Error correction</span>

                <select
                  value={errorCorrection}
                  onChange={(event) =>
                    setErrorCorrection(event.target.value)
                  }
                >
                  <option value="L">Low — 7%</option>
                  <option value="M">Medium — 15%</option>
                  <option value="Q">Quartile — 25%</option>
                  <option value="H">High — 30%</option>
                </select>
              </label>

              {readabilityWarnings.length > 0 && (
                <div className="scan-warning">
                  <div className="scan-warning-icon">
                    !
                  </div>

                  <div>
                    <strong>Scanability check</strong>

                    <ul>
                      {readabilityWarnings.map(
                        (warning) => (
                          <li key={warning}>
                            {warning}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/*
              No global error/warning block here anymore.
              Validation messages live beside their inputs.
              Scanability warnings live inside customization.
            */}
          </section>

          <aside className="preview-column">
            <div className="preview-panel">
              <div className="preview-header">
                <div>
                  <span className="preview-label">
                    LIVE PREVIEW
                  </span>

                  <h3>Your QR code</h3>
                </div>

                <span className="status-pill">
                  <span />
                  Ready
                </span>
              </div>

              <div
                className="qr-stage"
                style={{
                  backgroundColor: backgroundColor,
                }}
              >
                {qrCode ? (
                  <img
                    src={qrCode}
                    alt="Generated QR Code"
                  />
                ) : (
                  <div className="empty-qr">
                    <div className="empty-qr-icon">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>

                    <strong>
                      Your QR will appear here
                    </strong>

                    <p>
                      Enter some content to see it
                      come alive.
                    </p>
                  </div>
                )}
              </div>

              <div className="preview-meta">
                <div>
                  <span>TYPE</span>
                  <strong>
                    {qrType.toUpperCase()}
                  </strong>
                </div>

                <div>
                  <span>SIZE</span>
                  <strong>{qrSize}px</strong>
                </div>

                <div>
                  <span>ERROR</span>
                  <strong>{errorCorrection}</strong>
                </div>
              </div>

              <button
                type="button"
                className="download-button"
                disabled={!qrCode}
                onClick={handleDownload}
              >
                <span>↓</span>
                Download PNG
              </button>

              <p className="download-note">
                Your downloaded QR matches the preview
                exactly.
              </p>
            </div>

            {recentQRs.length > 0 && (
              <div className="recent-panel">
                <div className="recent-heading">
                  <div>
                    <span className="preview-label">
                      YOUR CREATIONS
                    </span>

                    <h3>Recent QR codes</h3>
                  </div>

                  <button
                    type="button"
                    onClick={clearRecentQRs}
                  >
                    Clear
                  </button>
                </div>

                <div className="recent-list">
                  {recentQRs.map((qr) => (
                    <button
                      key={qr.id}
                      type="button"
                      className="recent-item"
                      onClick={() =>
                        handleReuseQR(qr)
                      }
                    >
                      <span
                        className="recent-dot"
                        style={{
                          backgroundColor:
                            qr.foregroundColor,
                        }}
                      />

                      <div>
                        <strong>
                          {qr.type.toUpperCase()}
                        </strong>

                        <span>
                          {qr.text ||
                            "Wi-Fi network"}
                        </span>
                      </div>

                      <span className="reuse-arrow">
                        →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      <footer>
        <span>QR Studio</span>
        <span>
          Made for the web · No data leaves your browser
        </span>
      </footer>
    </div>
  );
}

export default App;