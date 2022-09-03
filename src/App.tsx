import { SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";
import "./App.css";
import { User } from "./App.types";
import Form from "./components/Form";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    fetch("https://jsonplaceholder.typicode.com/users", { signal: signal })
      .then((response) => response.json())
      .then((users) => setUsers(users));

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <SnackbarProvider>
      <div className="w-screen h-screen flex items-center justify-center">
        <Form users={users} />
      </div>
    </SnackbarProvider>
  );
}

export default App;
