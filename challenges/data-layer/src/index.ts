export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}

export type DataEntityMap = {
  movie: Movie;
  song: Song;
};

type DataStoreMethods = {
  [K in keyof DataEntityMap as `getAll${Capitalize<K>}s`]:
  () => DataEntityMap[K][];
} & {
    [K in keyof DataEntityMap as `get${Capitalize<K>}`]:
    (id: string) => DataEntityMap[K];
  } & {
    [K in keyof DataEntityMap as `clear${Capitalize<K>}s`]:
    () => void;
  } & {
    [K in keyof DataEntityMap as `add${Capitalize<K>}`]:
    (arg: DataEntityMap[K]) => DataEntityMap[K];
  };


function isDefined<T>(x: T | undefined): x is T {
  return typeof x !== undefined;
}

export class DataStore implements DataStoreMethods {
  #data: { [K in keyof DataEntityMap]: Record<string, DataEntityMap[K]> } = {
    movie: {},
    song: {},
  }

  addMovie(movie: Movie) {
    this.#data.movie[movie.id] = movie;

    return movie;
  }
  getAllMovies(): Movie[] {
    return Object.keys(this.#data.movie).map((id) => this.#data.movie[id]).filter(isDefined);
  }
  getMovie(id: string): Movie {
    const movie = this.#data.movie[id];

    if (!movie) throw new Error(`Movie with id ${id} not found`);

    return movie;
  }
  clearMovies(): void {
    this.#data.movie = {};
  }
  addSong(song: Song) {
    this.#data.song[song.id] = song;

    return song;
  }
  getAllSongs(): Song[] {
    return Object.keys(this.#data.song).map((id) => this.#data.song[id]).filter(isDefined);
  }
  getSong(id: string): Song {
    const song = this.#data.song[id];

    if (!song) throw new Error(`Song with id ${id} not found`);

    return song;
  }
  clearSongs(): void {
    this.#data.song = {};
  }
}
