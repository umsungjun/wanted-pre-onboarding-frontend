import React, { useState, useEffect } from "react";
import { fetchJoinApi } from "../Service/authService";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [btnDisable, setBtnDisable] = useState(true);

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
        data-testid="signup-button"
        disabled={btnDisable}
        onClick={(e) => handleJoin(e)}
      >
        회원가입
      </button>
    </>
  );
}
