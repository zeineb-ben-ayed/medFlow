"use client";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
        }}>
            <h1 style={{ fontSize: "6rem", margin: 0 }}>404</h1>
            <p style={{ fontSize: "1.5rem", margin: "1rem 0" }}>
                Page not found
            </p>
            <button
                style={{
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                    cursor: "pointer",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#007bff",
                    color: "white",
                }}
                onClick={() => router.push("/")}
            >
                Go to Home
            </button>
        </div>
    );
}
