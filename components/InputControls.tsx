import React from "react";

interface InputControlsProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onSend: () => void;
}

const InputControls: React.FC<InputControlsProps> = ({
  input,
  setInput,
  onSend,
}) => {
  return (
    <div className="flex p-4 border-t border-gray-300 bg-white">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded mr-2"
      />
      <button
        onClick={onSend}
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={!input}
      >
        Send
      </button>
    </div>
  );
};

export default InputControls;
