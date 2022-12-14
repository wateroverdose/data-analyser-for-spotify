/*******************************************
 * collect data from ../secret or argument *
 *     USED LATER TO GENERATE THE HTML     *
 *******************************************/

// i won't split this up into multiple easier-to-understand-the-task-of-this-file files because skill issue

const fs = require('fs');
const path = require('path');

let secretpath = '';
if (process.argv[2]) {
  secretpath = path.join(__dirname, process.argv[2]);
} else {
  secretpath = path.join(__dirname, '..', 'secret', 'MyData');
}

let secret_files = fs.readdirSync(secretpath);

// BEGIN definitions

class Show {
  constructor(show_name, rating, rated_at) {
      this.show_name = show_name;
      this.rating = rating;
      this.rated_at = rated_at;
  }
}

class Playlist {
  constructor(name, last_modified_date, items_arr, desc, num_of_followers) {
      this.name = name;
      this.last_modified_date = last_modified_date;
      this.items_arr = items_arr;
      this.desc = desc;
      this.num_of_followers = num_of_followers;
  }
}

class SearchQuery {
  constructor(platform, search_time, query, search_interaction_uris) {
      this.platform = platform;
      this.search_time = search_time;
      this.query = query;
      this.search_interaction_uris = search_interaction_uris;
  }
}

class Stream {
  constructor(end_time, artist, track, ms_played) {
      this.end_time = end_time;
      this.artist = artist;
      this.track = track;
      this.ms_played = ms_played;
  }
}

// START library

class Track {
  constructor(artist, album, track, uri) {
      this.artist = artist;
      this.album = album;
      this.track = track;
      this.uri = uri;
  }
}

// ! NO INFO
class Album {

}

// Show was already used for watched shows, using ShowSaved instead for saved shows
class ShowSaved {
  constructor(name, publisher, uri) {
      this.name = name;
      this.publisher = publisher;
      this.uri = uri;
  }
}

class Episode {
  constructor(name, show, uri) {
      this.name = name;
      this.show = show;
      this.uri = uri;
  }
}

// ! NO INFO
class BannedTrack {

}

class Artist {
  constructor(name, uri) {
      this.name = name;
      this.uri = uri;
  }
}

// ! NO INFO
class BannedArtist {

}

// ! NO INFO
class Other {

}

// END library

const e_datatype = {
  Follow: 0,
  Identifiers: 1,
  Identity: 2,
  Inferences: 3,
  Payments: 4,
  Playlist: 5,
  PodcastInteractivityRatedShow: 6,
  SearchQueries: 7,
  StreamingHistory: 8,
  Userdata: 9,
  YourLibrary: 10 
}

const e_sex = {
  female: 0,
  male: 1
}

const user_obj = {
  user: {
      follower_count: undefined,
      following_users_count: undefined,
      // ! NO INFO
      dismissing_users_count: undefined,
      identifier_type: undefined,
      identifier_value: undefined,
      display_name: undefined,
      first_name: undefined,
      last_name: undefined,
      pfp_url: undefined,
      pfp_large_url: undefined,
      is_tastemaker: undefined,
      is_verified: undefined,
      inferences: undefined,
      user_id: undefined,
      email: undefined,
      country: undefined,
      is_created_from_facebook: undefined,
      facebook_uid: undefined,
      birthdate: undefined,
      sex: undefined,
      postal_code: undefined,
      mobile_number: undefined,
      mobile_operator: undefined,
      mobile_brand: undefined,
      creation_time: undefined
  },

  playlists: [],
  rated_shows: [],

  library: {
      shows: [],
      tracks: [],
      // ! NO INFO
      albums: [],
      shows: [],
      episodes: [],
      // ! NO INFO
      banned_tracks: [],
      artists: [],
      // ! NO INFO
      banned_artists: [],
      // ! NO INFO
      other: []
  },

  // ! NO INFO
  payment_info: [],
  search_queries: [],
  streaming_history: [],

  for_web: {
      rated_shows_amount: undefined,
      heart_amount: undefined,
      search_queries_amount: undefined,
      shows_added_to_lib_amount: undefined,
      show_eps_added_to_lib_amount: undefined,
      o_fav_artist: undefined,
      o_fav_song: undefined,
      ms_listened: undefined
  }
}

// END definitions

