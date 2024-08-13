import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeApp = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const RECIPES_PER_PAGE = 10;

  useEffect(() => {
    fetchRecipes();
  }, [currentPage]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${query || 'chicken'}&app_id=b9e8503a&app_key=83b35450ff5b69f1fa2bb87856a343dd&from=${(currentPage - 1) * RECIPES_PER_PAGE}&to=${currentPage * RECIPES_PER_PAGE}`
      );
      setRecipes(response.data.hits);
      setTotalPages(Math.ceil(response.data.count / RECIPES_PER_PAGE));
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
    setLoading(false);
  };

  const searchRecipes = async () => {
    setLoading(true);
    setCurrentPage(1); // Reset to first page on new search
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${query}&app_id=b9e8503a&app_key=83b35450ff5b69f1fa2bb87856a343dd&from=0&to=${RECIPES_PER_PAGE}`
      );
      setRecipes(response.data.hits);
      setTotalPages(Math.ceil(response.data.count / RECIPES_PER_PAGE));
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
    setLoading(false);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-6 flex flex-col justify-start sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-2xl rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">Recipe Search</h1>
          <div className="mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter dish name"
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500 shadow-md"
            />
          </div>
          <button
            onClick={searchRecipes}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            Search
          </button>
        </div>
      </div>

      <div className="relative py-3 sm:max-w-4xl sm:mx-auto mt-8">
        {loading && (
          <div className="mt-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          </div>
        )}

        <div className="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-start">
          {recipes.map((recipe, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img src={recipe.recipe.image} alt={recipe.recipe.label} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{recipe.recipe.label}</h2>
                <h3 className="text-lg font-medium mb-2">Ingredients:</h3>
                <ul className="list-disc pl-5 mb-4">
                  {recipe.recipe.ingredientLines.map((ingredient, i) => (
                    <li key={i} className="text-sm text-gray-600">{ingredient}</li>
                  ))}
                </ul>
                <h3 className="text-lg font-medium mb-2">Instructions:</h3>
                <p className="text-sm text-gray-600">Detailed instructions are not available. Please refer to the source for full instructions.</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg shadow-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg shadow-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeApp;
