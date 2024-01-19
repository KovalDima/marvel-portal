class MarvelService {
  #apiUrl = "https://gateway.marvel.com:443/v1/public";
  #apiKey = "apikey=2422a33b6a6598d998a3ad0ef4304e5f";
  #baseCharsOffset = 210;

  #fetchData = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
      return new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  };

  // chars

  /* 1. */
  /* getAllCharacters = () =>
    this.#fetchData(
      `${this.#apiUrl}/characters?limit=9&offset=210&${this.#apiKey}`
    ); */

  /* 2. */
  /* getAllCharacters = async () => {
    const data = await this.#fetchData(
      `${this.#apiUrl}/characters?limit=9&offset=210&${this.#apiKey}`
    );
    return data.data.results.map(this.#transformCharacter);
  }; */

  getAllCharacters = async (offset = this.#baseCharsOffset) => {
    const data = await this.#fetchData(
      `${this.#apiUrl}/characters?limit=9&offset=${offset}&${this.#apiKey}`
    );
    return data.data.results.map(this.#transformCharacter);
  };

  /* getCharacter = (id) =>
    this.#fetchData(`${this.#apiUrl}/characters/${id}?${this.#apiKey}`); */

  /* getCharacter = async (id) => {
    const data = await this.#fetchData(
      `${this.#apiUrl}/characters/${id}?${this.#apiKey}`
    );
    return this.#transformCharacter(data);
  }; */

  getCharacter = async (id) => {
    const data = await this.#fetchData(
      `${this.#apiUrl}/characters/${id}?${this.#apiKey}`
    );
    return this.#transformCharacter(data.data.results[0]);
  };

  // comics
  getAllComics = async (offset = 0) => {
    const data = await this.#fetchData(
      `${this.#apiUrl}/comics?orderBy=issueNumber&limit=8&offset=${offset}&${
        this.#apiKey
      }`
    );
    return data.data.results.map(this.#transformComics);
  };

  getComics = async (id) => {
    const data = await this.#fetchData(
      `${this.#apiUrl}/comics/${id}?${this.#apiKey}`
    );
    return this.#transformComics(data.data.results[0]);
  };

  // transform data
  /* #transformCharacter(data) {
    return {
      name: data.data.results[0].name,
      descr: data.data.results[0].description,
      thumbnail:
        data.data.results[0].thumbnail.path +
        "." +
        data.data.results[0].thumbnail.extension,
      homepage: data.data.results[0].urls[0].url,
      wiki: data.data.results[0].urls[1].url,
    };
  } */

  #transformCharacter(char) {
    return {
      name: char.name,
      descr: char.description || "Description not found",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.items,
    };
  }

  #transformComics(comics) {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || "There is no description",
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : "No information about the number of pages",
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      language: comics.textObjects.language || "en-us",
      price: comics.prices.price ? `${comics.prices.price}$` : "not available",
    };
  }
}

export default MarvelService;
