"use client";
import { firestore } from "@/firebase/config";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { FormEventHandler, useEffect, useState } from "react";

type dataTypes = {
  amount: number;
  description: string;
  date: Date;
};

export default function Home() {
  const [values, setValues] = useState({ amount: 0, description: "" });
  const [data, setData] = useState<dataTypes | null>(null);
  const d = new Date(data?.date?.seconds * 1000).toString().substring(0, 16);
  console.log(data);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    try {
      setDoc(doc(firestore, "expends", values.description), {
        ...values,
        date: new Date(),
      }).then();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const collectionReference = collection(firestore, "expends");
      try {
        const querySnapshot = await getDocs(collectionReference);
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(documents);
      } catch (error) {}
    })();
  }, []);

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

      <div>
        <table>
          <thead>
            <tr className="flex gap-4">
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {/* {data.map((item, idx) => (
              <tr key={idx}>
                <td>{item.amount}</td>
                <td>{item.description}</td>
                <td>{item.date}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </main>
  );
}
