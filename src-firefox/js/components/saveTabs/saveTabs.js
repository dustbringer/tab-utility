import * as time from "../time.js";
import { downloadText } from "./downloadFile.js";

export const getAllTabs = () =>
  Promise.all([
    chrome.tabs.query({}).then((res) =>
      res
      // res.map(({ groupId, pinned, title, url, windowId }) => ({
      //   groupId,
      //   pinned,
      //   title,
      //   url,
      //   windowId,
      // }))
    ),
    chrome.tabGroups.query({}).then((res) =>
      res
      // res.map(({ color, title, id, windowId }) => ({
      //   color,
      //   title,
      //   groupId: id,
      //   windowId,
      // }))
    ),
  ]).then(([tabs, groups]) => ({ tabs: tabs, groups: groups }));

export const getLastSave = () =>
  chrome.storage.local
    .get("saveTabs-lastSave")
    .then((res) => res["saveTabs-lastSave"]);

export const MAXINDEX = 100;

export const saveTabsBrowser = () => {
  // Get the next index to save to
  chrome.storage.local
    .get("saveTabs-nextIndex")
    .then((res) => {
      if (Object.hasOwn(res, "saveTabs-nextIndex")) {
        return res["saveTabs-nextIndex"];
      } else {
        return 0;
      }
    })
    .then((nextIndex) => {
      // Save tabs to index
      getAllTabs().then((res) => {
        console.log(res);
        const tabData = JSON.stringify({ time: time.nowISO(), ...res });
        chrome.storage.local
          .set({ [`saveTabs-index-${nextIndex}`]: tabData })
          .then(() => {
            console.log(`Tabs saved to index ${nextIndex}`);
          });
      });

      // Update the next index
      chrome.storage.local.set({
        "saveTabs-nextIndex": (nextIndex + 1) % MAXINDEX,
      });

      // Update metadata
      chrome.storage.local.set({ "saveTabs-lastSave": time.nowISO() });
    });

  // chrome.storage.local.set({ "saveTabs-nextIndex": 10 });
  // chrome.storage.local.remove("saveTabs-nextIndex");

  // // Get all local storage
  // chrome.storage.local.get().then(res => console.log(res))
};

export const saveTabsDownload = () =>
  getAllTabs().then((res) => {
    downloadText(
      `tabsExport_${new Date().getTime()}.json`,
      JSON.stringify({ time: time.nowISO(), ...res }, null, 4),
      "application/json"
    );
  });
