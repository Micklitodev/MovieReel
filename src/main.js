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


let searchBtns = document.querySelectorAll("#historyBtns")
let index = 0;

if (localStorage.getItem(0)) {
  searchBtns[0].textContent = localStorage.getItem(0);
  searchBtns[1].textContent = localStorage.getItem(1);
  searchBtns[2].textContent = localStorage.getItem(2);
  searchBtns[3].textContent = localStorage.getItem(3);
  searchBtns[4].textContent = localStorage.getItem(4);
  
 }

function displayHistory (history) {
 
  searchBtns[index].textContent = history;
  localStorage.setItem(index, searchBtns[index].textContent);
  if (index >= 4) {
    index = 1;
  } else {
    index++;
  }
}
 












searchBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const history = btn.textContent;
    searchNameEngine(history);
  });
});








  const renderData = async (jsonResponse) => {
    title.textContent = jsonResponse[0].original_title;
    descr.textContent = jsonResponse[0].overview;
    searchAvalibilityEngine(jsonResponse[0].original_title);
  };

  submitBtn.addEventListener("click", handleClick);

  function handleClick(e) {
    e.preventDefault();
    searchNameEngine(formEl.value);
    displayHistory(formEl.value);
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
            movieNameEl.setAttribute("class", "rendered-h2");
            movieNameEl.textContent = movieName;
            main.appendChild(movieNameEl);

            let prevImg = jsonResponse.results[i].picture;
            let prevImgEl = document.createElement("img");
            prevImgEl.setAttribute("src", `${prevImg}`);
            prevImgEl.setAttribute("class", "rendered-img");
            main.appendChild(prevImgEl);

            let linkParentEl = document.createElement("div");
            linkParentEl.setAttribute("class", "rendered-link-parent");
            main.appendChild(linkParentEl);

            for (let x = 0; x < 3; x++) {
              let link = jsonResponse.results[i].locations[x].url;
              let icon = jsonResponse.results[i].locations[x].icon;
              let linkEl = document.createElement("a");
              let iconEl = document.createElement("img");
              linkEl.setAttribute("href", `${link}`);
              linkEl.setAttribute("class", "rendered-links");
              iconEl.setAttribute("src", `${icon}`);
              linkEl.appendChild(iconEl);
              linkParentEl.appendChild(linkEl);
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

// Playing with local storage
/*const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchHistoryButton = document.getElementById("search-history-button");
const searchHistoryList = document.getElementById("search-history-list");

searchButton.addEventListener("click", function () {
  const searchQuery = searchInput.value;

  // Save the search query to local storage
  const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  searchHistory.push(searchQuery);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

  // Clear the input field after saving the search query
  searchInput.value = "";
});

searchHistoryButton.addEventListener("click", function () {
  // Retrieve the search history from local storage and display it
  const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  searchHistoryList.innerHTML = "";
  searchHistory.forEach(function (query) {
    const listItem = document.createElement("li");
    listItem.textContent = query;
    searchHistoryList.appendChild(listItem);
  });
});*/


// Function to store search history
/*function saveSearchHistory(searchTerm) {
  let searchHistory = JSON.parse(localStorage.getItem("title")) || [];
  searchHistory.push(searchTerm);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

// Display the search history from localStorage
function displaySearchHistory() {
  let searchHistory = JSON.parse(localStorage.getItem("title")) || [];
  let historyList = document.getElementById("recentSearch");
  historyList.innerHTML = "";
  searchHistory.forEach(function(searchTerm) {
    let listItem = document.createElement("li");
    listItem.innerHTML = searchTerm;
    historyList.appendChild(listItem);
  });
}

let historyButton = document.getElementById("recentSearch");
historyButton.addEventListener("click", displaySearchHistory);*/




//saving text input
//var textInput = document.getElementById("name");
//textInput.addEventListener("change", function() {
  //localStorage.setItem("searchInput-" + Date.now(), this.value);
//});

// trying to get all search inputs from local storage
//var searchHistory = [];
//for (var i = 0; i < localStorage.length; i++) {
  //var key = localStorage.key(i);
  //if (key.startsWith("searchInput")) {
   // var searchInput = localStorage.getItem(key);
    //searchHistory.push(searchInput);
 // }
//}

//displaying the search history as a list
//var list = document.createElement("ul");
//for (var i = 0; i <searchHistory.length; i++) {
  //var item = document.createElement("li");
  //item.innerHTML = searchHistory[i];
  //list.appendChild(item);
//}
//document.body.appendChild(list);