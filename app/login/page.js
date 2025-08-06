"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/auth.css";
import { loginUser } from "@/utils/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const result = loginUser(username, password);
    if (result.success) router.push("/home");
    else alert(result.message);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Login</h1>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <p style={{ marginTop: "10px" }}>
          New here? <span style={{ color: "#4a90e2", cursor: "pointer" }} onClick={() => router.push("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}
