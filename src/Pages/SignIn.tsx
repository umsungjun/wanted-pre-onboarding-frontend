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
    <>
      이메일 :
      <input
        data-testid="email-input"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      비밀번호 :
      <input
        data-testid="password-input"
        type="password"
        onChange={(e) => setPassWord(e.target.value)}
      />
      <br />
      <button
        data-testid="signin-button"
        disabled={btnDisable}
        onClick={(e) => handleLogin(e)}
      >
        로그인
      </button>
    </>
  );
}
