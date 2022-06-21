import axios from "axios";
import { FetchInterface, PostInterface } from "./types";

export function fetchData(): Promise<FetchInterface[]> {
  let fetch = async function () {
    return await axios.get("https://jsonplaceholder.typicode.com/users");
  };

  return fetch()
    .then((res) => res.data)
    .catch((err) => err);
}

export function postData(
  data: PostInterface
): Promise<{ status: string; statusText: string }> {
  let postD = async function (d: PostInterface) {
    return await axios.post("https://jsonplaceholder.typicode.com/posts", d);
  };

  return postD(data)
    .then((e) => ({
      status: e.request.status,
      statusText: e.request.statusText,
    }))
    .catch((err) => ({
      status: err.request.status,
      statusText: err.request.statusText,
    }));
}
