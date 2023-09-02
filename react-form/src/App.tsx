import { useState } from "react";
import Form from "./components/Form";
import MapComponent from "./components/map/MapComponent";
import type { UserData } from "./types";

function App() {
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  return (
    <main className="w-full min-h-screen flex flex-col items-center gap-4 lg:flex-row">
      <Form setSelectedUser={setSelectedUser} />
      <MapComponent selectedUser={selectedUser} />
    </main>
  );
}

export default App;
