"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/home.css";
import { getPlaylists } from "@/utils/playlist";
import { getCurrentUser, logoutUser } from "@/utils/auth";

export default function Home() {
  const [playlists, setPlaylists] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!getCurrentUser()) router.push("/login");
    setPlaylists(getPlaylists().slice(0, 3));
  }, [router]);

  return (
    <div className="container">
      <div className="home-header">
        <h1>Welcome, {getCurrentUser()}</h1>
        <button onClick={() => { logoutUser(); router.push("/login"); }}>Logout</button>
      </div>
      <button onClick={() => router.push("/create")}>+ Create New Playlist</button>
      <button onClick={() => router.push("/playlists")}>View All Playlists</button>
      
      <div className="playlist-grid">
        {playlists.length === 0 ? (
          <p>No playlists yet. Create one!</p>
        ) : (
          playlists.map((p) => (
            <div key={p.id} className="playlist-card" onClick={() => router.push(`/playlists/${p.id}`)}>
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
