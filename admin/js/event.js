/* ADD EVENT */
async function addEvent(){

  const title = document.getElementById("title").value;

  const description = document.getElementById("description").value;

  const event_date = document.getElementById("event_date").value;

  const image = document.getElementById("image").files[0];

  const formData = new FormData();

  formData.append("title", title);

  formData.append("description", description);

  formData.append("event_date", event_date);

  formData.append("image", image);


  try{

    const response = await fetch(

      "http://localhost:5000/api/events",

      {
        method:"POST",
        body:formData
      }

    );

    if(response.ok){

      alert("Event Added");

      loadEvents();

    }

  }

  catch(error){

    console.log(error);

  }

}



/* LOAD EVENTS */
async function loadEvents(){

  const response = await fetch(
    "http://localhost:5000/api/events"
  );

  const data = await response.json();

  const eventList =
    document.getElementById("eventList");

  eventList.innerHTML = "";


  data.forEach(event => {

    eventList.innerHTML += `

      <div class="menu-card">

        <img
          src="http://localhost:5000/uploads/${event.image}"
          class="menu-image"
        >

        <div class="menu-content">

          <h3>${event.title}</h3>

          <p>${event.description}</p>

          <h4>${event.event_date}</h4>

          <button
            class="delete-btn"
            onclick="deleteEvent(${event.id})"
          >
            Delete
          </button>

        </div>

      </div>

    `;

  });

}



/* DELETE EVENT */
async function deleteEvent(id){

  const confirmDelete =
    confirm("Delete Event?");

  if(!confirmDelete) return;

  await fetch(

    `http://localhost:5000/api/events/${id}`,

    {
      method:"DELETE"
    }

  );

  loadEvents();

}


loadEvents();