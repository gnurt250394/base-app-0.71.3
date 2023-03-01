module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          components: './src/components',
          common: './src/common',
          configs: './src/configs',
          elements: './src/elements',
          hooks: './src/hooks',
          middleawares: './src/middleawares',
          navigation: './src/navigation',
          network: './src/network',
          res: './src/res',
          screens: './src/screens',
          utils: './src/utils',
          apollo: './src/apollo',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
