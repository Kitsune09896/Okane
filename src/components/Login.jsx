import React from "react";

export default function Login({ onLogin }) {
  return (
    <div className="login-choose-role">
      <h2>Выберите роль для входа</h2>
      <button className="login-btn" onClick={() => onLogin("admin")}>
        Войти как Админ
      </button>
      <button className="login-btn" onClick={() => onLogin("user")}>
        Войти как Пользователь
      </button>
    </div>
  );
}
