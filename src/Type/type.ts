// 로그인 결과 타입
export interface LoginResultType {
  data: {
    access_token: string;
  };
  status: number;
}

// ToDoList 결과 타입
export interface ToDoListResultType {
  data: {
    id: number;
    isCompleted: boolean;
    todo: string;
  }[];
}

// ToDoList 타입
export interface ToDoListType {
  id: number;
  isCompleted: boolean;
  todo: string;
}
