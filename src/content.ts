console.log("content.ts");
// @ts-ignore
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("content.ts", request);
  if (request.message === "test") {
    console.log("content.ts", "test");
  }
});
