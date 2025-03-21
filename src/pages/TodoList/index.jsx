import {
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { Card } from "../../components/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";

export const TodoList = () => {
  const navigate = useNavigate();

  const [list, setList] = useState([]);

  const getData = async () => {
    const docsRef = collection(db, "todos");
    const query = await getDocs(docsRef);
    return query.docs.map((doc) => doc.data());
  };

  useEffect(() => {
    getData()
      .then((data) => setList(data))
      .catch((error) => console.error(error));
  }, []);

  const deleteData = async (id) => {
    const query = await deleteDoc(doc(db, "todos", id.toString()));
    return query;
  };

  const handleDelete = async (id) => {
    try {
      await deleteData(id);
      const data = await getData();
      setList(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="m-12">
      <div className="flex justify-between gap-3 px-2 py-3">
        <p className="font-bold lg:text-3xl">TodoList App</p>
        <button
          className="rounded-lg bg-green-500 px-8 py-2 font-medium text-white hover:bg-green-600"
          onClick={() => {
            navigate("/add");
          }}
        >
          Add
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {list.map((list) => {
          return (
            <Card
              id={list.id}
              key={list.id}
              heading={list.heading}
              description={list.description}
              createdAt={list.createdAt}
              onDelete={handleDelete}
            ></Card>
          );
        })}
      </div>
    </div>
  );
};
