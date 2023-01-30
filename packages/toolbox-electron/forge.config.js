/* eslint-disable @typescript-eslint/no-var-requires */

const { execSync } = require('child_process')
const fs = require('fs/promises')
const path = require('path')

/* eslint-enable @typescript-eslint/no-var-requires */

/* eslint-disable no-console */

const nodeEnv = process.env.NODE_ENV
const isProd = nodeEnv === 'production'

module.exports = {
  packagerConfig: {
    name: 'SieraDesktop',
    executableName: 'siera-desktop',
    appBundleId: 'id.animo.siera.desktop',
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
      appleApiKey: process.env.SIERA_APPLE_API_KEY_PATH,
      appleApiKeyId: process.env.SIERA_APPLE_API_KEY_ID,
      appleApiIssuer: process.env.SIERA_APPLE_API_ISSUER,
    },
  },
  hooks: {
    packageAfterCopy: async (config, buildPath, electronVersion, platform) => {
      if (platform === 'win32') {
        const libIndyLibrariesPath = process.env.LD_LIBRARY_PATH
        if (!libIndyLibrariesPath) {
          throw new Error('LD_LIBRARY_PATH is not set')
        }

        const libindyLibFiles = await fs.readdir(libIndyLibrariesPath)

        for (const libFile of libindyLibFiles) {
          if (!libFile.endsWith('.dll')) continue

          const filePath = path.join(libIndyLibrariesPath, libFile)

          await fs.copyFile(filePath, path.join(buildPath, '..', '..', libFile))
        }
      }

      if (platform === 'darwin') {
        const packageRootpath = `${buildPath}/../..`

        console.log(
          execSync(
            `dylibbundler -ns -od -b -x ${packageRootpath}/Resources/app/.webpack/renderer/main_window/native_modules/build/Release/indynodejs.node -d ${packageRootpath}/Libs/LibIndy/ -p @rpath/../Libs/LibIndy/`
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
        name: 'siera-desktop',
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
          bin: 'siera-desktop',
        },
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          bin: 'siera-desktop',
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
