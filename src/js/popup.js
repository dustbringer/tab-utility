import suspendTab from "./components/suspend/suspendTab.js";
import { downloadText } from "./components/saveTabs/downloadFile.js";
import { getAllTabs } from "./components/saveTabs/saveLocal.js";
import * as time from "./components/time.js";

// Suspend
const suspendButtonElement = document.getElementById("button-suspend");
suspendButtonElement.addEventListener("click", () => {
  // get current tab and suspend it
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    suspendTab(activeTab);
  });
});

// Save tab info
const saveButtonElement = document.getElementById("button-save");
saveButtonElement.addEventListener("click", () => {
  getAllTabs().then((res) => {
    downloadText(
      `tabsExport_${new Date().getTime()}.json`,
      JSON.stringify({ date: time.now(), ...res }, null, 4),
      "application/json"
    );
  });
});
