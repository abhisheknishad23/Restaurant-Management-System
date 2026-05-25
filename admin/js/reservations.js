async function loadReservations() {

  const res = await fetch(
    "http://localhost:5000/api/reservations"
  );

  const data = await res.json();

  document.getElementById("reservationTable").innerHTML =
    data.map(r => `

      <tr>
        <td>${r.booking_id}</td>

        <td>${r.name}</td>

        <td>${r.phone}</td>

        <td>${r.reservation_date}</td>

        <td>${r.reservation_time}</td>

        <td>${r.persons}</td>

        <td>
          <span class="status ${r.status.toLowerCase()}">
            ${r.status}
          </span>
        </td>

        <td>

          <button
            class="btn btn-confirm"
            onclick="confirmReservation(${r.id})"
          >
            Confirm
          </button>

          <button
            class="btn btn-cancel"
            onclick="cancelReservation(${r.id})"
          >
            Cancel
          </button>

          <button
            class="btn btn-delete"
            onclick="deleteReservation(${r.id})"
          >
            Delete
          </button>

        </td>

      </tr>

    `).join("");

}


/* CONFIRM */
async function confirmReservation(id){

  await fetch(
    `http://localhost:5000/api/reservations/confirm/${id}`,
    {
      method:"PUT"
    }
  );

  loadReservations();

}


/* CANCEL */
async function cancelReservation(id){

  await fetch(
    `http://localhost:5000/api/reservations/cancel/${id}`,
    {
      method:"PUT"
    }
  );

  loadReservations();

}


/* DELETE */
async function deleteReservation(id){

  await fetch(
    `http://localhost:5000/api/reservations/${id}`,
    {
      method:"DELETE"
    }
  );

  loadReservations();

}


loadReservations();