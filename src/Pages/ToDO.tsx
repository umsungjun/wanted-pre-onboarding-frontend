import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCreateToDoApi, fetchGetToDoApi } from "../Service/todoService";
import { ToDoListType } from "../Type/type";

export default function ToDO() {
  const navigate = useNavigate();
  const token = localStorage.getItem("TOKEN");
  const [todoList, setTodoList] = useState<ToDoListType[]>([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      navigate("/signin");
    }
  });

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) return;

    (async () => {
      const responseTodoList = (await fetchGetToDoApi(token)) || [];
      setTodoList(responseTodoList);
    })();
  }, [todoList]);

  const handleCreateTodo = async () => {
    if (!token || !todo) return;
    await fetchCreateToDoApi(token, todo);
  };

  return (
    <>
      <input
        className="border-black border-2 "
        data-testid="new-todo-input"
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        data-testid="new-todo-add-button"
        onClick={() => handleCreateTodo()}
      >
        추가
      </button>
      {todoList &&
        todoList.map((todo) => (
          <li key={todo.id}>
            <label>
              <input type="checkbox" />
              <span>{todo.todo}</span>
            </label>
            <button data-testid="modify-button">수정</button>
            <button data-testid="delete-button">삭제</button>
          </li>
        ))}
    </>
  );
}
