// async function addMenu() {
//   const formData = new FormData();

//   formData.append("name", name.value);
//   formData.append("description", desc.value);
//   formData.append("price", price.value);
//   formData.append("image", image.files[0]);

//   await fetch("http://localhost:5000/api/menu", {
//     method: "POST",
//     body: formData
//   });

//   alert("Menu Added");
// }

async function addMenu() {
 
  const foodName = document.getElementById("name").value;
  const foodDesc = document.getElementById("description").value;
  const foodPrice = document.getElementById("price").value;
  const foodCategory = document.getElementById("category").value;
  const foodImage = document.getElementById("image").files[0];

  const formData = new FormData();         
  formData.append("name", foodName); 
  formData.append("description", foodDesc);
  formData.append("price", foodPrice);
  formData.append("category", foodCategory);
  formData.append("image", foodImage);

  try {
    const response = await fetch("http://localhost:5000/api/menu", {
      method: "POST",
      body: formData
    });
    
    if(response.ok) {
      alert("Menu Added Successfully!");
      location.reload(); 
    }
  } catch (error) {
    console.error("Error adding menu:", error);
  }
}

/* LOAD MENU */
async function loadMenu() {

  try {

    const response = await fetch(
      "http://localhost:5000/api/menu"
    );

    const data = await response.json();

    const menuList =
      document.getElementById("menuList");

    menuList.innerHTML = "";

    data.forEach(item => {

      menuList.innerHTML += `

        <div class="menu-card">

          <img
            src="http://localhost:5000/uploads/${item.image}"
            class="menu-image"
          >

          <div class="menu-content">

            <h3>${item.name}</h3>

            <p>${item.description}</p>

            <h4>₹${item.price}</h4>

            <span>${item.category}</span>

            <button
              class="delete-btn"
              onclick="deleteMenu(${item.id})"
            >
              Delete
            </button>

          </div>

        </div>

      `;

    });

  }

  catch (error) {

    console.log(error);

  }

}



/* DELETE MENU */
async function deleteMenu(id) {

  const confirmDelete =
    confirm("Delete this menu item?");

  if (!confirmDelete) return;

  try {

    await fetch(

      `http://localhost:5000/api/menu/${id}`,

      {
        method: "DELETE"
      }

    );

    alert("Menu Deleted");

    loadMenu();

  }

  catch (error) {

    console.log(error);

  }

}

loadMenu();