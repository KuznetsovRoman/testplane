import path from "path";
import fs from "fs";
import _ from "lodash";
import { installBrowser } from "../browser-installer";
import { getRegistryPath } from "../browser-installer/utils";
import type { BrowserWithVersion } from "./utils";

type BinaryNameWithArchPrefix = string;
type BinaryVersion = string;
type BinaryPath = string;

type Registry = Record<BinaryNameWithArchPrefix, Record<BinaryVersion, BinaryPath>>;

const getRegistryBinaryPaths = (registry: Registry): string[] => {
    const versionToPathMap = Object.values(registry);
    const binaryPaths = _.flatMap(versionToPathMap, Object.values);
    const registryPath = getRegistryPath();

    return binaryPaths.map(relativePath => path.resolve(registryPath, relativePath));
};

/** @returns array of binary absolute paths */
export const downloadBrowserVersions = async (browsers: BrowserWithVersion[]): Promise<string[]> => {
    const registryPath = getRegistryPath();

    const installBinaries = ({ browserName, browserVersion }: BrowserWithVersion): Promise<string | null> =>
        installBrowser(browserName, browserVersion, {
            shouldInstallWebDriver: true,
            shouldInstallUbuntuPackages: false,
        });

    await Promise.all(browsers.map(installBinaries));

    const registryJson = await fs.promises.readFile(registryPath, { encoding: "utf8" });
    const registry = JSON.parse(registryJson);

    return getRegistryBinaryPaths(registry);
};
