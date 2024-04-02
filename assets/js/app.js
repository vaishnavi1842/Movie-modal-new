const cl = console.log;

const showmodal = document.getElementById("showModal");
const backDrop = document.getElementById("backDrop");
const moviemodal = document.getElementById("moviemodal");
const movieForm = document.getElementById("movieForm");
const titleControl = document.getElementById("title");
const imgUrlControl = document.getElementById("imgUrl");
const overviewControl = document.getElementById("overview");
const ratingControl = document.getElementById("rating");
const movieContainer = document.getElementById("movieContainer");
const submitBtn = document.getElementById("submitBtn"); 
const updatebtn = document.getElementById("updatebtn")
const closeMovieModal = [...document.querySelectorAll(".closeMovieModal")];

let movieArr =[];

generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};


const modalBackDropToggle = () => {
	backDrop.classList.toggle("active");
	moviemodal.classList.toggle("active");
}


const onMovieEdit = (ele) => {
    let editId = ele.closest(".movieCard").id;
    localStorage.setItem("editId",editId)
    cl(editId);
    let editObj = movieArr.find(movie => movie.movieId === editId);
    cl(editObj);
    modalBackDropToggle();
    titleControl.value = editObj.title;
    imgUrlControl.value = editObj.imgUrl;
	overviewControl.value = editObj.overview;
	ratingControl.value = editObj.rating;
    submitBtn.classList.add("d-none");
    updatebtn.classList.remove("d-none");
}

const onMovieDelete = (ele) =>{
  // cl(ele);
  Swal.fire({
    title: "Do you want to remove Movie?",
    showCancelButton: true,
    confirmButtonText: "Yes",
    denyButtonText: `Cancel`
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

        let deleteId = ele.closest(".movieCard").id;
        cl(deleteId); 
        let getDeleteIndex = movieArr.findIndex(movie=>movie.movieId === deleteId);
        movieArr.splice(getDeleteIndex, 1);
        localStorage.setItem("movieArr", JSON.stringify(movieArr));
        ele.closest(".col-md-4").remove()
        Swal.fire("Delete Successfully!", "", "info");
    }
  });
  

}



const addMovieCard = (obj) =>{
    let card = document.createElement("div");
    card.id = obj.movieId;
    card.className = "col-md-4";
    card.innerHTML = `
    <div class="card mb-4">
    <figure class="movieCard mb-0" id="${obj.movieId}"> 
      <img src="${obj.imgUrl}" alt="${obj.title}" title="${obj.title}">
       <figcaption>
         <div class="ratingsection">
            <div class="row">
               <div class="col-10">
                  <h3>${obj.title}</h3>
               </div>
               <div class="col-2">
                  <span>${obj.rating}</span>
               </div>
            </div>
         </div>
         <div class="overviewsection">
            <h4>${obj.title} </h4>
            <em>Overview</em>
            <p>
            ${obj.overview} 
            </p> 
            <div class="action">
              <button class="btn btn-outline-info" onclick="onMovieEdit(this)">Edit</button>
              <button class="btn btn-outline-danger" onclick="onMovieDelete(this)">Delete</button>
            </div>
         </div>
      </figcaption>
    </figure>
  </div>
                     `;
     movieContainer.prepend(card);
}

const templatingOfMovie = (arr) => {
	let result = ``;
	arr.forEach(obj => {
		result += `
		 <div class="col-md-4">
		 <div class="card mb-4">
		   <figure class="movieCard mb-0" id="${obj.movieId}"> 
			 <img src="${obj.imgUrl}" alt="${obj.title}" title="${obj.title}">
			  <figcaption>
				<div class="ratingsection">
				   <div class="row">
					  <div class="col-10">
						 <h3>${obj.title}</h3>
					  </div>
					  <div class="col-2">
						 <span>${obj.rating}</span>
					  </div>
				   </div>
				</div>
				<div class="overviewsection">
				   <h4>${obj.title} </h4>
				   <em>Overview</em>
				   <p>
				   ${obj.overview} 
				   </p>
                   <div class="action">
                      <button class="btn btn-outline-info" onclick="onMovieEdit(this)">Edit</button>
                      <button class="btn btn-outline-danger" onclick="onMovieDelete(this)">Delete</button>
                   </div>
				</div>
			 </figcaption>
		   </figure>
		 </div>
		</div>
	           `  
	})
	  movieContainer.innerHTML=result; 	
}

if(localStorage.getItem("movieArr")){
    movieArr = JSON.parse(localStorage.getItem("movieArr"));
    templatingOfMovie(movieArr)

}



/*const modalbackDropshow=()=>{
	backDrop.classList.toggle("active");
	moviemodal.classList.toggle("active");
	
}

const modalBackdrophide=()=>{
	backDrop.classList.toggle("active");
	moviemodal.classList.toggle("active");
	
}*/



const onMovieAdd = (eve) => {
	eve.preventDefault();
	let movieObj = {
		title: titleControl.value,
		imgUrl: imgUrlControl.value,
		overview: overviewControl.value,
		rating: ratingControl.value,
        movieId: generateUuid()

	}
	movieArr.unshift(movieObj)
    localStorage.setItem("movieArr", JSON.stringify(movieArr));
	cl(movieArr)
   //templatingOfMovie(movieArr);
   addMovieCard(movieObj)
	eve.target.reset();

	modalBackDropToggle();
	Swal.fire({
		title: `${movieObj.title} Movie is added suceesfuly!!!`,
		icon: "success",
		timer: 2500
	})
}

showmodal.addEventListener("click", modalBackDropToggle)

closeMovieModal.forEach(btn => {
	btn.addEventListener("click", modalBackDropToggle)
})

const onMovieUpdate =()=>{
    let updateId = localStorage.getItem("editId");
    let updatedObj = {
        title: titleControl.value,
		imgUrl: imgUrlControl.value,
		overview: overviewControl.value,
		rating: ratingControl.value,
        movieId : updateId
    }
    cl(updatedObj);
    let getIndex = movieArr.findIndex(movie =>movie.movieId === updateId);
   // cl(getIndex)
   movieArr[getIndex] = updatedObj;
   localStorage.setItem("movieArr", JSON.stringify(movieArr));
   let getCard = document.getElementById(updateId);
   cl(getCard); 
  
   getCard.innerHTML = `
    
   <img src="${updatedObj.imgUrl}" alt="${updatedObj.title}" title="${updatedObj.title}">
   <figcaption>
     <div class="ratingsection">
        <div class="row">
           <div class="col-10">
              <h3>${updatedObj.title}</h3>
           </div>
           <div class="col-2">
              <span>${updatedObj.rating}</span>
           </div>
        </div>
     </div>
     <div class="overviewsection">
        <h4>${updatedObj.title} </h4>
        <em>Overview</em>
        <p>
        ${updatedObj.overview} 
        </p>
        <div class="action">
           <button class="btn btn-outline-info" onclick="onMovieEdit(this)">Edit</button>
           <button class="btn btn-outline-danger" onclick="onMovieDelete(this)">Delete</button>
        </div>
     </div>
  </figcaption>
   `;
   modalBackDropToggle();
   submitBtn.classList.remove("d-none");
   updatebtn.classList.add("d-none");
   movieForm.reset();
   Swal.fire({
         title:`Movie Information of ${updatedObj.title} is updated`,
         icon:"success",
         timer: 2500

   })
}

movieForm.addEventListener("submit", onMovieAdd)
updatebtn.addEventListener("click",onMovieUpdate)