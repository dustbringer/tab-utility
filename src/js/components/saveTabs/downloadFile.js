// alternative using data URIs: https://stackoverflow.com/questions/2897619/using-html5-javascript-to-generate-and-save-a-file

// Blob downlaod
export function downloadText(fileName, text, type = "") {
  // Setup link element
  const link = document.createElement("a");
  const blob = new Blob([text], { type: type });
  link.setAttribute("href", URL.createObjectURL(blob));
  link.setAttribute("download", fileName);

  // Create link, click it, delete link
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


      // downloadText("myFile.json", JSON.stringify({ tabs, groups }));