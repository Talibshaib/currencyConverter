import React from "react";
import { useState, useEffect } from "react";

export default function Component() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [info, setInfo] = useState([]);
  const [convertableAmount, setConvertableAmount] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`
    )
      .then((res) => res.json())
      .then((res) => setInfo(res[from]))
      .catch((err) => setError(err.message));
  }, [from]);

  const amountConverter = () => {
    const change = (info[to] * amount).toFixed(2);
    return setConvertableAmount(change);
  };
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1700166680787-63aa1f06441a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="bg-transparent/40 p-6 rounded-lg border-2 border-red-400 flex flex-col items-center">
        <div className="bg-white w-auto h-auto p-4 flex rounded-lg gap-16 my-1 overflow-hidden">
          <div className="flex flex-col gap-4">
            <label htmlFor="from">From</label>
            <input
              type="number"
              name=""
              id="from"
              value={amount}
              className="outline-none"
              min={0}
              onChange={(e) => {
                setAmount(Number(e.target.value));
              }}
            />
          </div>
          <div className="flex flex-wrap flex-col justify-end items-end gap-4 overflow-hidden">
            <label>currency type</label>
            <select
              name=""
              id=""
              className="rounded-lg px-1 py-1 outline-none w-3/4 "
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
              }}
            >
              {Object.keys(info).map(
                (item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                },
                [info]
              )}
            </select>
          </div>
        </div>

        <button
          type="button"
          className="bg-red-600 rounded-lg py-2 px-2 -my-5 text-white z-10 focus:outline-none "
          onClick={() => amountConverter()}
        >
          Convert
        </button>

        <div className="bg-white w-auto h-auto p-4 flex rounded-lg gap-16 my-1 z-0 ">
          <div className="flex flex-col gap-4">
            <label htmlFor="from">To</label>
            <input
              type="number"
              name=""
              value={convertableAmount}
              id="from"
              disabled
              className="outline-none"
            />
          </div>
          <div className="flex flex-wrap flex-col justify-end items-end gap-4 overflow-hidden">
            <label>currency type</label>
            <select
              name=""
              id=""
              className="rounded-lg px-1 py-1 outline-none w-3/4 "
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
              }}
            >
              {Object.keys(info).map(
                (item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                },
                [info]
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
