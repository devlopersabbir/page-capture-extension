declare module "chrome-tab-capture" {
  export function captureVisibleTab(): Promise<{ dataUrl: string }>;
}
