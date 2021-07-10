export default async function postFormData(body: Body) {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  return JSON.stringify(data, null, 2);
}

interface Body {
  id: number,
  title: string,
  body: string
}