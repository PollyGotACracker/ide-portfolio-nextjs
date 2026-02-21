declare global {
  interface Navigator {
    userAgentData?: {
      platform: string;
    };
  }
}

export function checkWindows() {
  if (typeof window !== "undefined") {
    if (navigator.userAgentData?.platform) {
      return navigator.userAgentData.platform === "Windows";
    }
    return navigator.userAgent.includes("Windows");
  }
}
