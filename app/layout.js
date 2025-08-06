export const metadata = {
  title: "Music Playlist Creator",
  description: "Create and manage playlists locally",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
