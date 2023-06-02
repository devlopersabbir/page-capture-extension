chrome.runtime.onMessage.addListener(
  async (request: any, sender: any, sendResponse: any) => {
    if (request.action === "cupturePage") {
      try {
        const pageDimension = await capturePageDimensions();
        sendResponse(pageDimension);
      } catch (error) {
        console.log("Error is eccurd!", error);
        sendResponse(null);
      }
    }
  }
);

const capturePageDimensions = async () => {
  const { scrollHeight, clientHeight } = document.documentElement;
  let height = scrollHeight;
  let currentScroll: number = 0;
  let cuptureHeight = clientHeight;

  while (currentScroll + cuptureHeight < height) {
    window.scrollTo(0, currentScroll + cuptureHeight);
    await wait(200); // Adjust the delay between scrolls if needed
    currentScroll += cuptureHeight;

    height = document.documentElement.scrollHeight;

    cuptureHeight = Math.min(clientHeight, height - cuptureHeight);
  }
  return { height, width: document.documentElement.clientWidth };
  // return new Promise((resolve) => {
  //   const body = document.body;
  //   const html = document.documentElement;
  //   const height = Math.max(
  //     body.scrollHeight,
  //     body.offsetHeight,
  //     html.clientHeight,
  //     html.scrollHeight,
  //     html.offsetHeight
  //   );
  //   const width = Math.max(
  //     body.scrollWidth,
  //     body.offsetWidth,
  //     html.clientWidth,
  //     html.scrollWidth,
  //     html.offsetWidth
  //   );
  //   resolve({ height, width });
  // });
};

const wait = (milisecond: number) => {
  return new Promise((resolve) => setTimeout(resolve, milisecond));
};
