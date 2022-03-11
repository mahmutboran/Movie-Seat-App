

let total = document.getElementById("total")
let film = document.getElementById("film")
let count = document.getElementById("count")
let movie = document.getElementById("movie")
let movieSelect = movie.selectedOptions
let seat = document.querySelectorAll(".row .seat")



/* refresh // update */
let currentMovieIndex= localStorage.getItem("filmIndex") ? localStorage.getItem("filmIndex") : movie.selectedIndex;
movie.selectedIndex=currentMovieIndex
film.innerText = localStorage.getItem("filmName") ? localStorage.getItem("filmName") : movieSelect[0].innerText.slice(0, movieSelect[0].innerText.indexOf("("));
count.innerText = localStorage.getItem("seat") ? JSON.parse(localStorage.getItem("seat")).length :count.innerText;
total.innerText = movieSelect[0].value * count.innerText
let storageLocal =localStorage.getItem("seat") ? JSON.parse(localStorage.getItem("seat")) : [];


/* Movie Change */
movie.addEventListener("change", (e) => {
    localStorage.setItem("filmIndex",JSON.stringify( e.target.selectedIndex))
    localStorage.setItem("filmName",JSON.stringify( movieSelect[0].innerText.slice(0, movieSelect[0].innerText.indexOf("("))))     
    film.innerText=JSON.parse(localStorage.getItem("filmName"))
    total.innerText = movieSelect[0].value * count.innerText
    localStorage.setItem('seat', JSON.stringify(storageLocal));

})



/* Select Seat */
seat.forEach((el, i) => {
    el.addEventListener("click", (e) => {
        e.target.classList.toggle("selected");
        if (e.target.classList == "seat selected") {
            storageLocal.push(i)
            localStorage.setItem('seat', JSON.stringify(storageLocal));
            count.innerText = JSON.parse(localStorage.getItem("seat")).length
            total.innerText = movieSelect[0].value * count.innerText
        } else if (e.target.classList == "seat") {
            storageLocal.splice(storageLocal.indexOf(i), 1)
            localStorage.setItem('seat', JSON.stringify(storageLocal));
            count.innerText = JSON.parse(localStorage.getItem("seat")).length
            total.innerText = movieSelect[0].value * count.innerText
        }
    })

});


/* Selected Seat */
let displaySeats=()=>{
    let getLocalSeat = JSON.parse(localStorage.getItem("seat"))
    if (getLocalSeat!==null && getLocalSeat.length>0 ) {
        seat.forEach((e,i)=>{
            if(getLocalSeat.indexOf(i)>-1){
                e.classList.add("selected");
            }
        })
    }
}

displaySeats()