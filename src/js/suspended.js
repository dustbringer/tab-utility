// https://stackoverflow.com/questions/39263292/how-does-the-great-suspender-work

const urlParams = new URLSearchParams(window.location.search);

const timeElement = document.getElementById("suspended-time");
const time = moment(urlParams.get("time"));
timeElement.appendChild(
  document.createTextNode(time.format("Do MMMM YYYY, h:mm:ss a"))
);

const iconElement = document.getElementById("icon");
iconElement.setAttribute("src", urlParams.get("favicon"));

const urlElement = document.getElementById("url");
urlElement.appendChild(document.createTextNode(urlParams.get("url")));

const titleElement = document.getElementById("title");
titleElement.appendChild(document.createTextNode(urlParams.get("title")));

const reload_button = document.getElementById("reload-button");
reload_button.addEventListener("click", () => {
  console.log(urlParams.get("url"));
  window.location.href = urlParams.get("url");
});
