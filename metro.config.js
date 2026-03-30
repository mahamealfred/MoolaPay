const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const monorepoRoot = path.resolve(__dirname, '../..');
const config = getDefaultConfig(__dirname);

// In this monorepo, look in the local node_modules first so moolaPay's
// SDK 54 packages are preferred, then fall back to root for shared deps
// (expo-asset, expo-constants, etc.) that are only installed at root level.
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Explicitly pin the SDK-versioned packages to local copies so Metro never
// uses the root's Expo 55 / RN 0.76 chain, which would cause a native-module
// mismatch (TurboModule PlatformConstants crash).
config.resolver.extraNodeModules = {
  expo: path.resolve(__dirname, 'node_modules/expo'),
  react: path.resolve(__dirname, 'node_modules/react'),
  'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime.js'),
  'react/jsx-dev-runtime': path.resolve(__dirname, 'node_modules/react/jsx-dev-runtime.js'),
  'react-native': path.resolve(__dirname, 'node_modules/react-native'),
  'react-native-web': path.resolve(__dirname, 'node_modules/react-native-web'),
  'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
  'expo-asset': path.resolve(__dirname, 'node_modules/expo-asset'),
  'expo-constants': path.resolve(__dirname, 'node_modules/expo-constants'),
  'expo-modules-core': path.resolve(__dirname, 'node_modules/expo-modules-core'),
};

module.exports = config;
