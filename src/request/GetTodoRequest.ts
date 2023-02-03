import axios from 'axios';

export async function GetTodoRequest() {
  try {
    const { data, status } = await axios.get(
      'https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10',
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );
    // 👇️ "response status is: 200"
    console.log('response status is: ', status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}
