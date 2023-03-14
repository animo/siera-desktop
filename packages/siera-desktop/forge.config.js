/* eslint-disable @typescript-eslint/no-var-requires */

const { execSync } = require('child_process')

/* eslint-enable @typescript-eslint/no-var-requires */

/* eslint-disable no-console */

const nodeEnv = process.env.NODE_ENV
const isProd = nodeEnv === 'production'

module.exports = {
  packagerConfig: {
    name: 'Siera Desktop',
    executableName: 'siera-desktop',
    appBundleId: 'id.animo.siera.desktop',
    icon: './icons/icon',
    osxSign: isProd && {
      identity: 'Developer ID Application: Animo Solutions (G9667JTP83)',
      hardenedRuntime: true,
      entitlements: 'entitlements.mac.plist',
      entitlementsInherit: 'entitlements.mac.plist',
      gatekeeperAssess: false,
    },
    osxNotarize: isProd && {
      appBundleId: 'id.animo.siera.desktop',
      tool: 'notarytool',
      appleApiKey: process.env.APPLE_API_KEY_PATH,
      appleApiKeyId: process.env.APPLE_API_KEY_ID,
      appleApiIssuer: process.env.APPLE_API_ISSUER,
    },
  },
  hooks: {
    packageAfterCopy: async (config, buildPath, electronVersion, platform) => {
      if (platform === 'darwin') {
        const packageRootpath = `${buildPath}/../..`

        console.log(
          execSync(
            `dylibbundler -ns -od -b -x "${packageRootpath}/Resources/app/.webpack/renderer/main_window/native_modules/build/Release/indynodejs.node" -d "${packageRootpath}/Libs/LibIndy/" -p @rpath/../Libs/LibIndy/`
          ).toString()
        )
      }
    },
  },
  electronRebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'Siera Desktop',
        icon: './icons/icon.ico',
        setupIcon: './icons/icon.ico',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: {
        icon: './icons/icon.icns',
      },
    },
    {
      name: '@reforged/maker-appimage',
      config: {
        options: {
          icon: './icons/icon.png',
          categories: ['Utility'],
          bin: 'siera-desktop',
          name: 'Siera Desktop',
          AppImageKitRelease: 'continuous',
        },
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        devServer: {
          liveReload: false,
          hot: true,
        },
        devContentSecurityPolicy: `default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data: https://plausible.io/js/plausible.js; connect-src * wss: ws:; img-src * https:; style-src-elem 'self' 'unsafe-inline' data: https://fonts.googleapis.com https://plausible.io/js/plausible.js; style-src * https:; font-src 'self' https://fonts.gstatic.com;`,
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './public/index.html',
              js: './src/renderer.ts',
              name: 'main_window',
              preload: {
                js: './src/preload.js',
              },
            },
          ],
        },
      },
    },
  ],
}
