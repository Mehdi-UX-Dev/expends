"use client";
import { firestore } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { FormEventHandler, useState } from "react";

export default function Home() {
  const [values, setValues] = useState({ amount: 0, description: "" });
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    try {
      setDoc(doc(firestore, "expends", "oneUniqueId"), {
        values,
        date: new Date(),
      }).then();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1 className="text-[4rem] text-center mt-8">Expends App</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-10">
        <div className="flex flex-col justify-center mt-10 gap-4">
          <div className="flex flex-col">
            <label htmlFor="amount" className="pl-2">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              className=" bg-gray-700 rounded-full h-10 pl-4"
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  amount: parseInt(e.target.value),
                }))
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="pl-2">
              Description
            </label>
            <input
              id="description"
              type="text"
              className="bg-gray-700 h-10 rounded-full pl-4"
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <button className="bg-gray-700 py-4 w-full rounded-full">Submit</button>
      </form>
    </main>
  );
}
