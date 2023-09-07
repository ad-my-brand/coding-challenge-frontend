// import React, { useState, useEffect } from "react";
// import CustomFormControl from "./CustomFormControl";
// import UserList from "./UserList";
// import Map from "./Map";

// const Form = () => {
//   const [selectedUser, setSelectedUser] = useState("");
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState("");
//   const [userLocation, setUserLocation] = useState(null);

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((data) => setUsers(data))
//       .catch((error) => console.error("Error fetching users:", error));
//   }, []);

//   useEffect(() => {
//     if (selectedUser) {
//       fetch(`https://jsonplaceholder.typicode.com/users/${selectedUser}`)
//         .then((response) => response.json())
//         .then((userData) => {
//           setUserLocation({
//             lat: parseFloat(userData.address.geo.lat),
//             lng: parseFloat(userData.address.geo.lng),
//             city: userData.address.city,
//             zipcode: userData.address.zipcode,
//           });
//         })
//         .catch((error) =>
//           console.error("Error fetching user location:", error)
//         );
//     }
//   }, [selectedUser]);

//   const handleFormSubmit = (event) => {
//     event.preventDefault();

//     if (!selectedUser || !title || !body) {
//       setError("Please fill in all required fields");
//       return;
//     }

//     const postData = {
//       title,
//       body,
//       userId: selectedUser,
//     };

//     fetch("https://jsonplaceholder.typicode.com/posts", {
//       method: "POST",
//       body: JSON.stringify(postData),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("New post created:", data);
//         setSelectedUser("");
//         setTitle("");
//         setBody("");
//         setError("");
//       })
//       .catch((error) => console.error("Error creating post:", error));
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Coding Challenge</h2>
//       <form onSubmit={handleFormSubmit}>
//         <UserList
//           users={users}
//           onSelectUser={(event) => setSelectedUser(event.target.value)}
//         />
//         <Map userLocation={userLocation} />
//         <CustomFormControl
//           label="Title"
//           validationFn={(value) => (!value ? "Please enter a title" : "")}
//           value={title}
//           onChange={setTitle}
//         />
//         <CustomFormControl
//           label="Body"
//           validationFn={(value) => (!value ? "Please enter a body" : "")}
//           value={body}
//           onChange={setBody}
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4 focus:outline-none focus:ring focus:ring-blue-400"
//         >
//           Submit
//         </button>
//         {error && <div className="text-red-500 mt-2">{error}</div>}
//       </form>
//     </div>
//   );
// };

// export default Form;

import React, { useState, useEffect } from "react";
import CustomFormControl from "./CustomFormControl";
import UserList from "./UserList";
import Map from "./Map";

const Form = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetch(`https://jsonplaceholder.typicode.com/users/${selectedUser}`)
        .then((response) => response.json())
        .then((userData) => {
          setUserLocation({
            lat: parseFloat(userData.address.geo.lat),
            lng: parseFloat(userData.address.geo.lng),
            city: userData.address.city,
            zipcode: userData.address.zipcode,
          });
        })
        .catch((error) =>
          console.error("Error fetching user location:", error)
        );
    }
  }, [selectedUser]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!selectedUser) {
      setError("Please Select a user");
      return;
    }

    const postData = {
      title,
      body,
      userId: selectedUser,
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New post created:", data);
        setSelectedUser("");
        setTitle("");
        setBody("");
        setError("");
      })
      .catch((error) => console.error("Error creating post:", error));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-4 text-center text-blue-600">
        Coding Challenge
      </h2>
      <form onSubmit={handleFormSubmit}>
        <UserList
          users={users}
          onSelectUser={(event) => setSelectedUser(event.target.value)}
        />
        <Map userLocation={userLocation} />
        <CustomFormControl
          label="Title"
          validationFn={(value) => (!value ? "Please enter a title" : "")}
          value={title}
          onChange={setTitle}
        />
        <CustomFormControl
          label="Body"
          validationFn={(value) => (!value ? "Please enter a body" : "")}
          value={body}
          onChange={setBody}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4 focus:outline-none focus:ring focus:ring-blue-400"
        >
          Submit
        </button>
        {error && (
          <div className="text-red-500 mt-2 text-sm text-center">{error}</div>
        )}
      </form>
    </div>
  );
};

export default Form;

