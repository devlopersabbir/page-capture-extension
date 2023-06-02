chrome.runtime.onMessage.addListener(
  async (request: any, sender: any, sendResponse: any) => {
    if (request.action === "cupturePage") {
      const { height, width }: any = await capturePageDimensions();
      sendResponse({ height, width });
    }
  }
);

const capturePageDimensions = () => {
  return new Promise((resolve) => {
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    const width = Math.max(
      body.scrollWidth,
      body.offsetWidth,
      html.clientWidth,
      html.scrollWidth,
      html.offsetWidth
    );

    resolve({ height, width });
  });
};
