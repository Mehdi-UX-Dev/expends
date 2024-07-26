"use client";
import { firestore } from "@/firebase/config";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { FormEventHandler, useEffect, useState } from "react";

import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type dataTypes = {
  id: string;
  amount: number;
  description: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
};

export default function Home() {
  const [values, setValues] = useState({ amount: 0, description: "" });
  const [data, setData] = useState<dataTypes[] | null>(null);
  console.log(data);

  const [balance, setBalance] = useState(0);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    try {
      setDoc(doc(firestore, "expends", values.description), {
        ...values,
        date: new Date(),
      }).then(() => {
        setValues({ amount: 0, description: "" });
        toast.dark("Item added successfully", {
          position: "top-center",
          progressStyle: {
            background: "green",
          },
          transition: Slide,
        });
      });
      setDoc(doc(firestore, "Current Balance", "balance"), {
        balance: balance - values.amount,
      });
    } catch (error: any) {
      toast.dark(error, {
        position: "top-center",
        progressStyle: {
          background: "red",
        },
        transition: Slide,
      });
    }
  };

  useEffect(() => {
    (async () => {
      const collectionReference = collection(firestore, "expends");
      try {
        const querySnapshot = await getDocs(collectionReference);
        const documents = querySnapshot.docs.map((doc) => {
          const { id, amount, description, date } = doc.data();
          return { id, amount, description, date };
        });
        setData(documents);
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const collectionReference = doc(firestore, "Current Balance", "balance");
      try {
        const querySnapshot = await getDoc(collectionReference);
        if (querySnapshot.exists()) {
          const { balance } = querySnapshot.data();
          setBalance(balance);
        }
      } catch (error) {}
    })();
  }, []);

  return (
    <main>
      <ToastContainer />
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
              value={values.amount}
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
              value={values.description}
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

      <section>
        <h1 className="text-[2rem] text-center mt-20">
          Total Amount: {balance}
        </h1>
        <table className="w-full text-center max-w-4xl mx-auto mt-20">
          <thead className="bg-gray-700">
            <tr className="">
              <th className="p-3">Amount</th>
              <th className="p-3">Description</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody className="border border-gray-700 ">
            {data
              ?.sort((a, b) => b.date.seconds - a.date.seconds) // Sort by newest first
              .map((item, idx) => {
                const date = new Date(item.date.seconds * 1000)
                  .toString()
                  .substring(0, 16);
                return (
                  <tr key={idx} className="text-white">
                    <td className="p-4">{item.amount}</td>
                    <td className="p-4">{item.description}</td>
                    <td className="p-4">{date}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
