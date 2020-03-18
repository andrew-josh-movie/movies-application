const $ = require('jquery');
var pass = 0;

/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('World');

/**
 * require style imports
 */
const {getMovies, addMovie, editMovie, deleteMovie} = require('./api.js');

// refresh start
var refresh = (movies) => {

    $('#movies').html('');
    movies.forEach(({title, rating, id, description, genre, viewed}) => {

        $('#movies').append(
            `<div class="cards" >` +


            `<a class="underline zoom" href="#ex${id}" rel="modal:open">` +
            `<div id="listItem">` +
            `<li>${title}</li>` +
            `</div>` +
            `<div id="ex${id}" class="modal">` +
            `<p class="modalTitle">${title}</p>` +
            `<p class="modalDescription">${description}</p>` +
            `<p class="modalGenre"> Genre: ${genre}</p>` +

            `<form>` +
            `<br>` +
            `<input class="editDesc" id="${id}descriptionEdit" type="text" placeholder="description">` +
            `    <br>
        <label>
        <br>
        <select class="modalGenreSelect" id="${id}genre" name="genres">
        <option value="choose">Pick A Genre</option>
        <option value="action">Action</option>
        <option value="horror">Horror</option>
        <option value="romance">Romance</option>
        <option value="comedy">Comedy</option>
        <option value="fantasy">Fantasy</option>
        <option value="scienceFiction">Science Fiction</option>
    <option value="anime">Anime</option>
        <option value="documentary">Documentary</option>
        <option value="western">Western</option>
        </select>
        </label>
        <br>` +
            `<br>`+
            `<button type="submit" class="editButt modalGenreSelect" value="${id}">submit</button>` +
            `<br><br>`+
            `<button value="${id}" type="submit" class="deleteButton">delete</button>` +

            `</form>` +
            `</div>` +
            `</a>` +

            `<span class="starRating">` +
            `<input id="${id}rating5" type="radio" name="${id}" value="${id}" class="radio5">` +
            `<label for="${id}rating5">5</label>` +
            `<input id="${id}rating4" type="radio" name="${id}" value="${id}" class="radio4">` +
            `<label for="${id}rating4">4</label>` +
            `<input id="${id}rating3" type="radio" name="${id}" value="${id}" class="radio3">` +
            `<label for="${id}rating3">3</label>` +
            `<input id="${id}rating2" type="radio" name="${id}" value="${id}" class="radio2">` +
            `<label for="${id}rating2">2</label>` +
            `<input id="${id}rating1" type="radio" name="${id}" value="${id}" class="radio1">` +
            `<label for="${id}rating1">1</label>` +
            `</span>` +
            `<div>`
        );

        switch (rating) {
            case '1':
                $(`#${id}rating1`).attr('checked', 'checked');
                break;
            case '2':
                $(`#${id}rating2`).attr('checked', 'checked');
                break;
            case '3':
                $(`#${id}rating3`).attr('checked', 'checked');
                break;
            case '4':
                $(`#${id}rating4`).attr('checked', 'checked');
                break;
            case '5':
                $(`#${id}rating5`).attr('checked', 'checked');
                break;
        }
    });

    $(".radio5").click(function () {
        editMovie($(this).val(), {
            "rating": "5"
        });
    });
    $(".radio4").click(function () {
        editMovie($(this).val(), {
            "rating": "4"
        });
    });
    $(".radio3").click(function () {
        editMovie($(this).val(), {
            "rating": "3"
        });
    });
    $(".radio2").click(function () {
        editMovie($(this).val(), {
            "rating": "2"
        });
    });
    $(".radio1").click(function () {
        editMovie($(this).val(), {
            "rating": "1"
        });
    });

    $(".editButt").click(function (e) {
        e.preventDefault();
        let id = $('#idNumber').val();
        if ($(`#${$(this).val()}genre`).val() === `choose`){
            editMovie($(this).val(), {
                "description": $(`#${$(this).val()}descriptionEdit`).val()
            });
        } else {
            editMovie($(this).val(), {
                "description": $(`#${$(this).val()}descriptionEdit`).val(),
                "genre": $(`#${$(this).val()}genre`).val()
            });
        }

        load();
        getMovies().then((movies) => refresh(movies));
    });


    $('.deleteButton').click(function (e) {
        e.preventDefault();
        deleteMovie($(this).val());
        load();
        getMovies().then((movies) => refresh(movies));
    });

    pass = 0;
    // $('li').css('color', 'yellow');
};


$(".editRadio").click(function () {
    pass = $(this).val();
});

// refresh end

$('#submit').click(function (e) {
    e.preventDefault();
    addMovie(pass);
    load();
    getMovies().then((movies) => refresh(movies));
});

var load = () => {
    $('#movies').html('');

    $('#movies').append(
        '<img src="ZZ5H.gif">'
    );
};
//comment
// $('#submitEdit').click(function (e) {
//   e.preventDefault();
//   editMovie($('#idNumber').val());
//   console.log($('#idNumber').val());
//   getMovies().then((movies)=>refresh(movies));
//
// });

$('#submitEdit').click(function (e) {
    e.preventDefault();
    let id = $('#idNumber').val();
    editMovie(id, {
        "rating": $('#ratingEdit').val()
    });
    load();
    getMovies().then((movies) => refresh(movies));

});

$('#submitDescription').click(function (e) {
    e.preventDefault();
    let id = $('#idNumber').val();
    editMovie(id, {
        "description": $('#descriptionEdit').val()
    });
    load();
    getMovies().then((movies) => refresh(movies));

});


// $('.deleteButton').click(function (e) {
//   e.preventDefault();
//   deleteMovie($(this).val());
//   getMovies().then((movies)=>refresh(movies));
//   console.log('click')
// });
load();
getMovies().then((movies) => {
    refresh(movies);
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});






