import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCreateToDoApi,
  fetchDeleteToDoApi,
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

  const handleDelete = async (todoId: number) => {
    if (!token) return;
    await fetchDeleteToDoApi(token, todoId);

    const updateTodoList = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(updateTodoList);
  };

  return (
    <section className="h-96 w-full flex flex-col items-center justify-start bg-sky-100 p-7 rounded-xl">
      <h1 className="w-full text-grey-darkest text-left text-2xl">Todo List</h1>
      <div className="flex mt-4">
        <input
          className="w-96 shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
          placeholder="Add Todo"
          data-testid="new-todo-input"
          onChange={(e) => setTodoInput(e.target.value)}
          value={todoInput}
        />
        <button
          className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal-300"
          data-testid="new-todo-add-button"
          onClick={() => handleCreateTodo()}
        >
          추가
        </button>
      </div>
      {todoList &&
        todoList.map((todo) => (
          <li key={todo.id} className="w-full mt-3 flex items-center">
            {editTodoId === todo.id ? (
              <>
                <input
                  className="flex-1 shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                  data-testid="modify-input"
                  value={todoEditInput}
                  onChange={(e) => setTodoEditInput(e.target.value)}
                />
                <div className="ml-auto">
                  <button
                    className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green-400"
                    data-testid="submit-button"
                    onClick={() => {
                      handleUpdateTodo(
                        todo.id,
                        todo.isCompleted,
                        todoEditInput
                      );
                      handleEditFinish();
                    }}
                  >
                    제출
                  </button>
                  <button
                    className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red-400"
                    data-testid="cancel-button"
                    onClick={() => handleEditFinish()}
                  >
                    취소
                  </button>
                </div>
              </>
            ) : (
              <>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5 mr-2"
                    checked={todo.isCompleted}
                    onChange={() =>
                      handleUpdateTodo(todo.id, !todo.isCompleted, todo.todo)
                    }
                  />
                  <span className="text-2xl">{todo.todo}</span>
                </label>
                <div className="ml-auto">
                  <button
                    className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green-400"
                    data-testid="modify-button"
                    onClick={() => handleEditStart(todo.id)}
                  >
                    수정
                  </button>
                  <button
                    className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red-400"
                    data-testid="delete-button"
                    onClick={() => handleDelete(todo.id)}
                  >
                    삭제
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
    </section>
  );
}
