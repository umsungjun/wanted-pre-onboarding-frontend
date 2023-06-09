import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ToDO() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      navigate("/signin");
    }
  });

  return <div>투두페이지입니다.</div>;
}
