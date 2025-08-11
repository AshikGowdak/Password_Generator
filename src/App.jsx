import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(10);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (isNumberAllowed) str += "0123456789";
    if (isCharAllowed) str += "!@#$%^&*+-/[]{}()";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, isNumberAllowed, isCharAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isNumberAllowed, isCharAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          🔐 Password Generator
        </h1>

        {/* Password Display */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 rounded-xl shadow-inner overflow-hidden mb-6">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            className="outline-none w-full py-3 px-4 text-lg border border-gray-200 rounded-lg sm:rounded-none sm:rounded-l-lg bg-gray-50 text-gray-700"
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg sm:rounded-none sm:rounded-r-lg font-semibold hover:bg-blue-500 active:bg-blue-700 transition-colors"
          >
            Copy
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 text-sm text-gray-700">
          {/* Length */}
          <div className="flex items-center justify-between">
            <label className="font-medium">Length: {length}</label>
            <input
              type="range"
              min={10}
              max={25}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-2/3 cursor-pointer accent-blue-500"
            />
          </div>

          {/* Numbers Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isNumberAllowed}
              onChange={() => setIsNumberAllowed((prev) => !prev)}
              className="accent-blue-500"
            />
            Include Numbers
          </label>

          {/* Special Characters Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isCharAllowed}
              onChange={() => setIsCharAllowed((prev) => !prev)}
              className="accent-blue-500"
            />
            Include Special Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
