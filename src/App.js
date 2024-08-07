import { useEffect, useState } from "react";
import './App.css';

function DrumButton({ label, id, audioSrc, soundName, setDisplayText }) {
  const handleClick = () => {
    const audio = document.getElementById(label);
    audio.play();
    setDisplayText(`${soundName}`); 
  };

  return (
    <button className="drum-pad" id={id} onClick={handleClick}>
      <audio className="clip" id={label} src={audioSrc} />
      {label}
    </button>
  );
}

function App() {
  const [displayText, setDisplayText] = useState("Welcome to the Drum Machine");

  const drumLabels = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

  const soundNames = [
    "Heater 1", "Heater 2", "Heater 3", "Heater 4", "Heater 5", "High Hat", "Kick", "low kick", "snap"
  ]

  const audioSources = [
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3",
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3",
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3",
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3",
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3",
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3",
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3",
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3",
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3"
  ];

  const drumButtons = drumLabels.map((label, i) => (
    <DrumButton 
      key={i} 
      label={label} 
      audioSrc={audioSources[i]} 
      soundName={soundNames[i]}
      id={`drum-${label}`} 
      setDisplayText={setDisplayText} // Pass callback
    />
  ));

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key.toUpperCase(); // Convert to uppercase to match drumLabels
      const button = document.getElementById(`drum-${key}`);
      if (button) {
        button.click(); 
      }
    };
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="App">
      <div id="display">
        <h1>This is a drum machine</h1>
        <p>{displayText}</p> {/* Display the text here */}
        {drumButtons}
      </div>
    </div>
  );
}

export default App;