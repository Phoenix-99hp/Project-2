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

    // ====================
    // For loop will populate page with cards. Cards contain info from API.
    // ====================

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
        "</p><a href='#' class='open-modal'>Read More</a><br><a href='" +
        data[i].urls +
        "' target='_blank' class='btn btn-primary'>Official Site</a></div></div ></div>"
      );
      var cardColumn = $("<div class='column is-3'>");
      cardColumn.append(officialCard);
      $(".columns").append(cardColumn);
    }

    // // Create click event that opens a modal when user clicks "Read More" on an official's card, and closes when the user clicks the background, footer, or "x" button.
    function toggleModalClasses(event) {
      event.preventDefault();
      $(".modal").toggleClass("is-active");
      $("html").toggleClass("is-clipped");
    }
    $(".open-modal").click(toggleModalClasses);
    $(".close-modal").click(toggleModalClasses);


  });
});
