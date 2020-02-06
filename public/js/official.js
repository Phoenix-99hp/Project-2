// When the page loads, grab and display info by name
try {
    $.get("/api/:official", function (data) {

        var officialName = data.name;
        var officialComments = data.comments;

        if (data) {
            $("#name").innerHTML(officialName);
            var row = $("<div>");
            row.addClass("comment");
            row.append("<p>" + officialComments + "</p>");
        } else {
            $("#name").innerHTML("Whoops! Something went wrong!");
        }

    });
}

catch (err) {
    $("name").innerHTML("Whoops! Something went wrong!");
    console.log(err);
}