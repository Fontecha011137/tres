'use client';
import { useState } from "react";
import Link from "next/link";

export default function Juego3() {
  const size = 4;

  const generarBomba = () => Math.floor(Math.random() * size * size);

  const [bomba, setBomba] = useState(generarBomba);
  const [revelado, setRevelado] = useState(Array(size * size).fill(false));
  const [estado, setEstado] = useState("jugando");

  const reiniciar = () => {
    setBomba(generarBomba());
    setRevelado(Array(size * size).fill(false));
    setEstado("jugando");
  };

  const contarBombasCerca = (index) => {
    const x = index % size;
    const y = Math.floor(index / size);

    const posiciones = [
      [x - 1, y], [x + 1, y],
      [x, y - 1], [x, y + 1],
    ];

    for (const [nx, ny] of posiciones) {
      if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
        const i = ny * size + nx;
        if (i === bomba) return 1;
      }
    }
    return 0;
  };

  const clickCelda = (i) => {
    if (estado !== "jugando") return;

    const copia = [...revelado];
    copia[i] = true;
    setRevelado(copia);

    if (i === bomba) {
      setEstado("perdiste");
    } else {
      const seguras = copia.filter((v, idx) => v && idx !== bomba).length;
      if (seguras === size * size - 1) {
        setEstado("ganaste");
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-5 gap-5">

   
      <h1 className="text-3xl font-bold">💣 Busca la Bomba</h1>

      {/* TABLERO — ahora más grande */}
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${size}, 85px)`
        }}
      >
        {Array(size * size).fill(0).map((_, i) => (
          <button
            key={i}
            onClick={() => clickCelda(i)}
            className={`
              w-[85px] h-[85px] text-3xl font-bold rounded-xl shadow-lg
              flex items-center justify-center
              transition
              ${
                revelado[i]
                  ? i === bomba
                    ? "bg-red-600 text-white"
                    : "bg-gray-300 text-black"
                  : "bg-gray-600 text-white hover:bg-gray-500"
              }
            `}
          >
            {revelado[i]
              ? i === bomba
                ? "💣"
                : contarBombasCerca(i)
              : ""}
          </button>
        ))}
      </div>

      {/* Estado del juego */}
      {estado === "perdiste" && (
        <p className="text-red-600 text-xl font-bold mt-3">💥 ¡BOOM! Perdiste</p>
      )}
      {estado === "ganaste" && (
        <p className="text-green-600 text-xl font-bold mt-3">🎉 ¡Ganaste!</p>
      )}

      {/* Botón Reiniciar */}
      <button
        onClick={reiniciar}
        className="px-6 py-3 bg-yellow-500 text-black rounded-xl font-semibold shadow-md active:scale-95 transition-all mt-2"
      >
        🔄 Reiniciar
      </button>
         {/* BOTÓN VOLVER AL MENÚ — igual al de Juego 2 */}
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
  );
}
