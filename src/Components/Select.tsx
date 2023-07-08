import { useReducer } from "react";

enum ActionKind {
  SELECT = "SELECT",
  OPEN = "OPEN"
}

interface Props {
  label: string;
  value: string;
}

interface State {
  open: boolean;
  value: string;
}

interface Action {
  type: ActionKind;
  payload?: string;
}

const selectReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionKind.SELECT:
      return { ...state, open: !state.open, value: action.payload || "" };
    case ActionKind.OPEN:
      return { ...state, open: !state.open };
    default:
      throw new Error(`unhandled action type ${action.type}`);
  }
};

function useSelect({ initialOpen = false, reducer = selectReducer } = {}) {
  console.log("reducer", reducer);
  const [state, dispatch] = useReducer(reducer, {
    open: initialOpen,
    value: ""
  });
  console.log("state", state);

  const setOpen = () => dispatch({ type: ActionKind.OPEN });
  const SetSelect = (value: string) =>
    dispatch({ type: ActionKind.SELECT, payload: value });

  return { open: state.open, value: state.value, setOpen, SetSelect };
}

function Select({
  options,
  reducer
}: {
  options: Props[];
  reducer?: (state: State, action: Action) => State;
}) {
  const { open, value, setOpen, SetSelect } = useSelect({ reducer });

  const handleSelect = (value: string) => {
    return SetSelect(value);
  };

  return (
    <>
      <input placeholder="Select Options" value={value} onClick={setOpen} />
      {open &&
        options.map((option) => {
          return (
            <div key={option.value} onClick={() => handleSelect(option.value)}>
              {option.label}
            </div>
          );
        })}
    </>
  );
}

export { selectReducer, Select, useSelect, ActionKind, State, Action };
