import { useMemo, useState } from "react";
import Form from "./Form";

function App() {
  const [darkMode, setDarkMode] = useState(null);

  // update local storage when theme changes
  useMemo(() => {
    if (darkMode !== null)
      if (darkMode)
        // Whenever the user explicitly chooses dark mode
        localStorage.theme = "dark";
      // Whenever the user explicitly chooses light mode
      else localStorage.theme = "light";
  }, [darkMode]);

  // if theme var found in localStorage then use it
  // otherwise check prefers-color-scheme
  useMemo(() => {
    if (
      localStorage.theme === "dark" ||
      ((localStorage?.theme !== "light" || !("theme" in localStorage)) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
      localStorage.theme = "dark";
    } else {
      setDarkMode(false);
      localStorage.theme = "light";
    }
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-white min-h-screen text-sky-900 dark:text-sky-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex">
            <button
              className="text-center mx-auto rounded-md px-2 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 sm:w-[66%] lg:w-[40%] w-[90%] my-3 tracking-wide font-bold text-2xl"
              onClick={() => window.location.reload()}
            >
              ADmyBrand India
            </button>
          </div>
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;
