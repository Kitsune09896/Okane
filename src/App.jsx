import React, { useState } from "react";
import Login from "./components/Login";
import VideoUpload from "./components/VideoUpload";
import EpisodeList from "./components/EpisodeList";
import "./styles.css";

const defaultEpisodes = [
  { title: "Серия 1", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { title: "Серия 2", url: "https://www.w3schools.com/html/movie.mp4" },
];

export default function App() {
  const [role, setRole] = useState("guest"); // guest | admin | user
  const [activeTab, setActiveTab] = useState("auth"); // auth | home
  const [videoUrl, setVideoUrl] = useState(defaultEpisodes[0].url);
  const [episodes, setEpisodes] = useState(defaultEpisodes);

  const handleLogin = (chosenRole) => {
    setRole(chosenRole);
    setActiveTab("home");
  };

  return (
    <div className="app">
      <TabHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        role={role}
      />

      {activeTab === "auth" && <Login onLogin={handleLogin} />}

      {activeTab === "home" && (
        <>
          <h1>Видео команда Оканэ</h1>
          <video
            width="720"
            height="400"
            controls
            src={videoUrl}
            style={{ borderRadius: "15px" }}
          ></video>

          <EpisodeList
            episodes={episodes}
            onSelect={(url) => setVideoUrl(url)}
          />

          {role === "admin" && (
            <VideoUpload
              onVideoUpload={(url) =>
                setEpisodes((prev) => [
                  ...prev,
                  { title: `Серия ${prev.length + 1}`, url },
                ])
              }
            />
          )}
        </>
      )}
    </div>
  );
}

function TabHeader({ activeTab, setActiveTab, role }) {
  return (
    <div className="tabs">
      <button
        className={activeTab === "auth" ? "active" : ""}
        onClick={() => setActiveTab("auth")}
        disabled={role !== "guest"}
      >
        Авторизация
      </button>
      <button
        className={activeTab === "home" ? "active" : ""}
        onClick={() => {
          if (role === "guest") {
            alert("Пожалуйста, войдите в систему");
          } else {
            setActiveTab("home");
          }
        }}
        disabled={role === "guest"}
      >
        Главная страница
      </button>
    </div>
  );
}
