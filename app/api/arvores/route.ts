// Fetch data function
export const fetchTrees = async () => {
  try {
    const response = await fetch(
      'https://app.grupoerre.pt:5258/api/tree/get-trees/'
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to handle it where fetchTrees is called
  }
};
