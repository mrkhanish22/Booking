<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDly7uSgM4rvPyb8WRn9-8u-cO-qjmFv60",
    authDomain: "booking-web-7aa07.firebaseapp.com",
    projectId: "booking-web-7aa07",
    storageBucket: "booking-web-7aa07.appspot.com",
    messagingSenderId: "394770573533",
    appId: "1:394770573533:web:7f035042f7b62280481334",
    measurementId: "G-MQLBEJ1559",
    databaseURL: "https://booking-web-7aa07-default-rtdb.firebaseio.com"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const place = urlParams.get('place');

    const locationGroup = document.getElementById("locationGroup");
    const locationSelect = document.getElementById("location");

    if (!place) {
      alert("No place selected! Please go back and choose a location.");
      return;
    }

    // Show specific options based on place
    if (place === "Auditorium") {
      locationGroup.style.display = "block";
      locationSelect.innerHTML = `
        <option value="">-- Select Auditorium --</option>
        <option value="GP Nexus Auditorium">GP Nexus Auditorium</option>
        <option value="PG Seminar Hall">PG Seminar Hall</option>
        <option value="Scholar Seminar Hall">Scholar Seminar Hall</option>
      `;
    } else if (place === "Badminton Court") {
      locationGroup.style.display = "block";
      locationSelect.innerHTML = `
        <option value="">-- Select Court --</option>
        <option value="Court 1">Court 1</option>
        <option value="Court 2">Court 2</option>
      `;
    } else {
      locationGroup.style.display = "none"; // No dropdown needed
    }

    document.getElementById("bookingForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
      const selectedLocation = (place === "Cricket Field") ? "Cricket Field" : locationSelect.value;

      if (!selectedLocation) {
        alert("❗ Please select a valid location.");
        return;
      }

      const bookingData = {
        place: selectedLocation,
        date: date,
        time: time,
        timestamp: new Date().toISOString()
      };

      push(ref(db, "bookings"), bookingData)
        .then(() => {
          // Booking successful
          document.getElementById("bookingForm").style.display = "none";
          document.getElementById("successMessage").style.display = "block";
          document.getElementById("successText").innerText =
            `✅ Your booking for ${selectedLocation} on ${date} at ${time} is successful.`;
        })
        .catch(error => {
          alert("❌ Booking failed: " + error.message);
        });
    });
  };
</script>
