export default function handler(req, res) {
    console.log(req.body)

    fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body),
    }).then((response) => {
        return response.json();
    }).then((data) => {
        res.status(200).json({ data: data });
    }).catch((err) => {
        res.status(500).json({ err: err })
    })
}