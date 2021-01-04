import React, {useEffect, useState} from "react";
import './App.css';
import Recipe from "./recipe";

function App() {
  const APP_ID = "770df0af";
  const APP_KEY = "1e1db34625180f6a30946814fd7a2994	";

  // useEffect(()=>{
  //   console.log("effect has been run");
  // }, [counter]); //only when counter changes then only the useEffect runs
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }//u can use promises like .then and .catch

  const updateSearch = e =>{
    setSearch(e.target.value);
  }
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit" >
          Search
        </button>
      </form>
      {recipes.map(recipe =>(
        <Recipe title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} />
      ))}
    </div>
  );
}

export default App;
