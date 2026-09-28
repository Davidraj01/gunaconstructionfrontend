import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../routes/routes";
import {
  Shield,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldAlert,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import logoImg from "../assets/logo.png";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { loginAdmin, isAdminLoggedIn } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdminLoggedIn) {
      navigate(ROUTES.ADMIN_DASHBOARD);
    }
  }, [isAdminLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await loginAdmin(username.trim(), password);
      setLoading(false);
      if (res.success) {
        navigate(ROUTES.ADMIN_DASHBOARD);
      } else {
        setError(res.message || "Invalid administrator credentials.");
      }
    } catch {
      setLoading(false);
      setError(
        "Unable to authenticate with backend server. Please verify your credentials and network connection.",
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#030712",
        backgroundImage: `radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.18) 0%, transparent 60%), radial-gradient(circle at 80% 90%, rgba(15, 23, 42, 0.8) 0%, transparent 50%)`,
        padding: "2rem 1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Grid Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          backgroundColor: "#0f172a",
          borderRadius: "24px",
          padding: "2.75rem 2.5rem",
          boxShadow:
            "0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(249, 115, 22, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Top Header Logo */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "18px",
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem auto",
            boxShadow: "0 10px 25px rgba(234, 88, 12, 0.4)",
            border: "2px solid #fed7aa",
            padding: "4px"
          }}
        >
          <img src={logoImg} alt="GUNA CONSTRUCTION" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              color: "#f97316",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              marginBottom: "0.4rem",
            }}
          >
            <KeyRound size={12} /> Restricted Access Only
          </div>
          <h1
            style={{
              fontSize: "1.85rem",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.5px",
              marginBottom: "0.35rem",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            Admin Login Portal
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.88rem" }}>
            GUNA CONSTRUCTION Control System
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.12)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#f87171",
              padding: "0.8rem 1rem",
              borderRadius: "10px",
              fontSize: "0.88rem",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <ShieldAlert size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#cbd5e1",
                marginBottom: "0.45rem",
              }}
            >
              Username
            </label>
            <div style={{ position: "relative" }}>
              <User
                size={18}
                color="#64748b"
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                type="text"
                required
                autoComplete="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem 0.85rem 2.75rem",
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "10px",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#f97316")}
                onBlur={(e) => (e.target.style.borderColor = "#334155")}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#cbd5e1",
                marginBottom: "0.45rem",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={18}
                color="#64748b"
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.85rem 3rem 0.85rem 2.75rem",
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "10px",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#f97316")}
                onBlur={(e) => (e.target.style.borderColor = "#334155")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "0.9rem",
              fontSize: "1rem",
              marginTop: "0.75rem",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Verifying Administrator Credentials..."
              : "Login to Admin Dashboard"}{" "}
            <ArrowRight size={18} />
          </button>
        </form>

        <div
          style={{
            marginTop: "2rem",
            padding: "0.85rem",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            fontSize: "0.78rem",
            color: "#64748b",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <CheckCircle2 size={14} color="#10b981" /> 256-Bit Encrypted JWT Secure Gateway
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
