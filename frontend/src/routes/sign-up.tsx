import { authClient } from "@/lib/auth-client";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    const { data, error } = await authClient.signUp.email({
      email: email,
      password: password,
      name: username,
    });

    if (error) {
      console.error(error);
      return;
    }

    console.log(data);
  };

  return (
    <div
      style={{
        maxWidth: "350px",
        margin: "100px auto",
        padding: "2rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        background: "#fff",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h1>
      <input
        type="text"
        placeholder="Username"
        style={{
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        style={{
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        style={{
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        style={{
          padding: "0.5rem",
          borderRadius: "4px",
          border: "none",
          background: "#007bff",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        SIGN UP
      </button>
    </div>
  );
}
