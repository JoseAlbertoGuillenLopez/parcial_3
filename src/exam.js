
import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import foto from './foto.png';
import './App.css';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
                          

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

function Examen() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSuccess = (response) => {
    const profile = parseJwt(response.credential);
    setUser(profile);
    setIsLoggedIn(true);
  };

  const onError = () => {
    console.log("Login Failed");
  };

  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="App">
        {isLoggedIn ? (
          <Bienvenido user={user} onLogout={handleLogout} />
        ) : (
          <header className="App-header">
            <img src={foto} className="App-logo" alt="foto" />
            <h1>ANÁLISIS Y DISEÑO DE SOFTWARE</h1>
            <h2>Alumno(a): Guillén López José Alberto</h2>
            <a
              className="App-link"
              href="https://www.linkedin.com/in/jos%C3%A9-alberto-guill%C3%A9n-l%C3%B3pez-004b373a4?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BcxJhjZpsQw2%2FAmTZtLFqGA%3D%3D&authuser=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKED IN DE MI PROFILE
            </a>
            <br />
            <a className="App-link" href="/ind.html">DOCUMENTACION PARCIAL 1</a>
            <br />
            <a className="App-link" href="/parcial2.html">DOCUMENTACION PARCIAL 2</a>

            <div style={{ marginTop: '20px' }}>
              <GoogleLogin 
                onSuccess={onSuccess} 
                onError={onError} 
                useOneTap 
                theme="outline"
                size="large"
                shape="rectangular"
              />
            </div>
          </header>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

function Bienvenido({ user, onLogout }) {
  const abrirTableroJira = () => {
    window.open("https://glassy.atlassian.net/jira/software/projects/GLSY/boards/34/backlog?atlOrigin=eyJpIjoiNDExOTgyMmJjYjg4NGIzZDk0YTg4ZGMzMDhiNTE0MzkiLCJwIjoiaiJ9", "_blank");
  };

  const descargarERS = () => {
    window.open('/ERS.pdf', '_blank');
  };

  return (
    <div className="App welcome-page">
      <header className="App-header">
        <img src={foto} className="App-logo welcome-photo" alt="foto" />
        <h1>Bienvenido(a), {user.name}</h1>
        <h1>EVALUACIÓN PARCIAL 3</h1>

        <button className="buttons" type="button" onClick={descargarERS}>
          DESCARGAR DOCUMENTO ERS DEL PROYECTO
        </button>

        <button className="buttons" type="button" onClick={abrirTableroJira}>
          TABLERO JIRA PROYECTO SIBA
        </button>

        <button className="buttons" type="button" onClick={onLogout}>
          CERRRAR SESIÓN PARCIAL 3
        </button>
      </header>
    </div>
  );
}

export default Examen;


