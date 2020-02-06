$("#searchBtn").on("click", function (e) {
  e.preventDefault();
  const zip = $("#zip")
    .val()
    .trim();
  const repURL =
    "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCWvaHq1bAZ111hZ4qrZd6pdazM9LBEBcc&address=" +
    zip;

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
        officialImage = $(
          "<div class='card-image'><figure><img src='" +
          data[i].photoUrl +
          "' alt='Placeholder image'></figure></div>"
        );
      } else {
        officialImage = $(
          "<div class='card-image'><figure class='image is-4by3'><img src='https://bulma.io/images/placeholders/1280x960.png' alt='Placeholder image'></figure></div>"
        );
      }
      officialCard.append(officialImage);
      officialCard.append(
        "<div class='card-content'><div class='content'><h5>" +
        data[i].name +
        "</h5><p>Party: " +
        data[i].party +
        "</p><a href='#' class='modalLink'>Read More</a><br><a href='" +
        data[i].urls +
        "' target='_blank' class='btn btn-primary'>Official Site</a></div></div ></div>"
      );
      var cardColumn = $("<div class='column is-3'>");
      cardColumn.append(officialCard);
      $(".columns").append(cardColumn);
    }
    // Create click event that opens a modal when user clicks "Read More" on an official's card.
    $(".modalLink").on("click", function (event) {
      event.preventDefault();
      $(".modal").addClass("is-active");
    });

    // Create click event that closes the modal when user clicks on the footer or modal background.
    $(".modal-background").on("click", function (event) {
      event.preventDefault();
      $(".modal").classList.remove(".is-active");
    });

  });
});
