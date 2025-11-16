'use client';

import { useState } from "react";
import Link from "next/link";




export default function Juego2() {
  const puzzleInicial = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];

  const [tablero, setTablero] = useState(puzzleInicial);
  const [mensaje, setMensaje] = useState("");

  // Actualiza celda
  const actualizarCelda = (fila, col, value) => {
    if (value === "" || /^[1-9]$/.test(value)) {
      const copia = tablero.map((row) => [...row]);
      copia[fila][col] = value === "" ? 0 : Number(value);
      setTablero(copia);
    }
  };

  // Valida sudoku
  const validarSudoku = () => {
    const esValido = () => {
      // Validar filas y columnas
      for (let i = 0; i < 9; i++) {
        let fila = new Set();
        let col = new Set();
        for (let j = 0; j < 9; j++) {
          const f = tablero[i][j];
          const c = tablero[j][i];
          if (f !== 0 && fila.has(f)) return false;
          if (c !== 0 && col.has(c)) return false;
          fila.add(f);
          col.add(c);
        }
      }

      // Validar bloques 3x3
      for (let x = 0; x < 9; x += 3) {
        for (let y = 0; y < 9; y += 3) {
          let bloque = new Set();
          for (let i = x; i < x + 3; i++) {
            for (let j = y; j < y + 3; j++) {
              const v = tablero[i][j];
              if (v !== 0 && bloque.has(v)) return false;
              bloque.add(v);
            }
          }
        }
      }
      return true;
    };

    if (esValido()) setMensaje("✔ Sudoku correcto");
    else setMensaje("❌ Hay errores en el Sudoku");
  };

  // Reinicia sudoku
  const reiniciar = () => {
    setTablero(puzzleInicial);
    setMensaje("");
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-6 px-3">

      <h1 className="text-3xl font-bold mb-6 text-center">Sudoku</h1>

      {/* TABLERO RESPONSIVE */}
      <div
        /* Añadimos rounded + overflow-hidden para esquinas redondeadas */
        className="grid grid-cols-9 gap-0 border-4 border-gray-900 rounded-xl overflow-hidden"
        style={{ width: "100%", maxWidth: "420px" }}
      >
        {tablero.map((fila, i) =>
          fila.map((valor, j) => (
            <input
              key={`${i}-${j}`}
              inputMode="numeric"
              maxLength={1}
              value={valor === 0 ? "" : valor}
              onChange={(e) => actualizarCelda(i, j, e.target.value)}
              className={`
                w-full h-10 sm:h-12 text-center text-xl sm:text-2xl font-bold 
                border border-gray-600 focus:outline-none
                ${puzzleInicial[i][j] !== 0 ? "bg-gray-300" : "bg-white"}
                ${i % 3 === 0 ? "border-t-4" : ""}
                ${j % 3 === 0 ? "border-l-4" : ""}
                ${i === 8 ? "border-b-4" : ""}
                ${j === 8 ? "border-r-4" : ""}
              `}
            />
          ))
        )}
      </div>

      {/* MENSAJE */}
      {mensaje && <p className="text-xl mt-4 font-semibold">{mensaje}</p>}

      {/* BOTONES PARA CELULAR */}
      <div className="flex flex-col items-center gap-[10px] mt-4">
        <button
          onClick={reiniciar}
          className="px-6 py-3 bg-yellow-500 text-black rounded-xl font-semibold shadow-md active:scale-95 transition-all"
        >
          🔄 Reiniciar
        </button>

        <button
          onClick={validarSudoku}
          className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold shadow-md active:scale-95 transition-all"
        >
          ✔ Verificar
        </button>

<Link href="/" className="inline-block">
  <button
    className="px-6 py-3 bg-blue-600 text-white rounded-full 
               font-semibold shadow-lg hover:bg-blue-700 
               transition duration-200 cursor-pointer"
  >
    ⬅ Volver al Menú
  </button>
</Link>


      </div>
    </div>
  );
}
