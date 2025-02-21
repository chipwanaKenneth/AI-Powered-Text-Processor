import { useEffect, useState } from "react";
import Chat from "./Chat";
import Input from "./Input";
import "./App.css";

function App() {
  const [hInput, sethInput] = useState({
    input: "",
  });
  const [hInputLength, sethInputLength] = useState({});
  const [aiOutput, setaiOutput] = useState({
    output: "",
  });
  const [detectedLang, setDetectedLang] = useState({
    detectedLanguage: "",
    languageToHumanReadable: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  let trackInput = "";

  useEffect(() => {
    if (hInput.input !== "") {
      AilangDetecter();
    }
  }, [hInput.input]);

  function languageTagToHumanReadable(languageTag, targetLanguage) {
    const displayNames = new Intl.DisplayNames([targetLanguage], {
      type: "language",
    });
    return displayNames.of(languageTag);
  }

  const AilangDetecter = async () => {
    const languageDetectorCapabilities =
      await self.ai.languageDetector.capabilities();
    const canDetect = languageDetectorCapabilities.capabilities;
    let detector;
    if (canDetect === "no") {
      // The language detector isn't usable.
      alert("Please download the language dectetor API");
      return;
    }
    detector = await self.ai.languageDetector.create();
    await detector.ready;
    const results = await detector.detect(hInput.input);
    setDetectedLang({
      ...detectedLang,
      detectedLanguage: results[0]?.detectedLanguage,

      languageToHumanReadable: languageTagToHumanReadable(
        results[0].detectedLanguage,
        "en"
      ),
    });
  };

  const AiTranslate = async () => {
    setIsLoading(true);
    // if input is empty
    if (hInput?.input === "") {
      alert("Please input some text first");
      setIsLoading(false);
      return;
    }
    // i fdoesn't language to translate to
    if (hInput?.translateTo === undefined) {
      alert("Pick language to translate to");
      setIsLoading(false);
      return;
    }
    // if user pick to translate to same language
    if (detectedLang?.detectedLanguage === hInput?.translateTo) {
      alert("Can't translate a langueage over itself");
      setIsLoading(false);
      return;
    }
    const translator = await self.ai.translator.create({
      sourceLanguage: detectedLang?.detectedLanguage,
      targetLanguage: hInput?.translateTo,
    });
    const translated = await translator.translate(hInput?.input);
    setaiOutput({ output: translated });
    setIsLoading(false);
  };

  const AiSummerizer = async () => {
    setIsLoading(true);
    setaiOutput({ output: "" });
    const options = {
      sharedContext: "This is a scientific article",
      type: hInput?.type,
      format: hInput?.format,
      length: hInput?.length,
    };

    const available = (await self.ai.summarizer.capabilities()).available;
    let summarizer;
    if (available === "readily") {
      // The Summarizer API can be used immediately .
      summarizer = await self.ai.summarizer.create(options);

      const summary = await summarizer.summarize(hInput?.input, {
        context: "This article is intended for a tech-savvy audience.",
      });
      setaiOutput({ output: summary });
      setIsLoading(false);
    }
  };
  return (
    <div className="App">
      <Input
        hInput={hInput}
        sethInput={sethInput}
        AiSummerizer={AiSummerizer}
        trackInput={trackInput}
        AiTranslate={AiTranslate}
        detectedLang={detectedLang}
        AilangDetecter={AilangDetecter}
        hInputLength={hInputLength}
        sethInputLength={sethInputLength}
      />
      <Chat hInput={hInput} aiOutput={aiOutput} isLoading={isLoading} />
    </div>
  );
}

export default App;
