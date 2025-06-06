module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], //undertand expo stype code
    plugins: ["react-native-reanimated/plugin"], //understand react animation
  };
};
