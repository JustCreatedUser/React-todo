import { useContext } from "react";
import Context from "./GlobalContext";
interface Props {
  stateFn: (value: string) => void;
  className: string;
  selected: string;
}
export default function CustomSelect(props: Props) {
  const neededData =
    props.className === "theme-select" ? "themes" : "languages";
  const context = useContext(Context);
  return (
    <select
      className={props.className}
      onChange={(e) => props.stateFn(e.target.value)}
    >
      {Object.keys(context.globalData[neededData]).map((key) => (
        <option selected={key === props.selected} key={key} value={key}>
          {props.className === "theme-select"
            ? context.globalData.languages[
                context.language as "en" | "ua" | "pl"
              ].themes[key as "dark" | "light"]
            : key}
        </option>
      ))}
    </select>
  );
}
