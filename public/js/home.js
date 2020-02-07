var clickedOfficialName = [""];
var clickedPartyName = [""];


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
      officialCard.append("<div class='card-content'><div class='content'><h5>" + data[i].name + "</h5><p>Party: " + data[i].party + "</p><a class='moreLink'>Leave Comment</a><br><a href='" + data[i].urls + "' target='_blank' class='btn btn-primary'>Official Site</a></div></div ></div>");
      var cardColumn = $("<div class='column is-3'>");
      cardColumn.append(officialCard);
      $(".columns").append(cardColumn);

    }
  });
});

document.body.addEventListener("click", function (evt) {
  if (evt.target.className === "moreLink") {
    console.log("button was clicked");
    clickedOfficialName.splice(0, 1, evt.target.previousSibling.previousSibling.innerText);
    clickedPartyName.splice(0, 1, evt.target.previousSibling.innerText);
    var modalTitle = $(".modal-card-title");
    var modalBody = $(".modal-card-body");
    // Empty modal of previous entries
    modalTitle.empty();
    modalBody.empty();
    // Add clicked official name and party to modal from array
    modalTitle.append(clickedOfficialName[0]);
    modalBody.append("<p>" + clickedPartyName[0] + "</p>");
    modalBody.append("<label>Comment: </label><textarea id='commentInput'></textarea>");
    // Get comments from api/comments/:name
    // $.get("api/comments/" + clickedOfficialName[0], function (comments) {
    //   //Render comments and append to HTML
    //   for (var i = 0; i < comments.length; i++) {
    //     var commentHtml = $("<p>" + comments[i].comment + "</p>");
    //     modalBody.append(commentHtml);
    //   }
    // });
    $(".modal").toggleClass("is-active");
    $("html").toggleClass("is-clipped");
  }
});

function toggleModalClasses() {
  $(".modal").toggleClass("is-active");
  $("html").toggleClass("is-clipped");
}

$(".close-modal").click(toggleModalClasses);

$("#saveBtn").on("click", function () {

  if ($("#commentInput").val().trim() !== "" && $("#commentInput").val().trim() !== null) {

    // var newDataObject = {
    //   name: clickedOfficialName[0],
    //   comment: $("#commentInput").val().trim()
    // };

    // $.post("/api/comments", newDataObject);
  }
});