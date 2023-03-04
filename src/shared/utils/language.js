const en = require("../constants/language/en.json");
const vn = require("../constants/language/vn.json");

const getLanguage = () => {
  const lang = "vn";
  switch (lang) {
    case "en":
      return { ...en };
    case "vi":
      return { ...vn };
    default:
      return { ...vn };
  }
};

export const language = getLanguage();
