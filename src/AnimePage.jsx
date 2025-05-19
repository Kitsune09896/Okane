import React, { useState, useRef, useEffect } from "react";
import "./AnimePage.css";

const BACKGROUNDS = [
  "https://wallpapers.99px.ru/wallpapers/anime/1920x1080/anime_04545.jpg",
  "https://wallpapers.99px.ru/wallpapers/anime/1920x1080/anime_02532.jpg",
  "https://wallpapers.99px.ru/wallpapers/anime/1920x1080/anime_01578.jpg",
  "https://wallpapers.99px.ru/wallpapers/anime/1920x1080/anime_03456.jpg",
];

const AnimePage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    "Очень крутая озвучка! Жду продолжения!",
    "Спасибо за работу, команда Оканэ!",
  ]);
  const [poster, setPoster] = useState(
    "https://sun9-29.userapi.com/impg/bWY2Oc-jlBdWuutEEXH9V9HIEAUsh7g28NNtAg/h7k6XPC2JqM.jpg?size=1976x1888&quality=95&sign=fda96164929b65be51472aa0f0e5bc9f&type=album"
  );
  const [videoSrc, setVideoSrc] = useState(null);
  const [background, setBackground] = useState(BACKGROUNDS[0]);

  const videoRef = useRef(null);

  useEffect(() => {
    // Случайный фон из списка при монтировании
    const index = Math.floor(Math.random() * BACKGROUNDS.length);
    setBackground(BACKGROUNDS[index]);
  }, []);

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  const handleRating = (value) => {
    setRating(value);
    alert(`Вы поставили оценку: ${value} звёзд`);
  };

  const handleSubmit = () => {
    if (comment.trim()) {
      const formatted = comment.trim().replace(/\\N/g, "\n");
      setComments([...comments, formatted]);
      setComment("");
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const openInNewTab = () => {
    const newWindow = window.open(window.location.href, "_blank");
    if (newWindow) newWindow.focus();
  };

  const handlePosterChange = (e) => {
    if (!isAdmin) {
      alert("Только администратор может менять постер.");
      return;
    }
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPoster(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e) => {
    if (!isAdmin) {
      alert("Только администратор может загружать видео.");
      return;
    }
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };

  return (
    <div
      className="anime-page"
      style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
    >
      <header className="header">
        <img
          src="https://sun9-29.userapi.com/impg/bWY2Oc-jlBdWuutEEXH9V9HIEAUsh7g28NNtAg/h7k6XPC2JqM.jpg?size=1976x1888&quality=95&sign=fda96164929b65be51472aa0f0e5bc9f&type=album"
          alt="Оканэ Логотип"
          className="logo"
        />
        Озвучка аниме | Оканэ
        <button onClick={toggleAdmin} className="admin-toggle">
          {isAdmin ? "Выйти из режима админа" : "Войти как админ"}
        </button>
      </header>

      <div className="container">
        <div className="anime-info">
          <img src={poster} alt="Постер аниме" className="anime-poster" />
          <div className="anime-description">
            <h1>Твоё имя (Kimi no Na wa)</h1>
            <p>
              <strong>Жанры:</strong> Драма, Романтика, Супернатуральное
            </p>
            <p>
              <strong>Описание:</strong> Двое подростков, живущих в разных
              уголках Японии, неожиданно начинают менять тела. Несмотря на это
              странное явление, между ними возникает связь, способная преодолеть
              время и пространство.
            </p>
            {isAdmin && (
              <input
                type="file"
                accept="image/*"
                onChange={handlePosterChange}
                className="poster-upload"
              />
            )}
          </div>
        </div>

        <div className="video-player">
          <video ref={videoRef} controls src={videoSrc || "anime.mp4"}>
            Ваш браузер не поддерживает видео.
          </video>
          <div className="video-controls">
            <button onClick={handleFullscreen}>Полноэкранный режим</button>
            <button onClick={openInNewTab}>Открыть в новой вкладке</button>
          </div>

          {isAdmin && (
            <div className="video-upload">
              <p>
                Загрузите видео для этого аниме (поддерживаются форматы mp4,
                webm, ogg):
              </p>
              <input
                type="file"
                accept="video/mp4,video/webm,video/ogg"
                onChange={handleVideoChange}
              />
            </div>
          )}
        </div>

        <div className="rating">
          Оценка:
          <div className="stars">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                data-value={value}
                className={value > rating ? "inactive" : ""}
                onClick={() => handleRating(value)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="comments">
          <h2>Комментарии</h2>
          <div className="comment-form">
            <textarea
              rows="4"
              placeholder="Оставьте комментарий... Используйте \\N для переноса строки"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={handleSubmit}>Отправить</button>
          </div>
          {comments.map((c, index) => (
            <div className="comment" key={index}>
              {c.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimePage;
