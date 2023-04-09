import React, { useState } from "react";
import "../Component/speechToText.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";

export const SpeechToText = () => {
  const [textToCopy, setTextToCopy] = useState("");
  const [isTextCopied, setIsTextCopied] = useState(false);
  const [isCopied, setCopied] = useClipboard(textToCopy);
  const startListening = () =>
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
    });
  const stopListening = () => SpeechRecognition.stopListening();
  let { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleCopyTextClick = () => {
    setIsTextCopied(true);
    setCopied();
    setTimeout(() => {
      setIsTextCopied(false);
    }, 1000);
  };
  return (
    <>
      <div className="container">
        <h2>Speech to Text Converter</h2>
        <br />
        <p>
          A React hook that converts speech from the microphone to text and
          makes it available to your React components.
        </p>

        <div
          className="main-content"
          onClick={() => {
            stopListening();
            setTextToCopy(transcript);
          }}
        >
          {transcript}
        </div>

        <div className="btn-style">
          <button onClick={handleCopyTextClick}>
            {isTextCopied ? "Copied!" : "Copy to clipboard"}
          </button>
          <button
            disabled={isTextCopied}
            onClick={() => {
              resetTranscript();
              startListening();
            }}
          >
            Start Listening
          </button>
          <button onClick={stopListening}>Stop Listening</button>
        </div>

        <div className="instruction-box">
          <h4>Note : Before copying the text, click once on text.</h4>
        </div>
      </div>
    </>
  );
};
