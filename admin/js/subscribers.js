async function loadSubscribers(){

  const response = await fetch(
    "http://localhost:5000/api/subscribe"
  );

  const data = await response.json();

  const subscriberList =
    document.getElementById(
      "subscriberList"
    );

  subscriberList.innerHTML = "";


  data.forEach(sub => {

    subscriberList.innerHTML += `

      <div class="menu-card">

        <div class="menu-content">

          <h3>${sub.email}</h3>

          <p>${sub.created_at}</p>

          <button
            class="delete-btn"
            onclick="deleteSubscriber(${sub.id})"
          >
            Delete
          </button>

        </div>

      </div>

    `;

  });

}



async function deleteSubscriber(id){

  await fetch(

    `http://localhost:5000/api/subscribe/${id}`,

    {
      method:"DELETE"
    }

  );

  loadSubscribers();

}


loadSubscribers();