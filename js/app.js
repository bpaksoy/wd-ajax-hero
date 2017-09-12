(function() {
  'use strict';

  let movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      var $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  var searchForm = document.querySelector("form");

  searchForm.addEventListener("submit", function(event){
    event.preventDefault();


   var searchTerm = document.querySelector("#search").value;
   console.log("here is my searchTerm:", searchTerm)

   if(searchTerm !== ""){
     $.get("https://omdb-api.now.sh/?s="+searchTerm + "/", function(data){
     console.log("here is my data", data)
      // console.log(data.Search[0]);
     movies.length = 0;
      for(var i =0; i < data.Search.length; i++){
          var movie = {};
          movie.id = data.Search[i].imdbID;
          movie.poster = data.Search[i].Poster;
          movie.title = data.Search[i].Title;
          movie.year = data.Search[i].Year;
          movies.push(movie);

       }

       for(var j =0; j < movies.length; j++){
          var movieId= movies[j].id;
          $.get("https://omdb-api.now.sh/?i="+ movieId, function(data){
            var movPlot = data["Plot"];
            console.log("here is plot", movPlot); // prints out the plots
             $(".modal-content").append(movPlot); // appends the same plot to all ??? Why???

          });

        }

       renderMovies();
     });
    }
  });

})();
