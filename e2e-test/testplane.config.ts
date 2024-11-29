import fs from "fs";

const mkChrome = (browserVersion: string): Record<string, unknown> => ({
    desiredCapabilities: {
        browserName: "chrome",
        browserVersion,
        "goog:chromeOptions": { args: ["--no-sandbox"] },
    },
});

const mkFirefox = (browserVersion: string): Record<string, unknown> => ({
    desiredCapabilities: {
        browserName: "firefox",
        browserVersion,
    },
});

const osVersion = fs.readFileSync("/etc/os-release", "utf8");

const ubuntuMilestone = Number((/VERSION_ID="(\d\d)/.exec(osVersion) as string[])[1]);

const firefoxBrowsers = ["firefox133", "firefox130"];

if (ubuntuMilestone <= 22) {
    firefoxBrowsers.push("firefox120", "firefox110", "firefox100");
}

if (ubuntuMilestone <= 20) {
    firefoxBrowsers.push("firefox90", "firefox80", "firefox70", "firefox60");
}

export default {
    gridUrl: "local",
    baseUrl: "http://localhost",
    pageLoadTimeout: 0,
    httpTimeout: 60000,
    testTimeout: 90000,
    resetCursor: false,
    automationProtocol: "webdriver",
    headless: true,
    system: {
        parallelLimit: 1,
    },
    sets: {
        chrome: {
            files: ["testplane-tests/**/*.testplane.(t|j)s"],
            browsers: ["chrome75", "chrome80", "chrome90", "chrome100", "chrome110", "chrome120", "chrome130"],
        },
        firefox: {
            files: ["testplane-tests/**/*.testplane.(t|j)s"],
            browsers: firefoxBrowsers,
        },
    },
    browsers: {
        chrome75: mkChrome("75.0"),
        chrome80: mkChrome("80.0"),
        chrome90: mkChrome("90.0"),
        chrome100: mkChrome("100.0"),
        chrome110: mkChrome("110.0"),
        chrome120: mkChrome("120.0"),
        chrome130: mkChrome("130.0"),
        firefox60: mkFirefox("60.0"),
        firefox70: mkFirefox("70.0"),
        firefox80: mkFirefox("80.0"),
        firefox90: mkFirefox("90.0"),
        firefox100: mkFirefox("100.0"),
        firefox110: mkFirefox("110.0"),
        firefox120: mkFirefox("120.0"),
        firefox130: mkFirefox("130.0"),
        firefox133: mkFirefox("133.0"),
    },
};
