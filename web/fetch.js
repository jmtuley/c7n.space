$button = $('#fetch');

$button.on('click', function() {
  val = $('#contraction').val().toLowerCase();

  fetch(val);

  return false;
});

function fetch(contraction) {
  $.ajax({
    url: 'en/' + contraction + '.json',
    type: 'GET',
    dataType: 'json',
  }).done(function(json) {
    link = "<p>Share a <a href=" + baseURL() + "?c=en/" + contraction + ">link to these results.</a></p>\n";
    list = '<ul>' + $.map(json.words, function(w) { return '<li>' + w + '</li>' }).join('\n') + '</ul>';
    $('#results').html(link + list);
  }).fail(function(xhr, status, error) {
    console.log(xhr, status, error);
  });
}

function baseURL() {
  return window.location.href.split("?")[0];
}

$(function() {
  wordParam = /\?c=(\w+)\/([A-Za-z]\d+[A-Za-z])$/;
  match = window.location.href.match(wordParam);
  if (match) {
    _lang = match[1];
    contraction = match[2];

    fetch(contraction);
    $('#contraction').val(contraction);
  }
})
