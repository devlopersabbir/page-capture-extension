chrome.action.onClicked.addListener(async (tab: any) => {
  try {
    await capturePageDimension(tab?.id);

    // console.log("Full-page screenshot captured:", fullPageScreenshotData);

    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Screenshot Finished",
      message: `Captured dimensions: `,
    });
    // for taken a screnshot
    chrome.tabs.captureVisibleTab({ format: "png" }, (screenshotURL) => {
      console.log("url got it", screenshotURL);
    });
  } catch (error) {
    console.log("error...", error);
  }

  // send a notification to make sure screenshot is created
});

const capturePageDimension = (tabId: number) => {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, { action: "cupturePage" }, (response) => {
      console.log(response);
    });
  });
};
