class ImageFinder {
  constructor() {
    this.controller = new AbortController();
  }

  static(query) {
    let dataFromQuery = window.DATA.staticImagesDb.filter(el => el.title.includes(query));
    const images = dataFromQuery.map(el => {
      return {
        id: el.id,
        url: el.url,
        title: el.title
      }
    });

    return {
      query,
      images
    };
  }

  async getPixabayData(query) {
    const apiKey = '20419863-5730d54cd843de8a261a5cb33';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}`;

    try {
      const response = await fetch(url, { signal: this.controller.signal });
      const data = await response.json();
      const images = data.hits.map(el => {
        return {
          id: el.id,
          url: el.webformatURL,
          title: el.tags
        }
      });

      return {
        query,
        images
      };
    } catch (error) {
      console.error('Error fetching pixabay data', error);
    }
  }

  abort() {
    this.controller.abort();
    this.controller = new AbortController();
  }
}

window.CLASSES.ImageFinder = ImageFinder;
