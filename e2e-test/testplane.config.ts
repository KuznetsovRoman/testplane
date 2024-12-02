import fs from "fs";

const mkFirefox = (browserVersion: string): Record<string, unknown> => ({
    desiredCapabilities: {
        browserName: "firefox",
        browserVersion,
    },
});

const osVersion = fs.readFileSync("/etc/os-release", "utf8");

const ubuntuMilestone = Number((/VERSION_ID="(\d\d)/.exec(osVersion) as string[])[1]);

const firefoxBrowsers = [
    "firefox133",
    "firefox130",
    "firefox129",
    "firefox128",
    "firefox127",
    "firefox126",
];

if (ubuntuMilestone <= 22) {
    firefoxBrowsers.push(
        "firefox120",
        "firefox110",
        "firefox100",
        "firefox99",
        "firefox98",
        "firefox97",
        "firefox96",
        "firefox95",
        "firefox94",
        "firefox93",
        "firefox92",
        "firefox91",
    );
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
        firefox: {
            files: ["testplane-tests/**/*.testplane.(t|j)s"],
            browsers: firefoxBrowsers,
        },
    },
    browsers: {
        firefox60: mkFirefox("60.0"),
        firefox70: mkFirefox("70.0"),
        firefox80: mkFirefox("80.0"),
        firefox90: mkFirefox("90.0"),
        firefox91: mkFirefox("91.0"),
        firefox92: mkFirefox("92.0"),
        firefox93: mkFirefox("93.0"),
        firefox94: mkFirefox("94.0"),
        firefox95: mkFirefox("95.0"),
        firefox96: mkFirefox("96.0"),
        firefox97: mkFirefox("97.0"),
        firefox98: mkFirefox("98.0"),
        firefox99: mkFirefox("99.0"),
        firefox100: mkFirefox("100.0"),
        firefox110: mkFirefox("110.0"),
        firefox120: mkFirefox("120.0"),
        firefox126: mkFirefox("126.0"),
        firefox127: mkFirefox("127.0"),
        firefox128: mkFirefox("128.0"),
        firefox129: mkFirefox("129.0"),
        firefox130: mkFirefox("130.0"),
        firefox133: mkFirefox("133.0"),
    },
};
