$("#searchBtn").on("click", function (e) {
    e.preventDefault();
    const civicURL = "https://www.googleapis.com/civicinfo/v2/elections?key=AIzaSyCWvaHq1bAZ111hZ4qrZd6pdazM9LBEBcc";
    $.ajax({
        url: civicURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
});