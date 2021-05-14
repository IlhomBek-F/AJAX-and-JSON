const btn = document.getElementById("btn");

const user = document.getElementById("users");

btn.addEventListener("click", () => {
  getUser();
});

function getUser() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://api.github.com/users", true);

  xhr.onload = function () {
    if (this.status == 200) {
      var data = this.responseText;
      loadUser(data);
    }
  };

  xhr.send();
}

function loadUser(data) {
  var request = JSON.parse(data);
  console.log(request);
  var output = "";
  for (var i in request) {
    output +=
      '<div class="user"> ' +
      '<img src="' +
      request[i].avatar_url +
      '" width="70" height="70"/>' +
      "<ul>" +
      "<li>" +
      request[i].login +
      "</li>" +
      "</ul>" +
      "</div>";
  }
  console.log(output);
  user.innerHTML = output;
}
