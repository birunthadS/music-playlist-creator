"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "@/styles/playlists.css";

export default function SongDetail() {
  const { songId } = useParams();
  const [song, setSong] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      const { getSongById } = await import("@/utils/playlist"); // ✅ Lazy import
      setSong(getSongById(songId));
    };
    fetchSong();
  }, [songId]);

  if (!song) return <p>Loading...</p>;

  return (
    <div className="playlists-container" style={{ textAlign: "center" }}>
      <h1>{song.title}</h1>
      <img
        src={song.image}
        alt={song.title}
        width="300"
        style={{ borderRadius: "8px", marginBottom: "15px" }}
      />
      <p><strong>Composer:</strong> {song.composer}</p>
      <p><strong>Singer:</strong> {song.singer}</p>
      <audio controls style={{ marginTop: "15px" }}>
        <source src={song.audio} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
