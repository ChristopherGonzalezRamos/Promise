import { useState, useEffect } from 'react';
import './App.css';

const useImageURL = () => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImages = async () => {
      
        const response = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/photos/1", { mode: "cors" }),
          fetch("https://jsonplaceholder.typicode.com/photos/2", { mode: "cors" })
        ]);

        const data = await Promise.all(response.map(async res => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        }));

        setImageURL(data[0].url);
        setLoading(false);
      
    };

    fetchImages();
  }, []);

  return { imageURL, error, loading };
};

function App() {
  const { imageURL, error, loading } = useImageURL();

  if (loading) return <p>Page loading, please wait !!!</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    imageURL && (
      <>
        <h1>An image</h1>
        <img src={imageURL} alt={"placeholder text"} />
      </>
    )
  );
}

export default App;
