document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginBtn").addEventListener("click", () => {
    window.location.href = "../authentication/login.html";
  });
  document.getElementById("signupBtn").addEventListener("click", () => {
    window.location.href = "../authentication/register.html";
  });
});
