import suspendTab from "./components/suspend/suspendTab.js";
import {
  saveTabsBrowser,
  saveTabsDownload,
} from "./components/saveTabs/saveTabs.js";

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

// Save tab info to file
const saveToFileButtonElement = document.getElementById("button-save-to-file");
saveToFileButtonElement.addEventListener("click", () => {
  saveTabsDownload();
});
