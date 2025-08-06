"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/auth.css";
import { signupUser } from "@/utils/auth";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = () => {
    const result = signupUser(username, password);
    alert(result.message);
    if (result.success) router.push("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Sign Up</h1>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSignup}>Sign Up</button>
        <p style={{ marginTop: "10px" }}>
          Already have an account? <span style={{ color: "#4a90e2", cursor: "pointer" }} onClick={() => router.push("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}
