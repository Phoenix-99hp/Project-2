require("dotenv").config();

var clickedOfficialName = [""];
var clickedPartyName = [""];


$("#searchBtn").on("click", function (e) {
  e.preventDefault();
  $("#welcomeCard").css("display", "none");
  $("#imageContainer").empty();
  var zip = $("#zip").val().trim();
  var repURL = "https://www.googleapis.com/civicinfo/v2/representatives?" + process.env.API_KEY + zip;

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
      var cardColumn = $("<div class='column is-three-quarters-mobile is-one-quarter-tablet is-one-quarter-desktop'>");
      cardColumn.append(officialCard);
      $(".columns").append(cardColumn);
      // var offName = $(event.target).name;
      // var offParty = $(event.target).party;
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
    // Get comments from api/offical/ then populate modal
    $.ajax({
      method: "GET",
      url: "/api/official/" + clickedOfficialName[0].replace(/\s+/g, "").toLowerCase()
    }).then(function (response) {
      console.log(response);
      if (response !== null) {
        for (var i = 0; i < response.Comments.length; i++) {
          var html = $("<div class='comment'>" + response.Comments[i].body + "</div>");
          modalBody.append(html);
        }
      }
    });

    $.ajax({
      method: "GET",
      url: "/api/official/" + clickedOfficialName[0].replace(/\s+/g, "").toLowerCase()
    }).then(response => console.log(response));

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

    var newPersonObject = {
      name: clickedOfficialName[0].replace(/\s+/g, "").toLowerCase()
    };
    // Checks if official is already in database then determines whether to add a new official 
    // or associate a comment with an existing official
    $.ajax({
      method: "GET",
      url: "/api/official/" + clickedOfficialName[0].replace(/\s+/g, "").toLowerCase()
    }).then(function (res) {
      console.log(res);
      // If official is not in database ....
      if (res === null) {
        $.ajax({
          method: "POST",
          url: "/api/official",
          data: newPersonObject
        })
          .then(function () {
            $.ajax({
              method: "GET",
              url: "/api/official/" + clickedOfficialName[0].replace(/\s+/g, "").toLowerCase()
            })
              .then(function (response) {
                console.log(response);
                var newCommentObject = {
                  body: $("#commentInput").val().trim(),
                  PersonId: response.id
                };
                console.log(newCommentObject);
                $.ajax({
                  method: "POST",
                  url: "/api/comments",
                  data: newCommentObject
                });
              });
          });
      }
      // If official is in database...
      else {
        var newCommentObject = {
          body: $("#commentInput").val().trim(),
          PersonId: res.id
        };
        console.log(newCommentObject);
        $.ajax({
          method: "POST",
          url: "/api/comments",
          data: newCommentObject
        });
      }
    });
  }
});