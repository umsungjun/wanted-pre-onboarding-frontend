import axios from "axios";

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

interface loginResultType {
  data: {
    access_token: string;
  };
  status: number;
}

// 로그인
export const fetchLoginApi = async (email: string, passWord: string) => {
  const data = {
    email: email,
    password: passWord,
  };
  try {
    const result: loginResultType = await axios.post(postLoginURL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
