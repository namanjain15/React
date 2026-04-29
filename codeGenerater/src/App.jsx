import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(5);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // using useRef
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "012345678";
    if (charAllowed) str += "!@#$%^&*";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); // Math.floor removes decimal part

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);       // yha optimization ki bt chl rhi h ki ise bhi cache m rkho

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();                      // user ko effect acha dikhe ki pass select hua h usko or optimize krne k lie 
    
    passwordRef.current?.setSelectionRange(0, 20);       // it is used to select a particular given range of password on clicking copy
    
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator]);       // firse run krne pr same impact pdega koi proble nhi h kuki isme yh show ho rha h ki in values m kch bhi change ho to bps s run krdo

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">

        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-600">

          <h1 className="text-white text-center my-4">PASSWORD GENERATOR</h1>

          <div className="flex shadow rounded-lg overflow-hidden mb-4 h-12">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="password"
              readOnly
              ref = {passwordRef}
            />

            <button 
            onClick={copyPasswordToClipboard}
            className="outline-none bg-orange-500 text-black px-4 shrink-0 hover:shadow-xl hover:bg-orange-600">Copy</button>

          </div>

          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input 
              type="range"
              min = {5}
              max = {20}
              value = {length}
              className="cursor-pointer"
              onChange={(e) => {setlength(e.target.value)}}       // onChange directly to d nhi skte kuki ek event(e) bhi pass krna h to ek function ko fire krnge jisse event setLength property ko call krega
              />

              <label>Length: {length}</label>

            </div>

            <div className="flex items-center gap-x-1 px-2">
              <input type="checkbox"
              defaultChecked = {numberAllowed}
              id="numberInput"
               onChange={() => {
                setnumberAllowed((prev) => !prev);       // previous value ko reverse krdega
               }}
              />

              <label htmlFor="numberInput">Numbers</label>

            </div>

            <div className="flex items-center gap-x-1 px-2">
              <input 
              type="checkbox" 
              defaultChecked = {charAllowed}
              id = "charInput"
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
              />

              <label htmlFor="charInput">Character</label>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
