import axios from "axios";

const ApiURL = `https://www.pre-onboarding-selection-task.shop`;

// createTodo
export const fetchCreateToDoApi = async (token: string, todo: string) => {
  console.log(token, todo);
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
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
  }
};
