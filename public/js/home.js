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

            var row = $("<div>");
            row.addClass("test");

            row.append("<p>" + data[i].name + data[i].party + "</p>");
            row.append("<br>");
            $(".pet-row").append(row);

        }
    });
});