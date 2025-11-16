import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main style={{ padding: "20px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
