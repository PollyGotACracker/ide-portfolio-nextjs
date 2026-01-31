declare global {
    interface Navigator {
        userAgentData?: {
            platform: string;
        };
    }
}

export function checkWindows() {
    if (navigator.userAgentData?.platform) {
        return navigator.userAgentData.platform === 'Windows';
    }
    return navigator.userAgent.includes('Windows');
}