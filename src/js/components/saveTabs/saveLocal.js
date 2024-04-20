import * as time from "../time.js";

export const getAllTabs = Promise.all([
  chrome.tabs.query({}).then((res) =>
    res.map(({ groupId, pinned, title, url, windowId }) => ({
      groupId,
      pinned,
      title,
      url,
      windowId,
    }))
  ),
  chrome.tabGroups.query({}).then((res) =>
    res.map(({ color, title, id, windowId }) => ({
      color,
      title,
      groupId: id,
      windowId,
    }))
  ),
]);

export const MAXINDEX = 100;

export const saveTabs = () => {
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
      getAllTabs.then(([tabs, groups]) => {
        console.log(tabs, groups);
        const tabData = JSON.stringify({ time: time.now(), tabs, groups });
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
      chrome.storage.local.set({ "saveTabs-lastSave": time.today() });
    });

  // chrome.storage.local.set({ "saveTabs-nextIndex": 10 });
  // chrome.storage.local.remove("saveTabs-nextIndex");
};
