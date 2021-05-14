const btn = document.getElementById("btn");

const btn1 = document.getElementById("btn1");

const user = document.getElementById("user");

const alluser = document.getElementById("users");
btn.addEventListener("click", () => {
  userLoad();
});

btn1.addEventListener("click", () => {
  loadUsers();
});
function userLoad() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "user.json", true);

  xhr.onload = function () {
    if (this.status == 200) {
      var req = JSON.parse(this.responseText);
      console.log(req);
      var output = "";

      output +=
        "<ul>" +
        "<li>" +
        req.id +
        "</li>" +
        "<li>" +
        req.name +
        "</li>" +
        "<li>" +
        req.email +
        "</li>" +
        "</ul>";

      user.innerHTML = output;
    }
  };
  xhr.send();
}
function loadUsers() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "users.json", true);

  xhr.onload = function () {
    if (this.status == 200) {
      var all = JSON.parse(this.responseText);
      var output = "";

      for (var i in all) {
        output +=
          "<ul>" +
          "<li>" +
          all[i].name +
          "</li>" +
          "<li>" +
          all[i].email +
          "</li>" +
          "<li>" +
          all[i].id +
          "</li>" +
          "</ul>";
      }
      alluser.innerHTML = output;
    }
  };
  xhr.send();
}
