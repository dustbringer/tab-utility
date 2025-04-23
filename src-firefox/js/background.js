// import information https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/basics
import suspendTab from "./components/suspend/suspendTab.js";
import {
  saveTabsBrowser,
  getLastSave,
} from "./components/saveTabs/saveTabs.js";
import * as time from "./components/time.js";

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function doTimedSave() {
  return getLastSave().then((res) => {
    const lastSave = time.toDay(new Date(Date.parse(res)));
    console.log(
      `Tabs: Day of Last save = ${
        res !== undefined ? time.formatDate(lastSave) : "None"
      }, Now = ${time.formatTime(time.now())}, Difference = ${time.diffDays(
        lastSave,
        time.now()
      )}`
    );
    if (res === undefined || time.diffDays(lastSave, new Date()) >= 0.99) {
      saveTabsBrowser(); // Save if it has been almost a day
    }
  });
}

/************************* Listeners *************************/
// Startup
chrome.runtime.onStartup.addListener(() => {
  doTimedSave();
});

// Keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  if (command === "suspend-tab") {
    getCurrentTab().then((tab) => suspendTab(tab));
  }
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

  doTimedSave();
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("clicked", info, tab);
  if (info.menuItemId === "suspendTabAction") {
    suspendTab(tab);
  } else if (info.menuItemId === "saveTabs") {
    saveTabsBrowser();
  }
});
