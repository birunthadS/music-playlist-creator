"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/home.css";

export default function Home() {
  const [playlists, setPlaylists] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const { getCurrentUser, logoutUser } = await import("@/utils/auth");
      const { getPlaylists } = await import("@/utils/playlist");

      const user = getCurrentUser();
      if (!user) {
        router.push("/login");
        return;
      }

      setCurrentUser(user);
      setPlaylists(getPlaylists().slice(0, 3));

      // Attach logout function to window so button can use it
      window.logoutUser = logoutUser;
    };

    loadData();
  }, [router]);

  const handleLogout = async () => {
    const { logoutUser } = await import("@/utils/auth");
    logoutUser();
    router.push("/login");
  };

  return (
    <div className="container">
      <div className="home-header">
        <h1>Welcome, {currentUser}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <button onClick={() => router.push("/create")}>+ Create New Playlist</button>
      <button onClick={() => router.push("/playlists")}>View All Playlists</button>

      <div className="playlist-grid">
        {playlists.length === 0 ? (
          <p>No playlists yet. Create one!</p>
        ) : (
          playlists.map((p) => (
            <div
              key={p.id}
              className="playlist-card"
              onClick={() => router.push(`/playlists/${p.id}`)}
            >
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
