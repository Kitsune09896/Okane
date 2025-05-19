import React, { useState } from "react";

export default function VideoUpload({ onVideoUpload }) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;
    onVideoUpload(url);
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="video-upload-form">
      <input
        type="text"
        placeholder="Введите URL видео"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit">Добавить видео</button>
    </form>
  );
}
