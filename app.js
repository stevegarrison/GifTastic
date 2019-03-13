// Create a function that will execute our search for gifs when search is clicked
function getGIF(searchTerm) {
    // var query = $("#search-term").val();
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=UUAfVd3Pa9zQl6sZWCMPMxFdmjfP4qVG&q=" + searchTerm + "&limit=10&offset=0&rating=R&lang=en";
    event.preventDefault();
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        
        var newButton = $("<button class='gifBtn'>" + searchTerm + "</button>");

        // Loop through all 25 results
        for (var i = 0; i < response.data.length; i++) {
            console.log(searchTerm);
            // Create new HTML element for our GIFs
            var gifs = $("<img>");
            // Dig into object for URL and create variable to hold URL
            var gifsURL = response.data[i].images.original_still.url;
            gifs.attr("class", "image-classes")
            gifs.attr("data-still", gifsURL);
            var gifsURLAnimated = response.data[i].images.original.url;
            gifs.attr("data-animate", gifsURLAnimated);
            var rating = $("<p>" + "Rating: " + response.data[i].rating + "</p>");
            gifs.attr("src", gifsURL);

            // Append gif's to HTML
            $("#search-buttons").prepend(newButton);
            $("#search-results").prepend(rating, gifs);
        }

    });
}

$("#search").on("click", function (event) {
    // Variables to get user input for a search
    var query = $("#search-term").val();
    $("#search-results").empty();
    getGIF(query);

    // Animate gifs when clicked on
    $(document).on("click", ".image-classes", function () {
        console.log(this);
        var gifsURL2 = $(this).attr("data-animate");
        var gifsURL3 = $(this).attr("data-still");
        console.log("animated", gifsURL2);
        console.log("still", gifsURL3);
        if ($(this).attr("data-animate") === $(this).attr("src")) {
            console.log("animate", $(this));
            $(this).attr("src", gifsURL3);
        } else if ($(this).attr("data-still") === $(this).attr("src")) {
            console.log("still", $(this));
            $(this).attr("src", gifsURL2);
        }
    })


})

$(document).on("click", ".gifBtn", function () {
    event.preventDefault();
    $("#search-results").empty();
    console.log("working");
    var buttonText = $(this).text();
        getGIF(buttonText);
});