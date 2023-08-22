module.exports = {
  rootDir: process.cwd(),
  moduleFileExtensions: ["ts", "tsx", "js"],
  testEnvironment: "jsdom",
  transform: {
    ".*\\.(tsx?)$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
};
