import suspendTab from "./components/suspend/suspendTab.js";
import {
  getLastSave,
  saveTabsBrowser,
  saveTabsDownload,
} from "./components/saveTabs/saveTabs.js";
import { formatTime } from "./components/time.js";

// Suspend
const suspendButtonElement = document.getElementById("button-suspend");
suspendButtonElement.addEventListener("click", () => {
  // get current tab and suspend it
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    suspendTab(activeTab);
  });
});

// Save tab info to browser
const saveToBrowserButtonElement = document.getElementById(
  "button-save-to-browser"
);
saveToBrowserButtonElement.addEventListener("click", () => {
  saveTabsBrowser();
});

// display last saved

const lastSavedSpanElement = document.getElementById("last-saved");
getLastSave().then((res) => {
  const text = res !== undefined ? formatTime(new Date(Date.parse(res))) : "None"
  lastSavedSpanElement.appendChild(document.createTextNode(text));
});

// Save tab info to file
const saveToFileButtonElement = document.getElementById("button-save-to-file");
saveToFileButtonElement.addEventListener("click", () => {
  saveTabsDownload();
});
