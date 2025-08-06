"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/create.css";
import { createPlaylist } from "@/utils/playlist";

export default function CreatePlaylist() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState({ title: "", image: "", composer: "", singer: "", audio: "" });
  const router = useRouter();

  const addSong = () => {
    if (song.title && song.image && song.composer && song.singer && song.audio) {
      setSongs([...songs, { ...song, id: Date.now().toString() }]);
      setSong({ title: "", image: "", composer: "", singer: "", audio: "" });
    } else {
      alert("Fill all song details!");
    }
  };

  const handleCreate = () => {
    if (!name || !image) return alert("Enter playlist name and image!");
    createPlaylist(name, image, songs);
    router.push("/playlists");
  };

  return (
    <div className="create-container">
      <h1>Create Playlist</h1>
      <input placeholder="Playlist Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Playlist Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
      
      <h2>Add Songs</h2>
      <input placeholder="Song Title" value={song.title} onChange={(e) => setSong({ ...song, title: e.target.value })} />
      <input placeholder="Song Image URL" value={song.image} onChange={(e) => setSong({ ...song, image: e.target.value })} />
      <input placeholder="Composer" value={song.composer} onChange={(e) => setSong({ ...song, composer: e.target.value })} />
      <input placeholder="Singer" value={song.singer} onChange={(e) => setSong({ ...song, singer: e.target.value })} />
      <input placeholder="Audio URL (mp3)" value={song.audio} onChange={(e) => setSong({ ...song, audio: e.target.value })} />
      <button onClick={addSong}>Add Song</button>

      {songs.map((s) => (
        <div key={s.id} className="song-preview">🎵 {s.title} - {s.singer}</div>
      ))}

      <button onClick={handleCreate}>Create Playlist</button>
    </div>
  );
}
