declare module "chrome-tab-capture" {
  export function captureVisibleTab(): Promise<{ dataUrl: string }>;
}

import ReactDOMServer from "react-dom/server";
import { captureVisibleTab } from "chrome-tab-capture";

chrome.action.onClicked.addListener(async () => {
  console.log(captureVisibleTab);
});
