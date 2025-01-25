import { createContext } from "react";
import data from "../data";
export default createContext({
  language: "en",
  theme: "dark",
  globalData: data,
});
