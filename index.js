const title = document.getElementById("title");
const nameField = document.getElementById("nameField");
const toggleBtn = document.getElementById("toggleBtn");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("authForm");
const errorMsg = document.getElementById("errorMsg");

let isLogin = true;

// Toggle between Login and Sign Up
toggleBtn.addEventListener("click", () => {
  isLogin = !isLogin;
  if (isLogin) {
    title.textContent = "Login";
    nameField.style.display = "none";
    submitBtn.textContent = "Login";
    toggleBtn.textContent = "Sign Up";
  } else {
    title.textContent = "Sign Up";
    nameField.style.display = "block";
    submitBtn.textContent = "Sign Up";
    toggleBtn.textContent = "Login";
  }
  errorMsg.textContent = "";
});

// Handle form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password || (!isLogin && !name)) {
    errorMsg.textContent = "Please fill in all fields.";
    return;
  }

  // Save data in localStorage
  if (!isLogin) {
    localStorage.setItem("name", name);
  }
  localStorage.setItem("email", email);

  // Redirect to home page
  window.location.href = "home.html";
});
