"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "@/styles/create.css";
import { getPlaylistById, updatePlaylist } from "@/utils/playlist";

export default function EditPlaylist() {
  const { id } = useParams();
  const router = useRouter();
  const [playlist, setPlaylist] = useState(null);
  const [newSong, setNewSong] = useState({ title: "", image: "", composer: "", singer: "", audio: "" });
  const [editingSongId, setEditingSongId] = useState(null);
  const [editSongData, setEditSongData] = useState({ title: "", image: "", composer: "", singer: "", audio: "" });

  
  useEffect(() => {
    setPlaylist(getPlaylistById(id));
  }, [id]);

  const addSong = () => {
    if (newSong.title && newSong.image && newSong.composer && newSong.singer && newSong.audio) {
      setPlaylist({
        ...playlist,
        songs: [...playlist.songs, { ...newSong, id: Date.now().toString() }]
      });
      setNewSong({ title: "", image: "", composer: "", singer: "", audio: "" });
    } else {
      alert("Fill all song details before adding!");
    }
  };

  
  const startEditingSong = (song) => {
    setEditingSongId(song.id);
    setEditSongData({ ...song });
  };

  const saveEditedSong = () => {
    const updatedSongs = playlist.songs.map((s) =>
      s.id === editingSongId ? { ...editSongData } : s
    );
    setPlaylist({ ...playlist, songs: updatedSongs });
    setEditingSongId(null);
  };

  
  const deleteSong = (songId) => {
    setPlaylist({
      ...playlist,
      songs: playlist.songs.filter((s) => s.id !== songId),
    });
  };


  const handleSave = () => {
    updatePlaylist(id, playlist);
    router.push("/playlists");
  };

  if (!playlist) return <p>Loading...</p>;

  return (
    <div className="create-container">
      <h1>Edit Playlist</h1>
      <input value={playlist.name} onChange={(e) => setPlaylist({ ...playlist, name: e.target.value })} />
      <input value={playlist.image} onChange={(e) => setPlaylist({ ...playlist, image: e.target.value })} />

      <h2>Edit Songs</h2>
      {playlist.songs.map((song) => (
        <div key={song.id} className="song-preview">
          {editingSongId === song.id ? (
            <div>
              <input placeholder="Title" value={editSongData.title} onChange={(e) => setEditSongData({ ...editSongData, title: e.target.value })} />
              <input placeholder="Image URL" value={editSongData.image} onChange={(e) => setEditSongData({ ...editSongData, image: e.target.value })} />
              <input placeholder="Composer" value={editSongData.composer} onChange={(e) => setEditSongData({ ...editSongData, composer: e.target.value })} />
              <input placeholder="Singer" value={editSongData.singer} onChange={(e) => setEditSongData({ ...editSongData, singer: e.target.value })} />
              <input placeholder="Audio URL" value={editSongData.audio} onChange={(e) => setEditSongData({ ...editSongData, audio: e.target.value })} />
              <button onClick={saveEditedSong}>Save</button>
              <button onClick={() => setEditingSongId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              🎵 <strong>{song.title}</strong> - {song.singer}
              <button onClick={() => startEditingSong(song)}>Edit</button>
              <button onClick={() => deleteSong(song.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}

      <h2>Add New Song</h2>
      <input placeholder="Song Title" value={newSong.title} onChange={(e) => setNewSong({ ...newSong, title: e.target.value })} />
      <input placeholder="Song Image URL" value={newSong.image} onChange={(e) => setNewSong({ ...newSong, image: e.target.value })} />
      <input placeholder="Composer" value={newSong.composer} onChange={(e) => setNewSong({ ...newSong, composer: e.target.value })} />
      <input placeholder="Singer" value={newSong.singer} onChange={(e) => setNewSong({ ...newSong, singer: e.target.value })} />
      <input placeholder="Audio URL" value={newSong.audio} onChange={(e) => setNewSong({ ...newSong, audio: e.target.value })} />
      <button onClick={addSong}>Add Song</button>

      <br />
      <button onClick={handleSave} style={{ marginTop: "15px" }}>💾 Save Playlist</button>
    </div>
  );
}
