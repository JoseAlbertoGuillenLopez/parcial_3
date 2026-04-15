import foto from './foto.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img  src={foto} className="App-logo" alt="foto" />
        <p>
          Este es mi hola mundo de react: José Alberto Guillén López
        </p>
        <a
          className="App-link"
          href="https://utd.edu.mx/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Link UTD
        </a>
      </header>
    </div>
  );
}

export default App;
