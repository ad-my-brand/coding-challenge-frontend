// import React from "react";

// const UserList = ({ users, onSelectUser }) => {
//   return (
//     <div className="mb-4">
//       <label className="block text-gray-700 text-sm font-bold mb-2">
//         Select User
//       </label>
//       <div className="relative">
//         <select
//           className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-500"
//           onChange={onSelectUser}
//         >
//           <option value="">Select a user</option>
//           {users.map((user) => (
//             <option key={user.id} value={user.id}>
//               {user.name}
//             </option>
//           ))}
//         </select>
//         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//           <svg
//             className="fill-current h-4 w-4"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 20 20"
//           >
//             <path
//               fillRule="evenodd"
//               d="M7.293 5.293a1 1 0 011.414 0L10 7.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserList;
import React from "react";

const UserList = ({ users, onSelectUser }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="userSelect" 
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Select User
      </label>
      <div className="relative">
        <select
          id="userSelect" 
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-500"
          onChange={onSelectUser}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.293 5.293a1 1 0 011.414 0L10 7.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default UserList;
