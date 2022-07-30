
//we make our asynchronic function
async function renderAPIs(id) {
 
  // we link that class with the js file
  const apiWrapper = document.querySelector(".movies");

  // we link that class with the js file
 

  

  //const mat = document.querySelectorAll(".no__matches");
  
  // let matches = id;
  // //before the user searches for anything there will be 6 films loaded so movies is not empty
  // if (matches === undefined) {
  //   id = " ";
  // }

//we call the API
  const res = await fetch(`https://www.omdbapi.com/?apikey=234d65c1&s=${id}`);

//we call the loading class
  apiWrapper.classList += " landing__overlay--loading";

  //we translate the backend info into frontend
  const datas = await res.json();

//when our setTimeout of 1s ends the loading class is removed and the moovies appear
  apiWrapper.classList.remove("landing__overlay--loading");

  // we link that class with the js file
  const search = document.querySelector(".landing__title");

  //we print this html with whatever the user put in the searchbar by calling the id
  if(id == undefined){
    search.innerHTML = `<div class="landing__title">  </div>`;
  }
  else{
    search.innerHTML = `<div class="landing__title">Search results for: <for:span class="purple">${id}</for:span> </div>`;
  }

  //we introduce a life saving promise.. that made my life easier wtf
  new Promise((resolve, reject) => {
    let err = false
    //we map through the requested API and we store the first 6 movies in moviesHTML without commas between them 
    let moviesHTML = datas?.Search?.map((data) => html(data)).slice(0, 6) .join("")
    //we convert the array of objects(moovie) into html 
    apiWrapper.innerHTML = moviesHTML
    //if the requested API does not have arr of objects in omdb.com(who tf searches jfvjfd?) and it gives a value of undefined we pring a no results page
    if(id == undefined){
      apiWrapper.innerHTML=
      `<div class="blank">
      <h1 class="blank__title">What do you <span class="purple">feel</span> like watching today?</h1>
      </div>`;
    }
    if (datas.Search == undefined) {
        //we change the html in apiWrapper(.movies) to the no result page 
          apiWrapper.innerHTML=
          `<div class="matches">
          <figure class="match__figure">
          <img src="https://img.freepik.com/premium-vector/file-found-illustration-with-confused-people-holding-big-magnifier-search-no-result_258153-336.jpg?w=2000" alt="" class="match__img">
          </figure>
          <h2 class="match__title"> What do you mean <span class="purple">${id}</span>?</h2>
          </div>`;
        }
        else{
          console.log(" Thats's beautiful")
        }
    if(!err){
      resolve(console.log(datas.Search))
    }
    else {
      reject(console.log(err))
    }
  }).then(console.log(" init?"))  .catch(handleErr);
  //we store that info in the inner html of our .movies class
  function handleErr(err){
    console.log(datas.Search)
    console.log(err)
  }
 
  
  
  //I am trying to make the .no__matches class appear when the value of .movies is undefined(when the event.target.value doesn not match with an array from omdb.com )
//   noMatch();
//   function noMatch(){
//     if (id===undefined) {
//     apiWrapper.innerHTML=
//     `<div class="matches">
//     <h3 class="match__tittle"><span class="purple">it is young paduan</span></h3>
//     <figure class="match__figure">
//     <img src="https://img.freepik.com/premium-vector/file-found-illustration-with-confused-people-holding-big-magnifier-search-no-result_258153-336.jpg?w=2000" alt="" class="match__img">
//     </figure>
//     <h2 class="match__title">There weren't any matches found ${id}</h2>
//     </div>`;
//     mat.classList += ' matches';
//   }
//   else{
//     console.log("55")
//   }
// }

}



//we return every object in the array from omdb.com in html with the correct image, title and year by calling that function in the .map() above
function html(data) {
  return ` <div class="movie">
      <div>
      <img src="${data.Poster}" class="movie__poster" alt="">
      </div>
      <div class="movie__title">${data.Title}</div>
      <div class="movie__year">${data.Year}</div>
      </div>`;
}

//here we get the event.target.value(whatever is written in the input) and we store that value in renderAPIs parameter which is (id)
function submit(event) {
  renderAPIs(event.target.value);
}

//we set a timeout of 1 second so our loading class can appear otherwise it gets the data immediately and nothing happens
setTimeout(() => {
  renderAPIs();
}, 1000);

// that's what we will get if we put "fast" in the searchbar
// function getAPIs() {
  //    return [
  //     {Title:"Fast & Furious 6","Year":"2013","imdbID":"tt1905041","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX300.jpg"},
  //     {Title:"The Fast and the Furious","Year":"2001","imdbID":"tt0232500","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNzlkNzVjMDMtOTdhZC00MGE1LTkxODctMzFmMjkwZmMxZjFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"},
  //     {Title:"Fast Five","Year":"2011","imdbID":"tt1596343","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTUxNTk5MTE0OF5BMl5BanBnXkFtZTcwMjA2NzY3NA@@._V1_SX300.jpg"},
  //     {Title:"Fast & Furious","Year":"2009","imdbID":"tt1013752","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BYjQ1ZTMxNzgtZDcxOC00NWY5LTk3ZjAtYzRhMDhlNDZlOWEzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"},
  //     {Title:"2 Fast 2 Furious","Year":"2003","imdbID":"tt0322259","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMzExYjcyYWMtY2JkOC00NDUwLTg2OTgtMDI3MGY2OWQzMDE2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},
  //     {Title:"The Fast and the Furious: Tokyo Drift","Year":"2006","imdbID":"tt0463985","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTQ2NTMxODEyNV5BMl5BanBnXkFtZTcwMDgxMjA0MQ@@._V1_SX300.jpg"},
  //     {Title:"Fast & Furious Presents: Hobbs & Shaw","Year":"2019","imdbID":"tt6806448","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BOTIzYmUyMmEtMWQzNC00YzExLTk3MzYtZTUzYjMyMmRiYzIwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg"},
  //     {Title:"F9: The Fast Saga","Year":"2021","imdbID":"tt5433138","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMjI0NmFkYzEtNzU2YS00NTg5LWIwYmMtNmQ1MTU0OGJjOTMxXkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_SX300.jpg"},
  //     {Title:"Fast Times at Ridgemont High","Year":"1982","imdbID":"tt0083929","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BYzBlZjE1MDctYjZmZC00ZTJmLWFkOWEtYjdmZDZkODBkZmI2XkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SX300.jpg"},
  //     {Title:"How to Sell Drugs Online (Fast)","Year":"2019–","imdbID":"tt9184994","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BZjIzNTkyNjktNDdmMy00MmI4LWFlN2MtNDllYTVhZjljNWFiXkEyXkFqcGdeQXVyMTAwMzM3NDI3._V1_SX300.jpg"}
  // ];
// }
