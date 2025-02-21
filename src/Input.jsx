import { useState } from "react";
import "./Input.css";

function Input({
  sethInput,
  hInput,
  AiSummerizer,
  trackInput,
  AiTranslate,
  detectedLang,
  AilangDetecter,
  sethInputLength,
  hInputLength,
}) {
  return (
    <div className="footer">
      <div>
        <form className="inputContainer">
          <span>Prompt</span>
          <textarea
            className="textarea"
            rows={5}
            id="input"
            onInput={(e) => {
              sethInput({ ...hInput, input: e.target.value });
              sethInputLength({
                ...hInputLength,
                input: e.target.value.length,
              });
              // AilangDetecter(e.target.value);
            }}
            required
          ></textarea>
        </form>
      </div>
      <div className="control">
        <div className="langDetect">
          The language is {detectedLang?.languageToHumanReadable}.
        </div>
        <div className="translateContainer">
          <button
            className="translate"
            onClick={() => {
              AiTranslate(), AilangDetecter();
            }}
          >
            Translate
          </button>
          <select
            className="englishBtn"
            onChange={(e) =>
              sethInput({ ...hInput, translateTo: e.target.value })
            }
          >
            <option>Translate to</option>
            <option value="en">Enlish</option>
            <option value="pt">Portuguese</option>
            <option value="es">Spanish</option>
            <option value="ru">Russian</option>
            <option value="tr">Turkish</option>
            <option value="fr">French</option>
          </select>
        </div>
        {hInputLength?.input >= 140 ? (
          <div className="summerizeContainer">
            <button className="summerize" onClick={() => AiSummerizer()}>
              Summerize
            </button>
            <fieldset>
              <div>
                <label name="type">Summary Type:</label>
                <select
                  id="type"
                  onChange={(e) =>
                    sethInput({ ...hInput, type: e.target.value })
                  }
                >
                  <option value="key-points" defaultValue="key-points">
                    Key Points
                  </option>
                  <option value="tl;dr">TL;DR</option>
                  <option value="teaser">Teaser</option>
                  <option value="headline">Headline</option>
                </select>
              </div>
              <div>
                <label name="length">Length:</label>
                <select
                  id="length"
                  onChange={(e) =>
                    sethInput({ ...hInput, length: e.target.value })
                  }
                >
                  <option value="short" defaultValue="short">
                    Short
                  </option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
              </div>
              <div>
                <label
                  name="format"
                  onChange={(e) =>
                    sethInput({ ...hInput, format: e.target.value })
                  }
                >
                  Format:
                </label>
                <select id="format">
                  <option value="markdown" defaultValue="markdown">
                    Markdown
                  </option>
                  <option value="plain-text">Plain text</option>
                </select>
              </div>
            </fieldset>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Input;
