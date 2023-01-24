/* eslint-disable @typescript-eslint/no-var-requires */

const { execSync } = require('child_process')

/* eslint-enable @typescript-eslint/no-var-requires */

/* eslint-disable no-console */

const nodeenv = process.env.NODE_ENV
const isProd = nodeenv === 'production'

module.exports = {
  packagerConfig: {
    name: 'SieraDesktop',
    executableName: 'siera-desktop',
    appBundleId: 'id.animo.siera.ui',
    osxSign: isProd && {
      identity: 'Developer ID Application: Animo Solutions (G9667JTP83)',
      hardenedRuntime: true,
      entitlements: 'entitlements.mac.plist',
      entitlementsInherit: 'entitlements.mac.plist',
      gatekeeperAssess: false,
    },
    osxNotarize: isProd && {
      appBundleId: 'id.animo.siera.ui',
      tool: 'notarytool',
      appleApiKey: process.env.SIERA_APPLE_API_KEY_PATH,
      appleApiKeyId: process.env.SIERA_APPLE_API_KEY_ID,
      appleApiIssuer: process.env.SIERA_APPLE_API_ISSUER,
    },
  },
  hooks: {
    packageAfterCopy: async (config, buildPath, electronVersion, platform, arch) => {
      if (platform === 'darwin') {
        const rootpath = `${buildPath}/../..`

        console.log(execSync(`ls -la ${rootpath}`).toString())

        const libindyPath = `${__dirname}/../../libs/libindy.${arch}.dylib`

        console.log(execSync(`ls -la ${libindyPath}`).toString())

        // console.log(
        //   execSync(
        //     `install_name_tool -change /usr/local/opt/libindy/lib/libindy.dylib /usr/local/lib/libindy.dylib ${rootpath}/Resources/app/.webpack/renderer/main_window/native_modules/build/Release/indynodejs.node`
        //   ).toString()
        // )

        console.log(
          execSync(
            `install_name_tool -change /usr/local/opt/libindy/lib/libindy.dylib /usr/local/lib/libindy.dylib ${rootpath}/Resources/app/.webpack/renderer/main_window/native_modules/build/Release/indynodejs.node`
          ).toString()
        )

        // console.log(
        //   execSync(
        //     `install_name_tool -change /private/tmp/indy-sdk/libindy/target/release/deps/libindy.dylib /usr/local/lib/libindy.dylib ${rootpath}/Resources/app/.webpack/renderer/main_window/native_modules/build/Release/indynodejs.node`
        //   ).toString()
        // )

        // console.log(
        //   execSync(
        //     `install_name_tool -change /Users/beri/developer/work/hyperledger/indy-sdk/libindy/target/release/deps/libindy.dylib /usr/local/lib/libindy.dylib ${rootpath}/Resources/app/.webpack/renderer/main_window/native_modules/build/Release/indynodejs.node`
        //   ).toString()
        // )

        console.log(
          execSync(
            `dylibbundler -ns -od -b -x ${rootpath}/Resources/app/.webpack/renderer/main_window/native_modules/build/Release/indynodejs.node -d ${rootpath}/Frameworks/LibIndy/ -p @rpath/LibIndy/`
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
        name: 'toolbox-electron',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          bin: 'toolbox-electron',
        },
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          bin: 'toolbox-electron',
        },
      },
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        devServer: {
          liveReload: false,
          hot: true,
        },
        devContentSecurityPolicy: `default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:; connect-src * wss: ws:; img-src * https:; style-src-elem 'self' 'unsafe-inline' data: https://fonts.googleapis.com; style-src * https:; font-src 'self' https://fonts.gstatic.com;`,
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
    ],
  ],
}
