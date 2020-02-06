var clickedOfficialName = [""];

$("#searchBtn").on("click", function (e) {
  e.preventDefault();
  var zip = $("#zip").val().trim();
  var repURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCWvaHq1bAZ111hZ4qrZd6pdazM9LBEBcc&address=" + zip;

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
        officialImage = $("<div class='card-image'><figure><img src='" + data[i].photoUrl + "' alt='Placeholder image'></figure></div>");
      } else {
        officialImage = $("<div class='card-image'><figure class='image is-4by3'><img src='https://bulma.io/images/placeholders/1280x960.png' alt='Placeholder image'></figure></div>");
      }
      officialCard.append(officialImage);
      officialCard.append("<div class='card-content'><div class='content'><h5>" + data[i].name + "</h5><p>Party: " + data[i].party + "</p><button class='moreLink'>Read More</button><br><a href='" + data[i].urls + "' target='_blank' class='btn btn-primary'>Official Site</a></div></div ></div>");
      var cardColumn = $("<div class='column is-3'>");
      cardColumn.append(officialCard);
      $(".columns").append(cardColumn);

    }

    function populateModal() {
      var modalTitle = $(".modal-card-title");
      var modalBody = $(".modal-card-body");
      modalTitle.append(EventTarget.name);
      modalBody.append("<p>Party: " + EventTarget.party + "</p>");
    }

    // // Create click event that opens a modal when user clicks "Read More" on an official's card, and closes when the user clicks the background, footer, or "x" button.
    function toggleModalClasses(event) {
      event.preventDefault();
      $(".modal").toggleClass("is-active");
      $("html").toggleClass("is-clipped");
    }
    $(".moreLink").click(toggleModalClasses);
    $(".moreLink").click(populateModal);
    $(".close-modal").click(toggleModalClasses);

  });
});

document.body.addEventListener("click", function (evt) {
  if (evt.target.className === "moreLink") {
    console.log("button was clicked");
    clickedOfficialName.splice(0, 1, evt.target.previousSibling.previousSibling.innerText);
    console.log(clickedOfficialName[0]);
    var zip = $("#zip").val().trim();
    var repURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCWvaHq1bAZ111hZ4qrZd6pdazM9LBEBcc&address=" + zip;
    $.ajax({
      url: repURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      // Works above this line
      var index;
      for (var i = 0; i < response.length; i++) {
        if (clickedOfficialName[0] == response.officials[i].name) {
          index = i;
          console.log(index);
          break;
        }
      }
      // var newOfficial = {
      //   name: response.officials[index].name
      // }
      // $.post("/api/offical", newOfficial)
    });
  }
}, false);
