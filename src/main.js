

const endpoint = "https://api.themoviedb.org/3";
const apiKey = "3ec796860d338dbe182981a1c1f3f1c1";


const apiEngine = async () => {
  const path = "/genre/movie/list";
  const queryParams = `?api_key=${apiKey}`;
  const url = `${endpoint}${path}${queryParams}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (Error) {
    console.log(Error);
  }
};

let genKeyArr = []

const renderGenre = async () => {
  const jsonResponse = await apiEngine();
  var genreArr = [];
  genKeyArr.push(Object.keys(jsonResponse.genres))
  for (let i = 0; i < 19; i++) {
    genreArr.push(jsonResponse.genres[i].name);
  }
  for (let i = 0; i < 19; i++) {
    const btnEl = document.createElement("button");
    btnEl.textContent = genreArr[i];
    btnEl.setAttribute('value', genKeyArr[0][i])
    document.body.appendChild(btnEl);
    btnEl.addEventListener('click', handleClick)
  }
};


function handleClick(e) {
  e.preventDefault()
  searchGenreApi(e.target.value)
  removeEventListener('click', handleClick)
}

const searchGenreApi = async (genre) => {
  const path = "/discover/movie";
  const queryParams = `?certification_country=US&with_genres=${genre}&sort_by=vote_average.desc&api_key=${apiKey}`;
  console.log(queryParams)
  const url = `${endpoint}${path}${queryParams}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse)
    }
  } catch (Error) {
    console.log(Error);
  }

}

renderGenre();

