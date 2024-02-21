Here you will find a small application with some missing functionality. There are tests that should pass once implementation for those missing features is added.
Please send us a result in 48 hours, even if you don't finish everything 100%.                            
* The entire `main` folder is yours to read and write. Do not hesitate to change and refactor things if you find them wrong or can come up with a nicer solution.                                                   
* The entire `testframework` folder is yours to read. 
* Process in general is:
  1. open `main/html/test.html` in your browser;
  2. read *the instructions* below and edit something in `main`;
  3. reload the browser;
  4. check the results and go back to step 2.
Ideally we will expect to see all 5 tests passing and the `main` folder looking just right.

# 1.
refactor or extend `ImageFinder.search()` so it will return results from `DATA.staticImagesDb` (use the query on the title field).

the returned results should be in the following format:

```
{
  images: [
    {
      id: '#######',
      url: 'http://image.url',
      title: 'image title'
    }
  ]
}
```

# 2.

change your `ImageFinder` implementation so that it will have a way of adding search modules (all modules should return results in the same format).

2.1 move your base search functionality of `DATA.staticImagesDb` into its own module - name it `'static'`.

2.2 `ImageFinder` should throw an error for unknown modules.

2.3. refactor or extend `Gallery.doSearch()` to use your new `ImageFinder` implementation. it should accept query and module id:

```
gallery.doSearch(query, moduleId).
```

# 3.

add a pixabay search module to the system using the following API key:

```
// Pixabay API key
20419863-5730d54cd843de8a261a5cb33
```

3.1. (bonus) add a drop down menu in gallery to select a search module (static / pixabay).

# 4.

add functionality to your `search()` so that it will be able to accept requests from multiple galleries and "know" how to return results to the right gallery.

# 5.

now that `search()` returns results asynchronously, it might cause unwanted old results to be returned before or even AFTER newer queries.

change the `search()` to cancel old searches if a newer query was passed.
