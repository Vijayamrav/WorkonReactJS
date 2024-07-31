import React, { useState } from 'react';
import axios from 'axios';

function RecipeApp() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.edamam.com/search?q=${query}&app_id=b9e8503a&app_key=83b35450ff5b69f1fa2bb87856a343dd`);
      console.log(response.data.hits)
      setRecipes(response.data.hits);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">Recipe Search</h1>
          <div className="mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter dish name"
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            onClick={searchRecipes}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Search
          </button>

          {loading && (
            <div className="mt-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
            </div>
          )}

          <div className="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2">
            {recipes.map((recipe, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={recipe.recipe.image} alt={recipe.recipe.label} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{recipe.recipe.label}</h2>
                  <h3 className="text-lg font-medium mb-2">Ingredients:</h3>
                  <ul className="list-disc pl-5 mb-4">
                    {recipe.recipe.ingredientLines.map((ingredient, i) => (
                      <li key={i} className="text-sm text-gray-600">{ingredient}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeApp;