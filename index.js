const apiKey = '0zKlrl74PnRSXz68VeaH71AtN8ute51GbTKeY2Ma';
const searchUrl = 'developer.nps.gov/api/v1/parks';









function getParks(query, maxResults){
const params = {
    key: apiKey,
    q: query,
    maxResults,
};

const queryString = formatQueryParams(Params)
const url = searchUrl + '?' + queryString;

console.log(url);

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
