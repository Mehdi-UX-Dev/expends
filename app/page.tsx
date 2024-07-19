"use client";
import { FormEventHandler, useState } from "react";

import "react-toastify/dist/ReactToastify.css";

//todo the balance is not updating real time
//todo make this page a server component
export default function Home() {
  const [values, setValues] = useState({ name: "", password: "" });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    console.log(values.name === process.env.NEXT_PUBLIC_Name);
    console.log(values.password === process.env.NEXT_PUBLIC_Password);

    if (
      values.name === process.env.NEXT_PUBLIC_Name &&
      values.password === process.env.NEXT_PUBLIC_Password
    ) {
      console.log("right path");
    } else {
      console.log("wrong path");
    }
  };

  return (
    <main>
      <h1 className="text-[4rem] text-center mt-8">Expends App</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-10">
        <div className="flex flex-col justify-center mt-10 gap-4">
          <div className="flex flex-col">
            <label htmlFor="amount" className="pl-2">
              Name
            </label>
            <input
              id="amount"
              type="amount"
              value={values.name}
              className=" bg-gray-700 rounded-full h-10 pl-4"
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="pl-2">
              Password
            </label>
            <input
              id="description"
              value={values.password}
              type="password"
              className="bg-gray-700 h-10 rounded-full pl-4"
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  password: e.target.value,
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
