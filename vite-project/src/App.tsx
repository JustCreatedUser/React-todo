import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";
import data from "./data";
export interface TodoI {
  id: string;
  text: string;
  done: boolean;
  priority: number;
}
import langContext from "./components/GlobalContext";
import CustomSelect from "./components/CustomSelect";
function App() {
  const [todos, setTodos] = useState([] as TodoI[]);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const [inputValue, setInputValue] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);
  const localTodos = localStorage.getItem("todos")!;
  if (todos.length === 0 && localTodos && JSON.parse(localTodos).length !== 0)
    setTodos(JSON.parse(localStorage.getItem("todos")!));

  const addTodo = () => {
    setInputValue("");
    return setTodos([
      ...todos,
      {
        id: Date.now().toString(),
        text: inputValue,
        done: false,
        priority: 0,
      },
    ]);
  };
  return (
    <langContext.Provider
      value={{ language: lang, theme: "dark", globalData: data }}
    >
      <main
        style={
          {
            "--theme": data.themes[theme as keyof typeof data.themes],
          } as React.CSSProperties
        }
      >
        <CustomSelect
          selected={lang}
          stateFn={setLang}
          className="lang-select"
        />
        <CustomSelect
          selected={theme}
          stateFn={setTheme}
          className="theme-select"
        />
        <header>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="new-todo"
            placeholder={
              data.languages[lang as keyof typeof data.languages]
                .inputPlaceholder
            }
          ></textarea>
          <button onClick={addTodo} className="add">
            +
          </button>
        </header>

        <TodoList
          setTodos={setTodos}
          className="uncompleted"
          key={"uncompleted"}
          todos={todos}
          inputValue={inputValue}
        />

        <TodoList
          setTodos={setTodos}
          className="completed"
          key={"completed"}
          todos={todos}
          inputValue={inputValue}
        />
      </main>
    </langContext.Provider>
  );
}

export default App;
