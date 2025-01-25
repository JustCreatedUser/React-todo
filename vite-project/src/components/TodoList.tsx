import { TodoI } from "../App";
import { useContext } from "react";
import langContext from "./GlobalContext";
import data from "../data";
interface TodoListProps {
  inputValue: string;
  className: string;
  todos: TodoI[];
  setTodos: React.Dispatch<React.SetStateAction<TodoI[]>>;
}

export default function TodoList({
  className,
  todos,
  setTodos,
}: TodoListProps) {
  const context = useContext(langContext);
  const statuses = {
    completed: true,
    uncompleted: false,
  };
  const rightTodos = todos.filter(
    (todo) => todo.done === statuses[className as keyof typeof statuses]
  );
  return (
    <div
      className={
        "todo-list " + className + (rightTodos.length === 0 ? " empty" : "")
      }
    >
      <h3>
        {className === "completed"
          ? data.languages[context.language as keyof typeof data.languages]
              .completed
          : data.languages[context.language as keyof typeof data.languages]
              .uncompleted}
        - {rightTodos.length}
      </h3>
      <ul>
        {rightTodos.map((todo) => (
          <li key={todo.id}>
            <textarea
              className="todo-text"
              rows={1}
              value={todo.text}
              onChange={(e) => {
                setTodos(
                  todos.map((t) =>
                    t.id === todo.id ? { ...t, text: e.target.value } : t
                  )
                );
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
            ></textarea>
            <div className="todo-actions">
              <button
                onClick={() =>
                  setTodos(
                    todos.map((t) => {
                      if (t.id === todo.id) return { ...t, done: !t.done };
                      return t;
                    })
                  )
                }
              >
                {todo.done ? "✕" : "✔"}
              </button>
              <button
                onClick={() => {
                  const newTodos = todos.filter((t) => t.id !== todo.id);
                  localStorage.setItem("todos", JSON.stringify(newTodos));
                  setTodos(newTodos);
                }}
              >
                🗑
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
