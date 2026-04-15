import React, { useState } from 'react';

const Calculadora = () => {
  const [input, setInput] = useState("");
  const [resultado, setResultado] = useState(0);

  // Manejar clics de botones
  const handleClick = (valor) => {
    setInput(input + valor);
  }

  // Limpiar pantalla
  const clearInput = () => {
    setInput("");
    setResultado(0);
  };

  // Calcular el resultado
  const calcular = () => {
    try {
      // Usamos eval de forma controlada para este ejercicio académico
      // En apps reales, se recomienda un parser de matemáticas más seguro
      const res = eval(input);
      setResultado(res);
    } catch (error) {
      setResultado("Error");
    }
  };

  // Estilos rápidos en línea para visualización
  const estilos = {
    contenedor: { width: '300px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', textAlign: 'center', fontFamily: 'Arial' },
    pantalla: { width: '100%', height: '50px', backgroundColor: '#f4f4f4', marginBottom: '10px', textAlign: 'right', padding: '10px', boxSizing: 'border-box', fontSize: '1.2rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' },
    boton: { padding: '15px', fontSize: '1rem', cursor: 'pointer', border: 'none', borderRadius: '5px', backgroundColor: '#e0e0e0' },
    botonIgual: { gridColumn: 'span 2', backgroundColor: '#4CAF50', color: 'white' },
    botonClear: { gridColumn: 'span 2', backgroundColor: '#f44336', color: 'white' }
  };

  return (
    <div style={estilos.contenedor}>
      <h3>Calculadora React</h3>
      <div style={estilos.pantalla}>
        <div style={{ fontSize: '0.8rem', color: '#888' }}>{input || "0"}</div>
        <div>{resultado}</div>
      </div>

      <div style={estilos.grid}>
        {/* Fila 1 */}
        <button style={estilos.boton} onClick={() => handleClick("7")}>7</button>
        <button style={estilos.boton} onClick={() => handleClick("8")}>8</button>
        <button style={estilos.boton} onClick={() => handleClick("9")}>9</button>
        <button style={{...estilos.boton, backgroundColor: '#ff9800'}} onClick={() => handleClick("/")}>/</button>

        {/* Fila 2 */}
        <button style={estilos.boton} onClick={() => handleClick("4")}>4</button>
        <button style={estilos.boton} onClick={() => handleClick("5")}>5</button>
        <button style={estilos.boton} onClick={() => handleClick("6")}>6</button>
        <button style={{...estilos.boton, backgroundColor: '#ff9800'}} onClick={() => handleClick("")}></button>

        {/* Fila 3 */}
        <button style={estilos.boton} onClick={() => handleClick("1")}>1</button>
        <button style={estilos.boton} onClick={() => handleClick("2")}>2</button>
        <button style={estilos.boton} onClick={() => handleClick("3")}>3</button>
        <button style={{...estilos.boton, backgroundColor: '#ff9800'}} onClick={() => handleClick("-")}>-</button>

        {/* Fila 4 */}
        <button style={estilos.boton} onClick={() => handleClick("0")}>0</button>
        <button style={estilos.boton} onClick={() => handleClick(".")}>.</button>
        <button style={{...estilos.boton, backgroundColor: '#ff9800'}} onClick={() => handleClick("+")}>+</button>
        <button style={{...estilos.boton, backgroundColor: '#2196F3'}} onClick={calcular}>=</button>

        {/* Controles extra */}
        <button style={{...estilos.boton, ...estilos.botonClear}} onClick={clearInput}>C</button>
      </div>
    </div>
  );
};

export default Calculadora;