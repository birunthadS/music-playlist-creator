"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "@/styles/playlists.css";
import { getPlaylistById, deleteSongFromPlaylist } from "@/utils/playlist";

export default function PlaylistDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    setPlaylist(getPlaylistById(id));
  }, [id]);

  const handleDeleteSong = (songId) => {
    deleteSongFromPlaylist(id, songId);
    setPlaylist(getPlaylistById(id));
  };

  if (!playlist) return <p>Loading...</p>;

  return (
    <div className="playlists-container">
      <h1>{playlist.name}</h1>
      <img src={playlist.image} alt={playlist.name} width="250" />
      <h2>Songs</h2>
      {playlist.songs.length === 0 ? (
        <p>No songs added.</p>
      ) : (
        <ul className="song-list">
          {playlist.songs.map((song) => (
            <li key={song.id}>
              <span 
                style={{ cursor: "pointer", color: "#4a90e2" }} 
                onClick={() => router.push(`/songs/${song.id}`)}
              >
                🎵 {song.title} - {song.singer}
              </span>
              <button onClick={() => handleDeleteSong(song.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
