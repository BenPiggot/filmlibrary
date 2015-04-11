$(function(){


$('.destroy-button').on('click', function(e) {
  e.preventDefault();
  var deleteButton = $(this)
  var myUrl = 'favorites/' + deleteButton.attr('data');
  console.log(myUrl)
  if(confirm('Are you sure you want to delete ?')) {
    $.ajax({
       method: 'DELETE',
       url: myUrl
    }).done(function(data) {
      console.log(myUrl)
      deleteButton.closest('ul').fadeOut('fast', function() {
        $(this).remove();
      })
    })
  }
})


$('button#favorite').on('click', function(e) {
  e.preventDefault();

  var addBtn = $(this);
  console.log(addBtn)

  if ($('button#favorite').hasClass('btn-info')) {
    var myUrl = $('#ajax-query').attr('action');
    console.log(myUrl)

    $.ajax({
        method: 'POST',
        url: myUrl,
        data: $('.form').serialize()
       }).done(function(data) {
        console.log(data)
        addBtn.removeClass('btn-info').text('')
        addBtn.addClass('btn-danger').text('Remove as a Favorite')
        })

  } else if ($('button#favorite').hasClass('btn-danger')) {
      var imdbID = $('#ajax-query').find('input[name="imdbID"]').val();
      var myUrl = $('#ajax-query').attr('action');
      console.log(imdbID)
      var newUrl = myUrl + '/' + imdbID;
      console.log(newUrl)

    $.ajax({
        method: 'DELETE',
        url: newUrl
        }).done(function(data) {
        $('button#favorite').removeClass('btn-danger').text('')
        $('button#favorite').addClass('btn-info').text('Add as a Favorite')
        });
      }
    })

});

