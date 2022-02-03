// https://stackoverflow.com/questions/39263292/how-does-the-great-suspender-work

const urlParams = new URLSearchParams(window.location.search);

const url_element = document.getElementById("url");
url_element.appendChild(document.createTextNode(urlParams.get("url")));

const icon_element = document.getElementById("icon");
icon_element.setAttribute("src", urlParams.get("favicon"));

const title_element = document.getElementById("title");
title_element.appendChild(document.createTextNode(urlParams.get("title")));
