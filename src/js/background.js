// import information https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/basics
import suspendTab from "./components/suspend/suspendTab.js";
import { saveTabsBrowser } from "./components/saveTabs/saveTabs.js";
import * as time from "./components/time.js";

/************************* Listeners *************************/
// Startup
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get("saveTabs-lastSave").then((res) => {
    const lastSave = time.toDay(new Date(Date.parse(res["saveTabs-lastSave"])));
    console.log(
      `Tabs: Day of Last save = ${time.formatDate(
        lastSave
      )}, Now = ${time.formatTime(time.now())}, Difference = ${time.diffDays(
        lastSave,
        time.now()
      )}`
    );
    if (time.diffDays(lastSave, new Date()) >= 0.99) {
      saveTabsBrowser(); // Save if it has been almost a day
    }
  });
});

/*
Storage Notes
- use indexedDB or chrome.storage.local for storage
  - indexedDB is too complicated, using chrome.storage.local for now

chrome.storage.local
- To get all data, open service worker devtools and run `await chrome.storage.local.get()`
*/

// Context menu
chrome.runtime.onInstalled.addListener((details) => {
  chrome.contextMenus.create({
    id: "suspendTabAction",
    title: "Suspend Tab",
  });
  // chrome.contextMenus.create({
  //   id: "saveTabs",
  //   title: "Save Tabs to Browser",
  // });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("clicked", info, tab);
  if (info.menuItemId === "suspendTabAction") {
    suspendTab(tab);
  } else if (info.menuItemId === "saveTabs") {
    saveTabsBrowser();
  }
});
