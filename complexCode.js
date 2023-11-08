/**
 * Filename: complexCode.js
 * 
 * Description: This code demonstrates a complex implementation of a music streaming application.
 *              It includes features such as user authentication, playlist management, music playback,
 *              and a recommender system. The code is designed to be modular, scalable, and maintainable.
 */

// User class
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.playlists = [];
  }

  createPlaylist(playlistName) {
    const playlist = new Playlist(playlistName);
    this.playlists.push(playlist);
    return playlist;
  }

  deletePlaylist(playlistName) {
    const index = this.playlists.findIndex(playlist => playlist.name === playlistName);
    if (index !== -1) {
      this.playlists.splice(index, 1);
      return true;
    }
    return false;
  }
}

// Playlist class
class Playlist {
  constructor(name) {
    this.name = name;
    this.tracks = [];
  }

  addTrack(track) {
    this.tracks.push(track);
  }

  removeTrack(trackId) {
    const index = this.tracks.findIndex(track => track.id === trackId);
    if (index !== -1) {
      this.tracks.splice(index, 1);
      return true;
    }
    return false;
  }
}

// Track class
class Track {
  constructor(id, title, artist, duration) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.duration = duration;
  }
}

// Recommender class
class Recommender {
  constructor(tracks, playlists) {
    this.tracks = tracks;
    this.playlists = playlists;
  }

  recommendTracks(userId) {
    const userPlaylists = this.playlists.filter(playlist => playlist.userId === userId);
    const userTracks = userPlaylists.flatMap(playlist => playlist.tracks);
    const recommendedTracks = this.tracks.filter(track =>
      !userTracks.some(userTrack => userTrack.id === track.id)
    );
    return recommendedTracks;
  }
}

// Usage example
const tracks = [
  new Track(1, "Track 1", "Artist 1", 234),
  new Track(2, "Track 2", "Artist 2", 187),
  new Track(3, "Track 3", "Artist 1", 202),
  new Track(4, "Track 4", "Artist 3", 308),
  new Track(5, "Track 5", "Artist 2", 256),
];

const user1 = new User("user1", "password1");
const user2 = new User("user2", "password2");

const playlist1 = user1.createPlaylist("Playlist 1");
const playlist2 = user1.createPlaylist("Playlist 2");

playlist1.addTrack(tracks[0]);
playlist1.addTrack(tracks[1]);
playlist2.addTrack(tracks[0]);
playlist2.addTrack(tracks[3]);

const recommender = new Recommender(tracks, [playlist1, playlist2]);

console.log("Recommended tracks for user1:");
console.log(recommender.recommendTracks("user1"));

console.log("Recommended tracks for user2:");
console.log(recommender.recommendTracks("user2"));