const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@app": path.resolve(__dirname, "src/app/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@components": path.resolve(__dirname, "src/app/components/"),
      "@lib": path.resolve(__dirname, "src/lib/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@types": path.resolve(__dirname, "src/types/"),
    },
  },
};
