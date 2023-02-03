document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.querySelector(".btn");
  const formEl = document.getElementById("name");

  const title = document.getElementById("title");
  const descr = document.getElementById("descr");

  const tmdbEndPoint = "https://api.themoviedb.org/3";
  const tmdbApiKey = "3ec796860d338dbe182981a1c1f3f1c1";


  const searchNameEngine = async (genre) => {
    const path = "/search/movie";
    const queryParams = `?api_key=${tmdbApiKey}&query=${genre}&language=en-US&page=1&include_adult=false`;
    const url = `${tmdbEndPoint}${path}${queryParams}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const jsonResponse = await response.json();
        renderData(jsonResponse.results);
      }
    } catch (Error) {
      console.log(Error);
    }
  };

  const renderData = async (jsonResponse) => {
    title.textContent = jsonResponse[0].original_title;
    descr.textContent = jsonResponse[0].overview;
    searchAvalibilityEngine(jsonResponse[0].original_title);
  };

  submitBtn.addEventListener("click", handleClick);

  function handleClick(e) {
    e.preventDefault();
    searchNameEngine(formEl.value);
    const clear = document.getElementById("name");
    clear.value = "";
    renderData();
  }


  const motnEndPoint = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'

  const searchAvalibilityEngine = async (name) => { 
    
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '5e25bf14aamsh93f348e1f56f1f0p1162c9jsnc01051fd8308',
        'X-RapidAPI-Host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'
      }
    };
    
  
   
    name = name.split(" ").join("")
    console.log(name)
    const path = "/lookup";
    const queryParams = `?term=${name}&country=us`;
    const url = `${motnEndPoint}${path}${queryParams}`;
    console.log(url)
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse)
        console.log(jsonResponse.results[0].locations[3].display_name)
        let displayName = jsonResponse.results[0].locations[3].display_name
        if(displayName) {
          pEl = document.createElement('p')
          pEl.textContent = `This show is on ${displayName}`
          document.body.append(pEl)
        }
      }
    } catch (Error) {
      console.log(Error);
    }
  };
  
 searchAvalibilityEngine()
});





