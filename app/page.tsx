import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "yellow",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >

      {/* TÍTULO */}
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "10px" }}>
        Bienvenido
      </h1>

      <p style={{ marginBottom: "30px" }}>
        Selecciona un juego en la parte inferior.
      </p>

      {/* MENÚ CENTRADO DEBAJO DEL TÍTULO */}
      <nav
        style={{
          display: "flex",
          gap: "20px",
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      >
        <Link href="/juego1">CULEBRITA</Link>
        <Link href="/juego2">SUDOKU</Link>
        <Link href="/juego3">BUSCA BOMBA</Link>
      </nav>

    </div>
  );
}
