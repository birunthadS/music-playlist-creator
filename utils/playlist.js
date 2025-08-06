// Get all playlists
export const getPlaylists = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("playlists")) || [];
};

// Save playlists to localStorage
export const savePlaylists = (playlists) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("playlists", JSON.stringify(playlists));
};

// Create a new playlist
export const createPlaylist = (playlist) => {
  if (typeof window === "undefined") return;

  const playlists = getPlaylists();
  playlists.push({ ...playlist, id: Date.now().toString(), songs: [] });
  savePlaylists(playlists);
};

// Get a playlist by ID
export const getPlaylistById = (id) => {
  if (typeof window === "undefined") return null;
  const playlists = getPlaylists();
  return playlists.find((p) => p.id === id);
};

// Update an existing playlist
export const updatePlaylist = (id, updatedPlaylist) => {
  if (typeof window === "undefined") return;

  const playlists = getPlaylists();
  const index = playlists.findIndex((p) => p.id === id);
  if (index !== -1) {
    playlists[index] = updatedPlaylist;
    savePlaylists(playlists);
  }
};

// Delete a playlist
export const deletePlaylist = (id) => {
  if (typeof window === "undefined") return;

  const playlists = getPlaylists();
  const updated = playlists.filter((p) => p.id !== id);
  savePlaylists(updated);
};

// Delete a song from a playlist
export const deleteSongFromPlaylist = (playlistId, songId) => {
  if (typeof window === "undefined") return;

  const playlists = getPlaylists();
  const playlist = playlists.find((p) => p.id === playlistId);
  if (playlist) {
    playlist.songs = playlist.songs.filter((song) => song.id !== songId);
    savePlaylists(playlists);
  }
};
