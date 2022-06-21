import axios from "axios"

// Get all Users
export function doGetAllUsers() {
    return new Promise((resolve,reject) => {
      return axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
        console.log("Get Users Response :- ",res);
        resolve(res)
      },(err) => {
        reject(err);
      })
    })
  }
  

  // Add User
export function doAddUser(user) {
  let headers = {
    "Content-Type": "application/json",
  }
  return new Promise((resolve, reject) => {
    return axios.post("https://jsonplaceholder.typicode.com/posts", JSON.stringify(user), headers).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}