const file_arr = [];
function make_file_arr() {
  let json_offset = 0;
  for (let n = 0; n < secret_files.length; n++) {
      // ? check if file is json
      // another way to do this would be to use path.parse() and use the 'ext' property
      if (secret_files[n].substring(secret_files[n].length - 5) === '.json') {
        const curr_path = path.join(secretpath, secret_files[n]);
        let datatype = 0;
  
        // todo change this long ass if statement, i hate it
        if (secret_files[n].match(/Follow/)) {
            datatype = e_datatype.Follow;
        } else if (secret_files[n].match(/Identifiers/)) {
            datatype = e_datatype.Identifiers;
        } else if (secret_files[n].match(/Identity/)) {
            datatype = e_datatype.Identity;
        } else if (secret_files[n].match(/Inferences/)) {
            datatype = e_datatype.Inferences;
        } else if (secret_files[n].match(/Payments/)) {
            datatype = e_datatype.Payments;
        } else if (secret_files[n].match(/Playlist/)) {
            datatype = e_datatype.Playlist;
        } else if (secret_files[n].match(/PodcastInteractivityRatedShow/)) {
            datatype = e_datatype.PodcastInteractivityRatedShow;
        } else if (secret_files[n].match(/SearchQueries/)) {
            datatype = e_datatype.SearchQueries;
        } else if (secret_files[n].match(/StreamingHistory/)) {
            datatype = e_datatype.StreamingHistory;
        } else if (secret_files[n].match(/Userdata/)) {
            datatype = e_datatype.Userdata;
        } else if (secret_files[n].match(/YourLibrary/)) {
            datatype = e_datatype.YourLibrary;
        } else {
            throw new Error('invalid json file name');
        }
  
        file_arr[n - json_offset] = {
            path: curr_path, 
            name: secret_files[n],
            file_obj: JSON.parse(fs.readFileSync(path.join(secretpath, secret_files[n]), 'utf8')),
            type: datatype
        }
      } else {
        json_offset++;
      }
  }
}
make_file_arr();

// BEGIN organise files

for (let n = 0; n < file_arr.length; n++) {
  if (file_arr[n].type === e_datatype.Follow) {
      user_obj.user.follower_count = file_arr[n].file_obj.followerCount;
      user_obj.user.following_users_count = file_arr[n].file_obj.followingUsersCount;
      user_obj.user.dismissing_users_count = file_arr[n].file_obj.dismissingUsersCount;
  } else if (file_arr[n].type === e_datatype.Identifiers) {
      user_obj.user.identifier_type = file_arr[n].file_obj.identifierType;
      user_obj.user.identifier_value = file_arr[n].file_obj.identifierValue;
  } else if (file_arr[n].type === e_datatype.Identity) {
      user_obj.user.display_name = file_arr[n].file_obj.displayName;
      user_obj.user.first_name = file_arr[n].file_obj.firstName;
      user_obj.user.last_name = file_arr[n].file_obj.lastName;
      user_obj.user.pfp_url = file_arr[n].file_obj.imageUrl;
      user_obj.user.pfp_large_url = file_arr[n].file_obj.largeImageUrl;
      user_obj.user.is_tastemaker = file_arr[n].file_obj.tasteMaker;
      user_obj.user.is_verified = file_arr[n].file_obj.verified;
  } else if (file_arr[n].type === e_datatype.Inferences) {
      for (let n = 0; n < file_arr[n].file_obj.length; n++) {
        user_obj.user.inferences[n] = file_arr[n].file_obj.inferences[n];
      }
  } else if (file_arr[n].type === e_datatype.Payments) {
      // ! NO DATA, TEMPORARY SOLUTION
      user_obj.payment_info.push(file_arr[n].file_obj)
  } else if (file_arr[n].type === e_datatype.Playlist) {
      for (let n = 0; n < file_arr[n].file_obj.length; n++) {
        user_obj.playlists.push(file_arr[n].file_obj.playlists[n]);
      }
  } else if (file_arr[n].type === e_datatype.PodcastInteractivityRatedShow) {
      file_arr[n].file_obj.ratedShows.forEach((show) => {
        user_obj.rated_shows.push(new Show(show.showName, show.rating, show.ratedAt));
      });
  } else if (file_arr[n].type === e_datatype.SearchQueries) {
      file_arr[n].file_obj.forEach((query) => {
        user_obj.search_queries.push(new SearchQuery(query.platform, query.searchTime, query.searchQuery, query.searchInteractionURIs));
      });
  } else if (file_arr[n].type === e_datatype.StreamingHistory) {
      file_arr[n].file_obj.forEach((stream) => {
        user_obj.streaming_history.push(new Stream(stream.endTime, stream.artistName, stream.trackName, stream.msPlayed));
      });
  } else if (file_arr[n].type === e_datatype.Userdata) {
      user_obj.user.user_id = file_arr[n].file_obj.username;
      user_obj.user.email = file_arr[n].file_obj.email;
      user_obj.user.country = file_arr[n].file_obj.country;
      user_obj.user.is_created_from_facebook = file_arr[n].file_obj.createdFromFacebook;
      user_obj.user.facebook_uid = file_arr[n].file_obj.facebookUid;
      user_obj.user.birthdate = file_arr[n].file_obj.birthdate;
      if (file_arr[n].file_obj.gender === 'male') {
        user_obj.user.sex = e_sex.male;
      } else if (file_arr[n].file_obj.gender === 'female') {
        user_obj.user.sex = e_sex.female;
      } else {
        user_obj.user.sex = undefined;
      }
      user_obj.user.postal_code = file_arr[n].file_obj.postalCode;
      user_obj.user.mobile_number = file_arr[n].file_obj.mobileNumber;
      user_obj.user.mobile_operator = file_arr[n].file_obj.mobileOperator;
      user_obj.user.mobile_brand = file_arr[n].file_obj.mobileBrand;
      user_obj.user.creation_time = file_arr[n].file_obj.creationTime;
  } else if (file_arr[n].type === e_datatype.YourLibrary) {
      file_arr[n].file_obj.tracks.forEach((track) => {
        user_obj.library.tracks.push(new Track(track.artist, track.album, track.track, track.uri));
      });
      // ! NO INFO FOR ALBUM
      file_arr[n].file_obj.shows.forEach((show) => {
        user_obj.library.shows.push(new ShowSaved(show.name, show.publisher, show.uri));
      });
      file_arr[n].file_obj.episodes.forEach((ep) => {
        user_obj.library.episodes.push(new Episode(ep.name, ep.show, ep.uri));
      });
      // ! NO INFO FOR BANNED TRACKS
      file_arr[n].file_obj.artists.forEach((artist) => {
        user_obj.library.artists.push(new Artist(artist.name, artist.uri));
      });
      // ! NO INFO FOR BANNED ARTISTS
      // ! NO INFO FOR OTHER
  }
}

