

/* LOAD REVIEWS */
async function loadReviews(){

  try{

    const response = await fetch(
      "http://localhost:5000/api/reviews"
    );

    const data = await response.json();

    const reviewList =
      document.getElementById(
        "reviewList"
      );

    reviewList.innerHTML = "";


    data.forEach(review => {

      reviewList.innerHTML += `

        <div class="menu-card">

          <img
            src="http://localhost:5000/uploads/${review.image}"
            class="menu-image"
          >

          <div class="menu-content">

            <h3>${review.name}</h3>

            <p>${review.profession}</p>

            <h4>${review.rating} ⭐</h4>

            <p>${review.message}</p>

            <p>
              Status:
              <b>${review.status}</b>
            </p>

            <div class="review-buttons">

              ${
                review.status === "pending"

                ?

                `<button
                  class="approve-btn"
                  onclick="approveReview(${review.id})"
                >
                  Approve
                </button>`

                :

                ""

              }

              <button
                class="delete-btn"
                onclick="deleteReview(${review.id})"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      `;

    });

  }

  catch(error){

    console.log(error);

  }

}



/* APPROVE REVIEW */
async function approveReview(id){

  await fetch(

    `http://localhost:5000/api/reviews/approve/${id}`,

    {
      method:"PUT"
    }

  );

  loadReviews();

}



/* DELETE REVIEW */
async function deleteReview(id){

  const confirmDelete =
    confirm("Delete Review?");

  if(!confirmDelete) return;

  await fetch(

    `http://localhost:5000/api/reviews/${id}`,

    {
      method:"DELETE"
    }

  );

  loadReviews();

}



/* PAGE LOAD */
window.onload = () => {

  loadReviews();

};

