document.addEventListener("DOMContentLoaded", function () {

const submitBtn = document.querySelector(".btn");
const formEl = document.getElementById("name");

const title = document.getElementById('title')
const descr = document.getElementById('descr')

const endpoint = "https://api.themoviedb.org/3";
const apiKey = "3ec796860d338dbe182981a1c1f3f1c1";

const searchNameEngine = async (genre) => {
  
  const path = "/search/movie";
  const queryParams = `?api_key=${apiKey}&query=${genre}&language=en-US&page=1&include_adult=false`;
  const url = `${endpoint}${path}${queryParams}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const jsonResponse = await response.json();
      renderData(jsonResponse.results)
    }
  } catch (Error) {
    console.log(Error);
  }
};

const renderData = async (jsonResponse) => {
  title.textContent = jsonResponse[0].original_title
  descr.textContent = jsonResponse[0].overview
}


submitBtn.addEventListener('click', handleClick)


function handleClick(e) {
  e.preventDefault()
   searchNameEngine(formEl.value) 
   const clear = document.getElementById("name");
   clear.value = "";
   renderData()
}



});