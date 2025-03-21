import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Card } from "../../components/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

export const TodoList = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const [list, setList] = useState([]);

  const getData = async () => {
    const collectionRef = collection(db, "todos");
    const q = query(collectionRef, where("userId", "==", user.uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data());
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

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="m-12">
      <p className="text-center">Welcome {user.email}</p>
      <div className="flex justify-between gap-3 px-2 py-3">
        <p className="font-bold lg:text-3xl">TodoList App</p>
        <div className="flex flex-row gap-3">
          <button
            className="rounded-lg bg-green-500 px-8 py-2 font-medium text-white hover:bg-green-600"
            onClick={() => {
              navigate("/add");
            }}
          >
            Add
          </button>
          <button
            className="rounded-lg bg-red-500 px-8 py-2 font-medium text-white hover:bg-red-600"
            onClick={() => {
              navigate("/auth/logout");
            }}
          >
            Logout
          </button>
        </div>
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
