import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLoginApi } from "../Service/authService";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [btnDisable, setBtnDisable] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (token) {
      navigate("/todo");
    }
  });

  useEffect(() => {
    if (email.includes("@") && password.length >= 8) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [email, password]);

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const result = await fetchLoginApi(email, password);

    if (result && result.status === 200) {
      const token = result.data.access_token;
      localStorage.setItem("TOKEN", token);
      navigate("/todo"); // 통신이 성공했을 때에만 navigate 호출
    } else {
      alert("입력 정보를 확인해주세요.");
      return;
    }
  };
  return (
    <section className="flex gap-5 flex-col content-center justify-center rounded-2xl w-96 bg-slate-50 px-7 py-5">
      <h1 className="text-center text-3xl">로그인</h1>
      <div className="flex items-center">
        <span className="text-center w-20 mr-2 ">이메일 :</span>
        <input
          data-testid="email-input"
          placeholder="Email"
          className="flex-1 py-2 pl-3  rounded-md border border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 py-1 px-1.5 text-gray-500"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <span className="text-center w-20 mr-2">비밀번호 :</span>
        <input
          data-testid="password-input"
          type="password"
          placeholder="PassWord"
          className="flex-1 pl-3  py-2 rounded-md border border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 py-1 px-1.5 text-gray-500"
          onChange={(e) => setPassWord(e.target.value)}
        />
      </div>
      <button
        data-testid="signin-button"
        disabled={btnDisable}
        onClick={(e) => handleLogin(e)}
        className="bg-blue-600 py-3 rounded-lg text-white mt-2"
      >
        로그인
      </button>
    </section>
  );
}
