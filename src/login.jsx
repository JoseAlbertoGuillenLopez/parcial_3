import React, { useEffect, useState } from "react";
import "./login.css";

const GOOGLE_CLIENT_ID = "355198219671-8kqjqeafr2vr8qmg40m4qeikb8m3b15i.apps.googleusercontent.com";

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
  } catch (error) {
    return null;
  }
}

export default function Login() {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (window.google && !isReady) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-button"),
          {
            theme: "outline",
            size: "large",
            text: "signin_with",
            shape: "rectangular",
          }
        );
        setIsReady(true);
      }
    }, 100);

    return () => window.clearInterval(interval);
  }, [isReady]);

  function handleCredentialResponse(response) {
    if (!response?.credential) {
      return;
    }
    const profile = parseJwt(response.credential);
    setUser(profile);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Iniciar sesión</h1>
        <p>Usa tu cuenta de Google para entrar.</p>

        {user ? (
          <div className="user-box">
            <p className="user-label">Bienvenido,</p>
            <p className="user-name">{user.name || user.email}</p>
            <p className="user-email">{user.email}</p>
          </div>
        ) : (
          <>
            <div id="google-signin-button" />
            <button
              type="button"
              className="google-fallback"
              onClick={() => window.google?.accounts.id.prompt()}
            >
              <span className="google-icon" />
              Acceder con Google
            </button>
          </>
        )}

        <small className="login-note">
          Si ves un mensaje de carga, espera un momento mientras se carga el script.
        </small>
      </div>
    </div>
  );
}
