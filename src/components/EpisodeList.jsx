import React, { useState } from "react";

export default function EpisodeList({ episodes, onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = (index) => {
    setSelectedIndex(index);
    onSelect(episodes[index].url);
  };

  return (
    <ul className="episode-list">
      {episodes.map((episode, index) => (
        <li
          key={index}
          className={selectedIndex === index ? "selected" : ""}
          onClick={() => handleClick(index)}
        >
          {episode.title}
        </li>
      ))}
    </ul>
  );
}
