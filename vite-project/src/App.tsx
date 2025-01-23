import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";

export interface TodoI {
  id: string;
  text: string;
  done: boolean;
  priority: number;
}
function App() {
  const [todos, setTodos] = useState([] as TodoI[]);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const localTodos = localStorage.getItem("todos")!;
  if (todos.length === 0 && localTodos && JSON.parse(localTodos).length !== 0) {
    setTodos(JSON.parse(localStorage.getItem("todos")!));
  }
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
    <>
      <main>
        <header>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="new-todo"
            placeholder="Add new task"
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
    </>
  );
}

export default App;
