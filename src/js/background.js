const suspend_url = chrome.runtime.getURL("suspended.html");
const generateQuery = (options) =>
  Object.keys(options)
    .reduce(
      (prev, curr) => [...prev, `${curr}=${encodeURIComponent(options[curr])}`],
      []
    )
    .join("&");

function suspendTab(tab) {
  if (!tab.url || tab.url.startsWith("chrome://")) {
    console.log("Cannot suspend! Tab is not a website or file");
  } else if (tab.url.startsWith(suspend_url)) {
    console.log("Cannot suspend! Tab already suspended");
  } else {
    const query = generateQuery({
      url: tab.url,
      favicon: tab.favIconUrl,
      title: tab.title,
      time: new Date().toLocaleString(),
    });
    chrome.tabs.update(tab.id, { url: `${suspend_url}?${query}` });
  }
}

chrome.contextMenus.create({
  id: "suspendTabAction",
  title: "Suspend Tab",
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("clicked", info, tab);
  if (info.menuItemId === "suspendTabAction") {
    suspendTab(tab);
  }
});
