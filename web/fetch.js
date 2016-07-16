$button = $('#fetch');

$button.on('click', function() {
  val = $('#contraction').val().toLowerCase();

  $.ajax({
    url: 'en/' + val + '.json',
    type: 'GET',
    dataType: 'json',
  }).done(function(json) {
    list = '<ul>' + $.map(json.words, function(w) { return '<li>' + w + '</li>' }).join('\n') + '</ul>';
    $('#results').html(list);
  }).fail(function(xhr, status, error) {
    console.log(xhr, status, error);
  });

  return false;
});
