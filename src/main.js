document.addEventListener("DOMContentLoaded", function () {
  const main = document.getElementById("main");
  const section = document.getElementById("section");

  const submitBtn = document.querySelector(".btn");
  const formEl = document.getElementById("name");

  const title = document.getElementById("title");
  const descr = document.getElementById("descr");

  const tmdbEndPoint = "https://api.themoviedb.org/3";
  const tmdbApiKey = "3ec796860d338dbe182981a1c1f3f1c1";

  const searchNameEngine = async (genre) => {
    section.style.cssText = "display: block";
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

  const motnEndPoint =
    "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com";

  const searchAvalibilityEngine = async (name) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "5e25bf14aamsh93f348e1f56f1f0p1162c9jsnc01051fd8308",
        "X-RapidAPI-Host":
          "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
      },
    };

    name = name.split(" ").join("");
    const path = "/lookup";
    const queryParams = `?term=${name}&country=us`;
    const url = `${motnEndPoint}${path}${queryParams}`;
    console.log(url);
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        console.log(jsonResponse.results[0].locations[0].display_name);
        if (jsonResponse.results[0].hasOwnProperty("locations")) {
          for (let i = 0; i < 3; i++) {
            let movieName = jsonResponse.results[i].name;
            let movieNameEl = document.createElement("h2");
            movieNameEl.setAttribute('class', 'rendered-h2')
            movieNameEl.textContent = movieName;
            main.appendChild(movieNameEl);

            let prevImg = jsonResponse.results[i].picture;
            let prevImgEl = document.createElement("img");
            prevImgEl.setAttribute("src", `${prevImg}`);
            prevImgEl.setAttribute("class", "rendered-img");
            main.appendChild(prevImgEl);

            for (let x = 0; x < 3; x++) {
              let link = jsonResponse.results[i].locations[x].url;
              let icon = jsonResponse.results[i].locations[x].icon;
              let linkEl = document.createElement("a");
              let iconEl = document.createElement("img");
              linkEl.setAttribute("href", `${link}`);
              linkEl.setAttribute("class", "rendered-links");
              iconEl.setAttribute("src", `${icon}`);
              linkEl.appendChild(iconEl);
              main.appendChild(linkEl);
            }
          }
        }
      }
    } catch (Error) {
      console.log(Error);
      console.log("NOT STREAMED ANYWHERE CURRENTLY");
    }
  };

  searchAvalibilityEngine();
});
