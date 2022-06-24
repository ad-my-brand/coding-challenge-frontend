import { useEffect, useState } from "react";

const Form = () => {
  const [users, setUsers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const [userId, setUserId] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.data);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://countriesnow.space/api/v0.1/countries/cities/q?country=${country}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCities(data.data);
      });
  }, [country]);

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (userId && country && city && title && body) {
      console.log("POSTING");
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: {
          title: title,
          body: body,
          userId: userId,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            setUserId("");
            setCountry("");
            setCity("");
            setTitle("");
            setBody("");

            setSuccess(true);
            setError(false);
          } else {
            setSuccess(false);
            setError(true);
          }
        });
    }
  };

  return (
    <div className="md:container mx-auto p-5">
      <h1 className="text-4xl font-bold mb-10">Form</h1>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-6">
          <label htmlFor="username" className="block mb-2 text-sm font-medium">
            User Name
          </label>
          <select
            className=" border border-gary-900 text-sm rounded-lg block w-full p-2.5"
            onChange={(e) => setUserId(e.target.value)}
            value={userId}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {!userId && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              User name is required!
            </p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="country" className="block mb-2 text-sm font-medium">
            Country
          </label>
          <select
            name="country"
            value={country}
            className=" border border-gary-900 text-sm rounded-lg block w-full p-2.5"
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Select Country</option>
            {countries.map((country, i) => (
              <option key={country.country + i} value={country.country}>
                {country.country}
              </option>
            ))}
          </select>
          {!country && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              Country name is required
            </p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="city" className="block mb-2 text-sm font-medium">
            City
          </label>
          <select
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className=" border border-gary-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Select City</option>
            {cities?.map((city, i) => (
              <option key={i} value={city}>
                {city}
              </option>
            ))}
          </select>
          {!city && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              Country name is required!
            </p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className=" border border-gary-900 text-sm rounded-lg block w-full p-2.5"
          />
          {!title && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              Title name is required!
            </p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="body" className="block mb-2 text-sm font-medium">
            Body
          </label>
          <input
            type="text"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className=" border border-gary-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
          {!body && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              Body is required!
            </p>
          )}
        </div>
        {success && (
          <p className="w-full px-5 py-2 bg-green-100 text-green-500 mb-5 rounded-md">
            {" "}
            Form submitted successful{" "}
          </p>
        )}
        {error && (
          <p className="w-full px-5 py-2 bg-red-100 text-red-500 mb-5 rounded-md">
            {" "}
            Form submitted error{" "}
          </p>
        )}
        <div className="mb-6">
          <input
            type="submit"
            className="px-7 py-3 bg-blue-500 text-white font-bold rounded-md cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
