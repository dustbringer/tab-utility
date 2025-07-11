import { formatTime } from "./components/time.js";

const urlParams = new URLSearchParams(window.location.search);

// Reload on space bar
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    window.location.href = urlParams.get("url");
  }
});

// Set text
const timeElement = document.getElementById("suspended-time");
const time = Date.parse(urlParams.get("time"));
timeElement.appendChild(document.createTextNode(formatTime(time)));

const iconElement = document.getElementById("icon");
iconElement.setAttribute("src", urlParams.get("favicon"));

const urlElement = document.getElementById("url");
urlElement.appendChild(document.createTextNode(urlParams.get("url")));
urlElement.href = urlParams.get("url");

const titleElement = document.getElementById("title");
titleElement.appendChild(document.createTextNode(urlParams.get("title")));
document.title = `[s] ${urlParams.get("title")}`;

const reload_button = document.getElementById("reload-button");
reload_button.href = urlParams.get("url");
// reload_button.addEventListener("click", () => {
//   console.log(urlParams.get("url"));
//   window.location.href = urlParams.get("url");
// });

// Set favicon
if (urlParams.get("favicon")) {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = urlParams.get("favicon");
}
