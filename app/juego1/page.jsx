"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Juego1() {
  const canvasSize = 400;
  const tileSize = 20;

  const [snake, setSnake] = useState([{ x: 200, y: 200 }]);
  const [direction, setDirection] = useState("RIGHT");
  const [food, setFood] = useState({ x: 100, y: 100 });
  const [gameOver, setGameOver] = useState(false);

  const [speed, setSpeed] = useState(200);
  const [level, setLevel] = useState(1); 
  const [score, setScore] = useState(0);

  const generateFood = () => {
    const x = Math.floor(Math.random() * (canvasSize / tileSize)) * tileSize;
    const y = Math.floor(Math.random() * (canvasSize / tileSize)) * tileSize;
    return { x, y };
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" && direction !== "DOWN") setDirection("UP");
      if (e.key === "ArrowDown" && direction !== "UP") setDirection("DOWN");
      if (e.key === "ArrowLeft" && direction !== "RIGHT") setDirection("LEFT");
      if (e.key === "ArrowRight" && direction !== "LEFT") setDirection("RIGHT");
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const newSnake = [...prev];
        const head = { ...newSnake[0] };

        if (direction === "UP") head.y -= tileSize;
        if (direction === "DOWN") head.y += tileSize;
        if (direction === "LEFT") head.x -= tileSize;
        if (direction === "RIGHT") head.x += tileSize;

        if (
          head.x < 0 ||
          head.x >= canvasSize ||
          head.y < 0 ||
          head.y >= canvasSize ||
          newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
        ) {
          setGameOver(true);
          return prev;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setFood(generateFood());
          setScore(score + 1);

          if ((score + 1) % 5 === 0) {
            setLevel((prev) => prev + 1);
            setSpeed((prev) => Math.max(50, prev - 20));
          }
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [direction, food, gameOver, speed, score]);

  const resetGame = () => {
    setSnake([{ x: 200, y: 200 }]);
    setDirection("RIGHT");
    setFood(generateFood());
    setGameOver(false);
    setSpeed(200);
    setLevel(1);
    setScore(0);
  };

  return (
    <div className="flex flex-col justify-center items-center text-center h-screen">

      <h1 className="text-3xl font-bold mb-4">Juego de la Culebrita</h1>

      {/* HUD */}
      <div className="text-white mb-4">
        <p>Puntaje: {score}</p>
        <p>Nivel: {level}</p>
        <p>Velocidad: {speed} ms</p>
      </div>

      {/* CANVAS */}
      <div
        style={{
          width: canvasSize,
          height: canvasSize,
          background: "#222",
          position: "relative",
        }}
      >
        {snake.map((segment, i) => (
          <div
            key={i}
            style={{
              width: tileSize,
              height: tileSize,
              background: "lime",
              position: "absolute",
              left: segment.x,
              top: segment.y,
            }}
          />
        ))}

        <div
          style={{
            width: tileSize,
            height: tileSize,
            background: "red",
            position: "absolute",
            left: food.x,
            top: food.y,
          }}
        />
      </div>

      {/* GAME OVER */}
      {gameOver && (
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold text-red-500">¡GAME OVER!</h2>
          <button
            onClick={resetGame}
            className="mt-3 px-6 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition duration-200 cursor-pointer rounded-lg"
          >
            Reiniciar
          </button>
        </div>
      )}

      {/* BOTÓN PARA VOLVER AL HOME */}
      {/* BOTÓN PARA VOLVER AL HOME */}
<div className="mt-6 flex justify-center">
  <Link href="/">
    <button
     className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition duration-200 cursor-pointer"

    >
      Volver al Menú
    </button>
  </Link>

      </div>
    </div>
  );
}
