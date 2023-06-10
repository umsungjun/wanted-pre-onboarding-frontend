import axios from "axios";
import { LoginResultType } from "../Type/type";

const postJoinURL = `https://www.pre-onboarding-selection-task.shop/auth/signup`;
const postLoginURL = `https://www.pre-onboarding-selection-task.shop/auth/signin`;

// 회원가입
export const fetchJoinApi = async (email: string, passWord: string) => {
  const data = {
    email: email,
    password: passWord,
  };
  try {
    const result = await axios.post(postJoinURL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// 로그인
export const fetchLoginApi = async (email: string, passWord: string) => {
  const data = {
    email: email,
    password: passWord,
  };
  try {
    const result: LoginResultType = await axios.post(postLoginURL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
