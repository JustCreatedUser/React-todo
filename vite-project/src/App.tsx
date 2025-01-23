import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";
import language from "./lang";
export interface TodoI {
  id: string;
  text: string;
  done: boolean;
  priority: number;
}
import langContext from "./components/ContextLang";
function App() {
  const [todos, setTodos] = useState([] as TodoI[]);
  const [lang, setLang] = useState("en");
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const localTodos = localStorage.getItem("todos")!;
  if (todos.length === 0 && localTodos && JSON.parse(localTodos).length !== 0)
    setTodos(JSON.parse(localStorage.getItem("todos")!));

  const [inputValue, setInputValue] = useState("");

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
    <langContext.Provider value={{ type: lang }}>
      <main>
        <select onChange={(e) => setLang(e.target.value)}>
          {Object.keys(language).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <header>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="new-todo"
            placeholder={
              language[lang as keyof typeof language].inputPlaceholder
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
