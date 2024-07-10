import React, { useState } from 'react';
import "./index.css";
import "./App.css"
function App() {
  const [meal, setMeal] = useState("");
  const [nmeals, setNmeals] = useState("");
  const [image, setImage] = useState("");
  const [real, setReal] = useState("");

  function handleChange(e) {
    setNmeals(e.target.value);
  }

  async function handleClick() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nmeals}`);
    let data = await response.json();
    if (data.meals) {
      let instruction = data.meals[0].strInstructions;
      let photo = data.meals[0].strMealThumb;
      let youtubeUrl = data.meals[0].strYoutube;
      let videoId = youtubeUrl.split('v=')[1];
      let embedUrl = `https://www.youtube.com/embed/${videoId}`;
      setImage(photo);
      setMeal(instruction);
      setReal(embedUrl);
    } else {
      setImage("");
      setMeal("No meals found");
      setReal("");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4  ">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 text-white">Recipe Finder</h1>
      <div className="flex flex-col items-center w-full max-w-md">
        <input 
          type="text" 
          placeholder="Search for recipes..." 
          onChange={handleChange} 
          className="w-full p-3 mb-4 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button 
          onClick={handleClick} 
          className="w-full py-3 mb-6 bg-blue-500 text-white font-bold rounded shadow hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>
        {meal && (
          <div className="w-full bg-white p-4 rounded shadow-md ">
            <h2 className="text-2xl font-bold mb-4 text-white">Instructions</h2>
            <p className="text-white">{meal}</p>
          </div>
        )}
        {image && (
          <div className="w-full mb-4 rounded shadow-md overflow-hidden">
            <img src={image} alt="Meal" className="w-full" />
          </div>
        )}
        {real && (
          <div className="w-full mb-4 rounded shadow-md overflow-hidden">
            <iframe 
              width="100%" 
              height="500" 
              src={real} 
              frameBorder="0" 
              allow="autoplay; encrypted-media" 
              allowFullScreen 
            ></iframe>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;
