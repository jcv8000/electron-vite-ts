/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
    appId: "io.github.yourname.appname",
    productName: "App Name",
    buildVersion: "1.0.0",
    files: ["out", "build"],
    mac: {
        target: "dmg",
        icon: "./build/icon.icns",
        category: "public.app-category.productivity"
    },
    win: {
        target: ["nsis", "zip"],
        icon: "./build/icon.png"
    },
    nsis: {
        oneClick: false,
        allowToChangeInstallationDirectory: true,
        shortcutName: "My App"
    },
    linux: {
        target: ["deb", "tar.xz"],
        icon: "./build/icon.icns",
        vendor: "Your Name",
        category: "Education",
        executableName: "AppName",
        description: "Description",
        synopsis: "Synopsis"
    }
};

module.exports = config;
