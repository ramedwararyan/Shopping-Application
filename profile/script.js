// Write your script here
 // Update Info
    document.getElementById("update-info-form").addEventListener("submit", function(e) {
      e.preventDefault();
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser) {
        alert("No user found. Please login.");
        return;
      }

      const newFirstName = document.getElementById("updateFirstName").value.trim();
      const newLastName = document.getElementById("updateLastName").value.trim();

      if (!newFirstName || !newLastName) {
        alert("Please fill out both fields.");
        return;
      }

      storedUser.firstName = newFirstName;
      storedUser.lastName = newLastName;

      localStorage.setItem("user", JSON.stringify(storedUser));
      alert("Info updated successfully!");
    });

    // Update Password
    document.getElementById("update-password-form").addEventListener("submit", function(e) {
      e.preventDefault();
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser) {
        alert("No user found. Please login.");
        return;
      }

      const oldPassword = document.getElementById("oldPassword").value;
      const newPassword = document.getElementById("newPassword").value;
      const confirmNewPassword = document.getElementById("confirmNewPassword").value;

      if (oldPassword !== storedUser.password) {
        alert("Old password is incorrect.");
        return;
      }

      if (newPassword !== confirmNewPassword) {
        alert("New passwords do not match.");
        return;
      }

      storedUser.password = newPassword;
      localStorage.setItem("user", JSON.stringify(storedUser));
      alert("Password updated successfully!");
    });

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", function() {
      alert("You have been logged out.");
      window.location.href = "../authentication/login.html";
    });