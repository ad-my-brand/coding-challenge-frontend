// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  fetch(`https://jsonplaceholder.typicode.com/users`).then((response) => {
    return response.json();
  }).then((data) => {
    res.status(200).json({ data: data });
  }).catch((err) => {
    res.status(500).json({ err: err })
  })
}
