const API_TOKEN = "ee92677d899b3721ea944663ba977f54"

export function getMoviesFromApiOnSearch(text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function getFilmDetailsFromApi(id) {
  return fetch('https://api.themoviedb.org/3/movie/'+ id + '?api_key=' + API_TOKEN + '&language=fr')
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function getFilmCreditsFromApi(id) {
  return fetch('https://api.themoviedb.org/3/movie/'+ id + '/credits?api_key=' + API_TOKEN + '&language=fr')
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function getBestFilmsFromApi(page) {
  return fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + API_TOKEN + '&vote_count.gte=1000&sort_by=release_date.desc&language=fr&page=' + page)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}
