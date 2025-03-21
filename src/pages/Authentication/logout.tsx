import * as React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { useSignOut } from "react-firebase-hooks/auth";

export const Logout = () => {
  const navigate = useNavigate();

  const [signOut, loading, error] = useSignOut(auth);

  return (
    <div className="m-12">
      <div className="flex justify-between gap-3 px-2 py-3">
        <p className="font-bold lg:text-3xl">TodoList App</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex w-2/4 flex-col items-start rounded-2xl border-1 p-4">
          <h2 className="text-2xl font-bold">Logout</h2>
          <div className="mt-4 flex flex-col items-start gap-2">
            <h3>Do you wanna logout?</h3>
            <input
              type="submit"
              className="mt-4 rounded-lg bg-red-500 px-3 py-2 font-medium text-white hover:bg-red-600"
              value="Logout"
              onClick={() => {
                signOut().then(() => navigate("/"));
              }}
            />
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
