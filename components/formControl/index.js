import { useState } from "react";
import { useRouter } from "next/router";
import ErrorMessage from "./errorMessage";

const FormControl = (props) => {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const createPost = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    let isEmpty = false;
    let message = "";

    if (!userId) {
      isEmpty = true;
      message = "Please select a user";
    } else if (!title) {
      isEmpty = true;
      message = "Please Enter a Title";
    } else if (!description) {
      isEmpty = true;
      message = "Please Enter a Description";
    }

    if (isEmpty) {
      setLoading(false);
      setError(message);
      return;
    }
    try {
      const data = {
        userId,
        title,
        body: description,
      };
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res.status === 201) {
        router.push("/success");
      } else {
        setError("Oops something went wrong");
      }
    } catch (err) {
      setError("Oops something went wrong");
    }
    setLoading(false);
  };

  const hideError = () => {
    setError("");
  };

  return (
    <form onSubmit={createPost}>
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <div className="bg-white py-6 rounded-md px-10 w-[600px] shadow-md">
          <h1 className="text-center text-2xl font-bold text-blue-600">
            Create Post
          </h1>
          {error ? <ErrorMessage error={error} close={hideError} /> : null}

          <div className="space-y-4 mt-6">
            <div>
              <label htmlFor="userId" className="font-semibold">
                Select User
              </label>
              <select
                id="userId"
                name="userId"
                className="px-4 mt-1 py-2 bg-gray-50 w-full"
                onChange={(event) => {
                  setError("");
                  setUserId(event.target.value);
                }}
                defaultValue={userId}
              >
                <option value="" disabled>
                  Please Select User
                </option>
                {!props.error &&
                  props.data.map((row, index) => (
                    <option value={row.id} key={index}>
                      {row.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label htmlFor="title" className="font-semibold">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter Title"
                className="px-4 mt-1 py-2 bg-gray-50 w-full"
                onChange={(event) => {
                  setError("");
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Enter Description"
                className="px-4 py-2 mt-1 bg-gray-50 block w-full"
                onChange={(event) => {
                  setError("");
                  setDescription(event.target.value);
                }}
              ></textarea>
            </div>
          </div>

          <button
            className="w-full mt-5 bg-blue-600 text-white py-2 rounded-md font-semibold tracking-tight"
            disabled={loading}
          >
            {loading ? "Processing..." : "Create"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormControl;
