$(document).ready(function() {
  // Getting references to our form and input
  var registerForm = $("#registerForm");
  var firstNameInput = $("#firstName");
  var lastNameInput = $("#lastName");
  var emailInput = $("#email");
  var passwordInput = $("#password");
  var contactInput = $("#contact")

  // When the register button is clicked, we validate the email and password are not blank
  registerForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      contact: contactInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the registerUser function
    registerUser(userData.firstName, userData.lastName, userData.email, userData.password, userData.contact);
    firstNameInput.val("");
    lastNameInput.val("");
    emailInput.val("");
    passwordInput.val("");
    contactInput.val("");
  });

  // Does a post to the register route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function registerUser(firstName, lastName, email, password, contact) {
    $.post("/api/register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      contact: contact
    })
      .then(function(data) {
        window.location.replace("/login");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
