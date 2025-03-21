import * as React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  React.useEffect(() => {
    if (auth.currentUser) {
      navigate("/auth/logout");
    }
  }, []);

  return (
    <div className="m-12">
      <div className="flex justify-between gap-3 px-2 py-3">
        <p className="font-bold lg:text-3xl">TodoList App</p>
        <button
          className="rounded-lg bg-blue-500 px-8 py-2 font-medium text-white hover:bg-green-600"
          onClick={() => {
            navigate("/auth/login");
          }}
        >
          Login
        </button>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex w-2/4 flex-col items-start rounded-2xl border-1 p-4">
          <h2 className="text-2xl font-bold">Register</h2>
          <div className="mt-4 flex flex-col items-start gap-2">
            <label htmlFor="Email">Email: </label>
            <input
              className="border-1 border-gray-400"
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password: </label>
            <input
              className="border-1 border-gray-400"
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="submit"
              className="green-500 mt-4 rounded-lg bg-blue-500 px-3 py-2 font-medium text-white hover:bg-green-600"
              value="Register"
              onClick={() =>
                createUserWithEmailAndPassword(email, password).then(() =>
                  navigate("/"),
                )
              }
            />
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
