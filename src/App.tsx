import { useState } from "react";
import FormControl from "./components/FormControl";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <FormControl></FormControl>
    </div>
  );
}

export default App;
