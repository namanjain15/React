import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./Hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setconvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setconvertedAmount(amount);
  };

  const convert = () => {
    setconvertedAmount(amount * currencyInfo[to].toFixed(2));
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div className="w-full">
        <div className="relative w-full max-w-md mx-auto p-7 rounded-2xl backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl">
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Currency Converter
          </h1>

          <p className="text-gray-200 text-center mb-6 text-sm">
            Convert currencies instantly with real-time exchange rates
          </p>
          <form
            onSubmit={(e) => {
              // firing an event
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                onClick={swap}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-3xl w-20 h-10 flex items-center justify-center shadow-lg"
              >
                ⇅
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full mt-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg"
            >
              Convert {from.toUpperCase()} → {to.toUpperCase()}
            </button>

            <p className="text-center text-white mt-4 text-lg font-semibold">
              {amount} {from.toUpperCase()} = {convertedAmount}{" "}
              {to.toUpperCase()}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