user_obj.for_web.heart_amount = user_obj.library.tracks.length;
user_obj.for_web.rated_shows_amount = user_obj.rated_shows.length;
user_obj.for_web.search_queries_amount = user_obj.search_queries.length;
user_obj.for_web.shows_added_to_lib_amount = user_obj.library.shows.length;
user_obj.for_web.show_eps_added_to_lib_amount = user_obj.library.episodes.length;

user_obj.for_web.ms_listened = 0;
user_obj.streaming_history.forEach(stream => {
  console.log(user_obj.for_web.ms_listened);
  user_obj.for_web.ms_listened += stream.ms_played;
});

let css = '';
function make_css() {
  const vals = Object.values(user_obj.for_web);
  const keys = Object.keys(user_obj.for_web);
  for (let n = 0; n < keys.length; n++) {
      if (keys[n].substring(0, 2) !== 'o_') {
        css += `.data_${keys[n]}::after{content:'${vals[n]}';}`
      }
  }
}
make_css();


console.log(user_obj);
console.log(`ms: ${user_obj.for_web.ms_listened}, s: ${user_obj.for_web.ms_listened / 1000}, min: ${(user_obj.for_web.ms_listened / 1000) / 60}, h: ${((user_obj.for_web.ms_listened / 1000) / 60) / 60}`)
// console.log(file_arr)
// console.log(file_arr[5])

// END organise files

// BEGIN web part

// BEGIN save JSON

if (!fs.existsSync(secretpath)) fs.mkdirSync(secretpath);
fs.writeFileSync(path.join(secretpath, '..', 'data.json'), JSON.stringify(user_obj));

// END save JSON

const webpath = path.join(__dirname, '..', 'web');
const csspath = path.join(webpath, 'assets', 'stylesheets');

if (!fs.existsSync(webpath)) throw new Error('web directory does not exist, try to redownload DAfS');
fs.writeFileSync(path.join(csspath, 'scriptgen.css'), css);

// END web part