const fs = require('node:fs/promises');
const path = require('node:path');
const { withDangerousMod } = require('expo/config-plugins');

const TRANSPARENT_SPLASH_DRAWABLE = `<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
  <item android:drawable="@android:color/transparent" />
</layer-list>
`;

module.exports = function withSplashBackgroundFallback(config) {
  return withDangerousMod(config, [
    'android',
    async (androidConfig) => {
      const outputPath = path.join(
        androidConfig.modRequest.platformProjectRoot,
        'app',
        'src',
        'main',
        'res',
        'drawable',
        'splashscreen_logo.xml'
      );

      try {
        await fs.access(outputPath);
      } catch {
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        await fs.writeFile(outputPath, TRANSPARENT_SPLASH_DRAWABLE, 'utf8');
      }

      return androidConfig;
    },
  ]);
};
