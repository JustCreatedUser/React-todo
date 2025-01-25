interface Props {
  stateFn: (value: string) => void;
  data: {
    [key: string]: unknown;
  };
  className: string;
  selected: string;
}
export default function CustomSelect(props: Props) {
  return (
    <select
      className={props.className}
      onChange={(e) => props.stateFn(e.target.value)}
    >
      {Object.keys(props.data).map((key) => (
        <option selected={key === props.selected} key={key} value={key}>
          {key}
        </option>
      ))}
    </select>
  );
}
