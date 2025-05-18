import React, { useRef, useState } from "react";

interface VoiceInputProps {
  onResult: (text: string) => void;
  lang?: string;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onResult, lang = "en-IN" }) => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [listening, setListening] = useState(false);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  return (
    <button
      type="button"
      onClick={listening ? stopListening : startListening}
      className={`ml-2 px-3 py-2 rounded-full border ${listening ? "bg-green-200" : "bg-gray-200"}`}
      title={listening ? "Stop Listening" : "Start Voice Input"}
      aria-label="Voice Input"
    >
      {listening ? "🎤 Listening..." : "🎤"}
    </button>
  );
};

export default VoiceInput;