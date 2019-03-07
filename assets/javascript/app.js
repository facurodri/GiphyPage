// get API from gyphy and put it in variable
// create an array to hold search buttons
// create a function to create button and set proper values to it
// append buttons to proper space

// Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.
// We chose animals for our theme, but you can make a list to your own liking.
// Your app should take the topics in this array and create buttons in your HTML.
// Try using a loop that appends a button for each string in the array.
// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
// Under every gif, display its rating (PG, G, so on).
// This data is provided by the GIPHY API.
// Only once you get images displaying with button presses should you move on to the next step.
// Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.

var searchesArr = ["Fairly Odd Parents", "Bugs Bunny", "Naruto", "Super Friends", "Rocket Power", "Goku","Thor","Power Rangers","Toothless","Cat-Dog","Sponge Bob","X-Men"];
var newBtns = [];
// creates a gif button for bank of gifs
function createBtnForSetArr() {
    $("#setArray").empty();
    for (var i = 0; i < searchesArr.length; i++) {
        var b = $("<button>");
        b.addClass("btn btn-primary");
        b.addClass("btn-filter")
        b.attr("data-name", searchesArr[i]);
        b.text(searchesArr[i]);
        $("#setArray").append(b);
        $("#setArray").append(" ");
    }
}
// creates a gif button for new searched item
function addBtn() {
    $("#buttonsSpace").empty();
    for (var i = 0; i < newBtns.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-success");
        a.addClass("btn-filter")
        a.attr("data-name", newBtns[i]);
        a.text(newBtns[i]);
        $("#buttonsSpace").append(a);
        $("#buttonsSpace").append(" ");
    }

}

//function for gif library
function displayNameInfo() {
    //empty's gif results space
    $("#resultsSpot").empty();
    //creates variable to hold attribute 
    var name = $(this).attr("data-name");
    //variable to hold API key and search name
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=jGgY1cTVHzVEnPojQe6k9tywEwdrcQoZ&limit=10&rating=pg";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // varibale to hold data from ajax
        var results = response.data;
        //loop to create gifs
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var gifImage = $("<img>");
            gifImage.addClass("rounded");
            gifImage.addClass("giphy");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-state", "still");

            gifDiv.append(gifImage);
            gifDiv.append(p);

            $("#resultsSpot").prepend(gifDiv);

        }

        console.log(response);

        $(".giphy").on("click", function () {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }

        });

    });
}

$(document).ready(function () {
    createBtnForSetArr();
    $(document).on("click", ".btn-filter", displayNameInfo);

    $("#addCartoon").on("click", function (event) {
        event.preventDefault();

        var name = $("#typedName").val().trim();
        newBtns.push(name);
        addBtn();

    })
})


