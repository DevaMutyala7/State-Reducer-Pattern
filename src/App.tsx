import "./styles.css";
import {
  Select,
  selectReducer,
  State,
  Action,
  ActionKind
} from "./Components/Select";

const options = [
  {
    label: "apple",
    value: "Apple"
  },
  {
    label: "Banana",
    value: "Banana"
  },
  {
    label: "Orange",
    value: "Orange"
  }
];

export default function App() {
  const myReducer = (state: State, action: Action) => {
    const changes = selectReducer(state, action);
    if (action.type === ActionKind.SELECT) {
      console.log("changes", { ...changes, open: !state.open });
      return { ...changes, open: state.open };
    } else {
      return { ...changes };
    }
  };

  return (
    <div className="App">
      <Select options={options} reducer={myReducer} />
    </div>
  );
}
