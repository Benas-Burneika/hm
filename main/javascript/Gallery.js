class Gallery {
  /**
   * @constructor
   * @param {ImageFinder} imageFinder
   */
  constructor(imageFinder) {
    this._imageFinder = imageFinder;
    this.requestCounter = 0;
    this._createInterface();
    this._setFunctionality();
  }

  /**
   * start a new search
   * @param {String} query - search term to look for
   * @param {String} moduleId - module id to search in
   */
  doSearch(query, moduleId) {
    let searchResult;
    this.requestCounter++;

    switch (moduleId) {
      case 'static':
        searchResult = this._imageFinder.static(query);
        this._onSearchResultReady(searchResult);
        return;
      case 'pixabay':
        if (this.requestCounter > 1) {
          this._imageFinder.abort();
        }

        this._imageFinder.getPixabayData(query)
          .then((result) => {
            result && this._onSearchResultReady(result);
          })
          .catch((error) => {
            console.error('Error fetching pixabay data', error);
          });
        return;
      default:
        throw new Error('Unknown module');
    }
  }

  /**
   * Handle search button clicks
   */
  _onSearchButtonClick() {
    let query = this._queryInputNode.value;
    let moduleId = this._queryDropdownNode.value;

    this.doSearch(query, moduleId);
  }

  /**
   * update gallery content with search results
   * @param {query:String{images:[{id:String, url:string, title:string}]}} searchResult - results object for gallery update
   */
  _onSearchResultReady(searchResult) {
    if (!searchResult || !searchResult.images) {
      console.error('Invalid search result');
      return;
    }

    this._resultsNode.innerHTML = '';
    const imagesData = searchResult.images;
    for (let i = 0; i < imagesData.length; ++i) {
      let imgNode = document.createElement('img');
      imgNode.setAttribute('src', imagesData[i].url);
      this._resultsNode.appendChild(imgNode);
    }
  }

  /**
   * adds gallery main view node as child node
   * @param {htmlElement} node - html element to append to
   */
  addToNode(node) {
    node.appendChild(this._viewNode);
  }

  /**
   * creates gallery view, inner structure and ui
   */
  _createInterface() {
    this._viewNode = document.createElement('div');
    this._viewNode.classList.add('gallery');

    this._resultsNode = document.createElement('div');
    this._resultsNode.classList.add('galleryItems');
    this._viewNode.appendChild(this._resultsNode);

    this._controlsNode = document.createElement('div');
    this._controlsNode.classList.add('galleryControls');
    this._viewNode.appendChild(this._controlsNode);

    this._queryInputNode = document.createElement('input');
    this._controlsNode.appendChild(this._queryInputNode);

    this._queryDropdownNode = document.createElement('select');
    this._queryDropdownNode.innerHTML = '<option value="static">Static</option><option value="pixabay">Pixabay</option>';
    this._controlsNode.appendChild(this._queryDropdownNode);

    this._searchBtnNode = document.createElement('button');
    this._searchBtnNode.innerHTML = 'search';
    this._controlsNode.appendChild(this._searchBtnNode);
  }

  /**
   * add search functionality to gallery
   */
  _setFunctionality() {
    // Bind function to instance
    let that = this;
    let originalOnSearchButtonClick = that._onSearchButtonClick;
    this._onSearchButtonClick = function () {
      originalOnSearchButtonClick.apply(that, arguments);
    };

    this._searchBtnNode.addEventListener('click', this._onSearchButtonClick);
  }
}

window.CLASSES.Gallery = Gallery;
