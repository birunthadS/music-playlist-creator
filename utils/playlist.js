export const getPlaylists = () => JSON.parse(localStorage.getItem("playlists")) || [];

export const savePlaylists = (playlists) => localStorage.setItem("playlists", JSON.stringify(playlists));

export const createPlaylist = (name, image, songs) => {
  const playlists = getPlaylists();
  const newPlaylist = { id: Date.now().toString(), name, image, songs: songs || [] };
  playlists.push(newPlaylist);
  savePlaylists(playlists);
  return newPlaylist;
};

export const getPlaylistById = (id) => getPlaylists().find((p) => p.id === id);

export const updatePlaylist = (id, updatedData) => {
  let playlists = getPlaylists();
  playlists = playlists.map((p) => (p.id === id ? { ...p, ...updatedData } : p));
  savePlaylists(playlists);
};


export const deletePlaylist = (id) => {
  const playlists = getPlaylists().filter((p) => p.id !== id);
  savePlaylists(playlists);
};


export const addSongToPlaylist = (playlistId, song) => {
  const playlists = getPlaylists();
  const updatedPlaylists = playlists.map((p) => {
    if (p.id === playlistId) {
      return { ...p, songs: [...p.songs, { id: Date.now().toString(), ...song }] };
    }
    return p;
  });
  savePlaylists(updatedPlaylists);
};


export const deleteSongFromPlaylist = (playlistId, songId) => {
  const playlists = getPlaylists().map((p) =>
    p.id === playlistId ? { ...p, songs: p.songs.filter((song) => song.id !== songId) } : p
  );
  savePlaylists(playlists);
};


export const getSongById = (songId) => {
  const playlists = getPlaylists();
  for (const playlist of playlists) {
    const song = playlist.songs.find((s) => s.id === songId);
    if (song) return song;
  }
  return null;
};
