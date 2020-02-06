$("#searchBtn").on("click", function (e) {
    e.preventDefault();
    const zip = $("#zip").val().trim();
    const repURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCWvaHq1bAZ111hZ4qrZd6pdazM9LBEBcc&address=" + zip;

    $.ajax({
        url: repURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var data = response.officials;
        for (var i = 0; i < data.length; i++) {
            var officialCard = $("<div class='card'>");
            var officialImage;
            if (data[i].photoUrl) {
                officialImage = $("<img src='" + data[i].photoUrl + "' class='card-img-top' alt='Official Photo'>");
            } else {
                officialImage = $("<img src='https://via.placeholder.com/150' class='card-img-top' alt='Official Photo'>");
            }
            officialCard.append(officialImage);
            officialCard.append("<div class='card-body'><h5 class='card-title'>" + data[i].name + "</h5><p class='card-text'>Party: " + data[i].party + "</p><a href='" + data[i].urls + "' target='_blank' class='btn btn-primary'>Read More</a></div></div >");
            var cardColumn = $("<div class='col-sm-3'>");
            cardColumn.append(officialCard);
            $(".officials-row").append(cardColumn);

        }
    });
});