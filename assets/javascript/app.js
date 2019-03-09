

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
// creates a gif button for new typed name inquired from input
function addBtn() {
    $("#buttonsSpace").empty();
    for (var i = 0; i < newBtns.length; i++) {
        //creates a button each round
        var a = $("<button>");
        //give class to buttons
        a.addClass("btn btn-success");
        a.addClass("btn-filter")
        //adds attibute to button
        a.attr("data-name", newBtns[i]);
        a.text(newBtns[i]);
        //apends each button
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
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=jGgY1cTVHzVEnPojQe6k9tywEwdrcQoZ&limit=10&rating=pg";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // varibale to hold data from ajax
        var results = response.data;
        //loop to create gifs
        for (var i = 0; i < results.length; i++) {
           //create div for holding GIF data response 
            var gifDiv = $("<div>");
            // data rating
            var rating = results[i].rating;
            //writes rating to DOM
            var r = $("<p>").text("Rating: " + rating);
            //craetes image tag for GIF data response
            var gifImage = $("<img>");
            //gives class to gif tag
            gifImage.addClass("rounded");
            gifImage.addClass("giphy");
            // add's attibutes to gifs
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-state", "still");
            // adds/appends gif image and rating together
            gifDiv.append(gifImage);
            gifDiv.append(r);
            //displays Gif to page in results spot
            $("#resultsSpot").prepend(gifDiv);

        }

        console.log(response);
        //function to check if gif is clicked
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
//sets DOM to be ready on go
$(document).ready(function () {
    createBtnForSetArr();
    $(document).on("click", ".btn-filter", displayNameInfo);
    //Listener for adding cartoon gif from DOM
    $("#addCartoon").on("click", function (event) {
        //prevents page from reloading on its own
        event.preventDefault();
        //creates a variable for typed name in submit button
        var name = $("#typedName").val().trim();
        newBtns.push(name);
        addBtn();
    })
})


