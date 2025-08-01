// Keypad button click handler
const inputField = document.getElementById("pin");
if (inputField) {
  document
    .querySelectorAll(".key:not(.enter)")
    .forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent any form submission / reload
        const value = this.dataset.value;
        if (value === "clear") {
          inputField.value = "";
        } else if (value === "backspace") {
          inputField.value = inputField.value.slice(0, -1);
        } else {
          inputField.value += value;
        }
      });
    });
}

// Login function call by login button
function loginPOS() {
  const pwd = $("#pin").val();
  $("#error-message").text("");

  if (!pwd) {
    $("#error-message").text(
      "Please enter your PIN."
    );
    return;
  }

  $.ajax({
    url: "http://192.168.0.222/api/method/dc_pos.api.login.pos_login_with_pin",
    type: "POST",
    xhrFields: {
      withCredentials: true, // <-- this is critical
    },
data:{pin:pwd},
    success: function (data) {
	    console.log(data);
	    window.location.href="app/point-of-sale";
    },
    error: function (err) {
	    console.log(err);
	    $("#error-message").text(
		    "Invald login. Please try again."
	    )}})};
