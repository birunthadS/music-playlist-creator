"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/playlists.css";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPlaylists = async () => {
      const { getPlaylists } = await import("@/utils/playlist"); // ✅ Lazy import
      setPlaylists(getPlaylists());
    };
    fetchPlaylists();
  }, []);

  const handleDelete = async (id) => {
    const { deletePlaylist, getPlaylists } = await import("@/utils/playlist"); // ✅ Lazy import
    deletePlaylist(id);
    setPlaylists(getPlaylists());
  };

  return (
    <div className="playlists-container">
      <h1>All Playlists</h1>
      {playlists.length === 0 ? (
        <p>No playlists found.</p>
      ) : (
        playlists.map((p) => (
          <div key={p.id} className="playlist-item">
            <img src={p.image} alt={p.name} />
            <div>
              <h3>{p.name}</h3>
              <div className="playlist-actions">
                <button onClick={() => router.push(`/playlists/${p.id}`)}>View</button>
                <button onClick={() => router.push(`/edit/${p.id}`)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
