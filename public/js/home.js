$("#searchBtn").on("click", function (e) {
    e.preventDefault();
    const street = $("#street").val().trim();
    const city = $("#city").val().trim();
    const state = $("#state").val().trim();
    // const address = $("#address").val().trim();
    // const repURL2 = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCWvaHq1bAZ111hZ4qrZd6pdazM9LBEBcc&address=" + address;
    const repURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCWvaHq1bAZ111hZ4qrZd6pdazM9LBEBcc&address=" + street + " " + city + " " + state;
    $.ajax({
        url: repURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
});