$.getJSON('/articles', function(data) {
  for (var i = 0; i < data.length; i++) {
    $('#articles').append(
      "<div class='col-sm-4' style='margin-bottom:60px;'><div class='card'><div class='card-body'><a class='title-link' href='" +
        data[i].link +
        "'><h5>" +
        data[i].title +
        "</h5></a><hr><p class='card-text'>" +
        data[i].snippet +
        "</p><button data-id='" +
        data[i]._id +
        "' class='btn-note btn btn-outline-primary btn-sm' data-toggle='modal' data-target='#myModal' style='margin-right:10px;'>Note</button><button id='btn-save' data-id='" +
        data[i]._id +
        "' class='btn btn-outline-primary btn-sm'>Save Article</button></div></div></div>",
    );
  }

  console.log(data);
});

// When you click the Fetch button
$(document).on('click', '.btn', function() {
  alert("That's all I got!");

  $.ajax({
    method: 'GET',
    url: '/scrape',
  }).done(function(data) {
    location.reload();
  });
});
