describe('Task 3 - Async Pixabay Module', function(){

  var taskDesc = '<p>Add a pixabay search module to the system using the following credentials:<br/>' +
          '<code>Pixabay API<br/>' +
          "key: '20419863-5730d54cd843de8a261a5cb33'</code></p>" +
          "<p><li>Don't reduce pixabay results amount (20)</li>" +
          '<li><strong>Bonus</strong> - Add a drop down menu in gallery to select a search module (static / pixabay).</li></p>';

  describe(taskDesc, function(){
    it('async pixabay result test', function(){
      var gallery = new GalleryClass(window.imageFinder);
      spyOn(gallery, '_onSearchResultReady');

      runs(function(){
        gallery.doSearch('dog', 'pixabay');
      });

      waitsFor(function(){ return gallery._onSearchResultReady.callCount > 0; }, 'imageFinder to return results', 3000);

      runs(function(){
        var results = gallery._onSearchResultReady.calls[0].args[0];

        expect(results.query).toBe('dog');

        expect(results.images instanceof Array, 'check that results.images is an Array').toBeTruthy();

        expect(results.images.length).toBe(20);

        // ToDo: add more specific tests
      });
    });
  });
});
