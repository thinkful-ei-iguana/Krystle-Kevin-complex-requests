const apiKey = '0zKlrl74PnRSXz68VeaH71AtN8ute51GbTKeY2Ma';
const searchUrl = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  $('#results-list').empty();
  responseJson.forEach(element => {
    $('results-list').append(
      `<li>
        <h3>${responseJson.data.fullName}</h3>
        <p>${responseJson.data.description}</p>
        <p>${responseJson.data.url}</p>
        </li>`
    );
  });
}

function getParks(query, maxResults){
  const params = {
    key: apiKey,
    q: query,
    maxResults,
  };

  const queryString = formatQueryParams(params);
  const url = searchUrl + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    const searchState = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchState, maxResults);
  });
}
$(watchForm);