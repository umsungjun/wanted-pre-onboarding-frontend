import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCreateToDoApi } from "../Service/todoService";

export default function ToDO() {
  const navigate = useNavigate();
  const token = localStorage.getItem("TOKEN");
  const [todo, setTodo] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      navigate("/signin");
    }
  });

  const handleCreateTodo = async () => {
    console.log("click");

    if (!token || !todo) return;
    const result = await fetchCreateToDoApi(token, todo);
    console.log(result);
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
      <li>
        <label>
          <input type="checkbox" />
          <span>TODO 1</span>
        </label>
        <button data-testid="modify-button">수정</button>
        <button data-testid="delete-button">삭제</button>
      </li>
    </>
  );
}
