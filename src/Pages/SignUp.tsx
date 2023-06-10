import React, { useState, useEffect } from "react";
import { fetchJoinApi } from "../Service/authService";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
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

  const handleJoin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const result = await fetchJoinApi(email, password);

    if (result && result.status === 201) {
      navigate("/signin"); // 통신이 성공했을 때에만 navigate 호출
      setBtnDisable(true);
    } else {
      return;
    }
  };

  return (
    <section className="flex gap-2 flex-col content-center justify-center rounded-l-md bg-white">
      <div className="flex">
        <span>이메일 :</span>
        <input
          data-testid="email-input"
          placeholder="Enter your email"
          className="block rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex">
        <span>비밀번호 :</span>
        <input
          data-testid="password-input"
          type="password"
          className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
          onChange={(e) => setPassWord(e.target.value)}
        />
      </div>
      <button
        data-testid="signup-button"
        disabled={btnDisable}
        onClick={(e) => handleJoin(e)}
      >
        회원가입
      </button>
    </section>
  );
}
