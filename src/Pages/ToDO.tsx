import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCreateToDoApi,
  fetchGetToDoApi,
  fetchUpdateToDoApi,
} from "../Service/todoService";
import { ToDoListType } from "../Type/type";

export default function ToDO() {
  const navigate = useNavigate();
  const token = localStorage.getItem("TOKEN");
  const [todoList, setTodoList] = useState<ToDoListType[]>([]);
  const [todoInput, setTodoInput] = useState("");
  const [editTodoId, setEditTodoId] = useState(99999);
  const [todoEditInput, setTodoEditInput] = useState("");

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
  }, []);

  const handleCreateTodo = async () => {
    if (!token || !todoInput) return;
    try {
      const responseTodo = await fetchCreateToDoApi(token, todoInput);
      setTodoInput("");
      setTodoList((prevTodoList) => [...prevTodoList, responseTodo]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditStart = (todoId: number) => {
    setEditTodoId(todoId);
    const curEditTodo = todoList.find((todo) => todo.id === todoId);
    setTodoEditInput(curEditTodo?.todo || "");
  };

  const handleEditFinish = () => {
    setEditTodoId(9999);
  };

  const handleUpdateTodo = async (
    id: number,
    checked: boolean,
    changeTodo: string
  ) => {
    if (!token) return;
    const responseTodo = await fetchUpdateToDoApi(
      token,
      id,
      checked,
      changeTodo
    );

    const updateTodoList = todoList.map((todo) => {
      if (todo.id === responseTodo.id) {
        return {
          ...todo,
          isCompleted: checked,
          todo: changeTodo,
        };
      }
      return todo;
    });
    setTodoList(updateTodoList);
  };

  return (
    <>
      <input
        className="border-black border-2"
        data-testid="new-todo-input"
        onChange={(e) => setTodoInput(e.target.value)}
        value={todoInput}
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
            {editTodoId === todo.id ? (
              <>
                <input
                  className="border-black border-2"
                  data-testid="modify-input"
                  value={todoEditInput}
                  onChange={(e) => setTodoEditInput(e.target.value)}
                />
                <button
                  data-testid="submit-button"
                  onClick={() => {
                    handleUpdateTodo(todo.id, todo.isCompleted, todoEditInput);
                    handleEditFinish();
                  }}
                >
                  제출
                </button>
                <button
                  data-testid="cancel-button"
                  onClick={() => handleEditFinish()}
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() =>
                      handleUpdateTodo(todo.id, !todo.isCompleted, todo.todo)
                    }
                  />
                  <span>{todo.todo}</span>
                </label>
                <button
                  data-testid="modify-button"
                  onClick={() => handleEditStart(todo.id)}
                >
                  수정
                </button>
                <button data-testid="delete-button">삭제</button>
              </>
            )}
          </li>
        ))}
    </>
  );
}
