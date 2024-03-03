import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import "./App.css";
import github from "../src/assets/github.png"
import linkedIn from "../src/assets/linkedin.png"
import portfolio from "../src/assets/portfolio.png"

function App() {
  const [texts, setTexts] = useState([]);
  const [history, setHistory] = useState([]);
  const historyIndexRef = useRef(-1);
  const [clickedElement, setClickedElement] = useState("");

  const addToHistory = () => {
    const snapshot = texts.map((text) => ({ ...text }));
    setHistory((prevHistory) => {
      const newHistory = prevHistory.slice(0, historyIndexRef.current + 1);
      return [...newHistory, snapshot];
    });
    historyIndexRef.current += 1;
  };

  const undo = () => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current -= 1;
      setTexts(history[historyIndexRef.current]);
    }
  };

  const redo = () => {
    if (historyIndexRef.current < history.length - 1) {
      historyIndexRef.current += 1;
      setTexts(history[historyIndexRef.current]);
    }
  };

  const addText = () => {
    addToHistory();

    const newText = {
      id: new Date().getTime(),
      text: "New Text",
      color: "black",
      font: "Arial",
      fontSize: "16px",
      position: { x: 217.5714111328125, y: 
        56.42852783203125 },
    };

    setTexts((prevTexts) => [...prevTexts, newText]);
  };

  const handleTextChange = (id, property, value) => {
    addToHistory();
    setTexts((prevTexts) =>
      prevTexts.map((text) =>
        text.id == id ? { ...text, [property]: value } : text
      )
    );
    console.log(texts);
  };

  const handleDrag = (id, e, ui) => {
    addToHistory();

    setTexts((prevTexts) =>
      prevTexts.map((text) =>
        text.id === id ? { ...text, position: { x: ui.x, y: ui.y } } : text
      )
    );
  };

  return (
    <div className="App">
    <div>

    <div>

      <button onClick={undo}>↺ Undo</button>
      <button onClick={redo}> ↻ Redo</button>
    </div>
    <div>

      <a href="https://github.com/MohdWaqi"><img src={github} alt="github"/></a>
      <a href="https://www.linkedin.com/in/mohd-waqi-pervez-52a432291/"><img src={linkedIn} alt="linkedin"/></a>
      <a href="https://mohdwaqi.github.io/portfolio/"><img src={portfolio} alt="portfolio"/></a>
    </div>
    </div>
    
      <div className="editArea">
        <div className="text-container">
          {texts.map((text) => (
            <Draggable
              key={text.id}
              defaultPosition={{ x: text.position.x, y: text.position.y }}
              bounds="parent"
              onStop={(e, ui) => handleDrag(text.id, e, ui)}
            >
              <input
                id={text.id}
                className="text-box"
                style={{
                  color: text.color,
                  fontFamily: text.font,
                  fontSize: text.fontSize,
                  width:`${text.text.length}ch`,
                }}
                onClick={() => {
                  setClickedElement(text.id);
                }}
                type="text"
                value={text.text}
                onChange={(e) =>
                  handleTextChange(text.id, "text", e.target.value)
                }
              />
            </Draggable>
          ))}
        </div>
        <div>
          <div className="controls">
            <div >
              <label>
                Font Color:{" "}
                <input
                
                  type="color"
                  value={
                    texts.length != 0
                      ? texts.filter((text) => text.id == clickedElement)[0]
                          ?.color
                      : "black"
                  }
                  onChange={(e) =>
                    handleTextChange(clickedElement, "color", e.target.value)
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Font Size:{" "}
                <input
                  type="number"
                  className="size"
                  size="1"
                  value={
                    texts.length != 0
                      ? texts
                          .filter((text) => text.id == clickedElement)[0]
                          ?.fontSize.replace("px", "")
                      : "16"
                  }
                  onChange={(e) =>
                    handleTextChange(
                      clickedElement,
                      "fontSize",
                      `${e.target.value}px`
                    )
                  }
                />
              </label>
            </div>
          </div>
          <button onClick={addText}> +  Add New</button>
        </div>
      </div>
      
    <footer>Created by Mohd Waqi Pervez©️ || mohdwaqipervez@gmail.com </footer>
    </div>
  );
}

export default App;
