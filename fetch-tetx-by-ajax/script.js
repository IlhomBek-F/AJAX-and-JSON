const btn = document.getElementById("btn");

const text = document.getElementById("text");

btn.addEventListener("click", () => {
  getText();
});

async function getText() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "example.txt", true);

  xhr.onload = function () {
    if (this.status == 200) {
      text.innerHTML = this.responseText;
    }
  };

  xhr.send();
}
