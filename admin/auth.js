// async function login() {
//   const res = await fetch("http://localhost:5000/api/auth/login", {
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify({
//       email: email.value,
//       password: password.value
//     })
//   });

//   const data = await res.json();

//   if (data.token) {
//     localStorage.setItem("token", data.token);
//     location = "dashboard.html";
//   } else {
//     alert("Login failed");
//   }
// }

async function login() {

  const email =
    document.getElementById(
      "email"
    ).value;

  const password =
    document.getElementById(
      "password"
    ).value;


  try{

    const res = await fetch(

      "http://localhost:5000/api/auth/login",

      {

        method: "POST",

        headers: {

          "Content-Type":
          "application/json"

        },

        body: JSON.stringify({

          email,
          password

        })

      }

    );


    const data =
      await res.json();


    if (data.token) {

      localStorage.setItem(

        "token",

        data.token

      );

      window.location.href =
      "dashboard.html";

    }

    else {

      alert("Login Failed");

    }

  }

  catch(error){

    console.log(error);

    alert("Server Error");

  }

}