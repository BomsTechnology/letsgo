module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["react-native-reanimated/plugin"], 
      [
        "module-resolver", 
        {
          "root": ["./src"],
          "alias": {
            "@screens" : "./src/screens",
            "@components" : "./src/components",
            "@store" : "./src/store",
            "@data" : "./src/data",
            "@navigators" : "./src/navigators",
            "@constants" : "./src/constants",
          }
        }
      ]
    ]
  };
};
