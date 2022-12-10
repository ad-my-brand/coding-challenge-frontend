export const fetchUsers = async () => {
  console.log('fetching');
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'GET',
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (formBody) => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(formBody),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
