import React, { useCallback, useRef, useState } from "react";
import CampaignIcon from "@mui/icons-material/Campaign";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import MicExternalOnRoundedIcon from "@mui/icons-material/MicExternalOnRounded";
import MicExternalOffRoundedIcon from "@mui/icons-material/MicExternalOffRounded";

import { SayButton } from "react-say";

const SpeakRoom = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(true);

  const [textToSpeech, setTextToSpeech] = useState("");

  console.log(transcript);
  console.log(textToSpeech);
  const selector = useCallback(
    (voices) => [...voices].find((v) => v.lang === "en-GB"),
    []
  );

  const handleTextChange = (e) => {
    e.preventDefault();
    if (transcript) {
      setTextToSpeech(transcript);
    } else {
      setTextToSpeech(e.target.value);
    }
  };

  return (
    <div className="mt-[18px] p-[40px] bg-white rounded-xl h-max">
      <div className="flex items-center">
        <h1 className="text-[28px] w-max mr-[12px] w-full font-bold tracking-[1px] leading-8">
          Speak Practice
        </h1>
        <CampaignIcon
          sx={{ fontSize: 36 }}
          className="text-[#f77171]"
        ></CampaignIcon>
      </div>

      <textarea
        className="border-[1px] mt-[20px] h-[200px] w-full resize-none outline-none p-[20px] rounded-lg"
        defaultValue={transcript}
        onChange={handleTextChange}
      ></textarea>

      <div className="mt-[12px] grid grid-cols-4 gap-[4px]">
        <button
          onClick={() => {
            SpeechRecognition.startListening({ continuous: isListening });
          }}
          className="bg-[#8eb397] rounded-xl px-[10px] py-[8px] text-white font-bold"
        >
          Start
        </button>
        <button
          onClick={() => {
            setIsListening(false);
            SpeechRecognition.stopListening();
          }}
          className="bg-[#f67171] rounded-xl px-[10px] py-[8px] text-white font-bold"
        >
          Stop
        </button>
        <button
          onClick={resetTranscript}
          className="bg-[#ffcd1f] rounded-xl px-[10px] py-[8px] text-white font-bold"
        >
          Reset
        </button>

        <SayButton
          onClick={(event) => console.log(event)}
          text={transcript}
          voice={selector}
          pitch={1.1}
          rate={0.75}
        >
          <div className="bg-[#3886b2] rounded-xl px-[10px] py-[8px] text-white font-bold">
            Speaker
          </div>
        </SayButton>
      </div>
      <div className="mt-[12px] text-[14px]">
        Microphone Check:{" "}
        {listening ? (
          <MicExternalOnRoundedIcon></MicExternalOnRoundedIcon>
        ) : (
          <MicExternalOffRoundedIcon></MicExternalOffRoundedIcon>
        )}
      </div>
    </div>
  );
};

export default SpeakRoom;
