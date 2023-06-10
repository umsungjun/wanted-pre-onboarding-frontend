import axios from "axios";
import { ToDoListResultType } from "../Type/type";

const ApiURL = `https://www.pre-onboarding-selection-task.shop`;

// createTodo
export const fetchCreateToDoApi = async (token: string, todo: string) => {
  const data = {
    todo: todo,
  };
  try {
    const result = await axios.post(`${ApiURL}/todos`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

// getToDo
export const fetchGetToDoApi = async (token: string) => {
  try {
    const result: ToDoListResultType = await axios.get(`${ApiURL}/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

// updateTodo
export const fetchUpdateToDoApi = async (
  token: string,
  id: number,
  checked: boolean,
  changeTodo: string
) => {
  const data = {
    todo: changeTodo,
    isCompleted: checked,
  };
  try {
    const result = await axios.put(`${ApiURL}/todos/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return result.data;
  } catch (error) {
    console.log(error);
  }
};
