import React, { useState, useEffect } from "react";
import CategoryDropdown from "./CategoryDropdown";
import API from "../utils/API.js";

const card = {
  width: "48%",
  backgroundColor: "#ffffff80",
  color: "black",
  padding: " 10px",
  marginTop: "23px"
};

const cardContents = {
  display: "flex",
  justifyContent: "space-between"
};

function FavoritesRecipeCard(props) {
  const [unusedCategories, setunusedCategories] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [categories, setcategories] = useState([]);
  const [, forceUpdate] = React.useState(0);

  const addCategory = category => {
    if (category !== "Add A Category") {
      const categoryObject = {
        _id: props.recipe._id,
        category: category
      };

      API.addCategoryToRecipe(categoryObject)
        .then(res => {
          // props.getSavedRecipes();
          const newCategories = categories;

          newCategories.push(category);
          setcategories(newCategories);

          const newUnusedCategories = unusedCategories.filter(
            thisCategory => thisCategory !== category
          );
          setunusedCategories(newUnusedCategories);

          forceUpdate(n => !n);
        })
        .catch(err => console.log(err));
    }
  };

  const removeCategory = category => {
    const categoryObject = {
      _id: props.recipe._id,
      category: category
    };

    API.removeCategoryFromRecipe(categoryObject)
      .then(res => {
        const newCategories = categories.filter(
          thisCategory => thisCategory !== category
        );
        setcategories(newCategories);
        const newUnusedCategories = unusedCategories;
        newUnusedCategories.push(category);
        setunusedCategories(newUnusedCategories);
        forceUpdate(n => !n);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    setRecipe(props.recipe);
    setcategories(props.recipe.categories);

    const filterCategories = category => {
      const filtered = props.categories.filter(category => {
        if (!props.recipe.categories.includes(category)) {
          return true;
        }
        return false;
      });
      setunusedCategories(filtered);
    };

    filterCategories();
  }, [props]);

  return (
    <div style={card}>
      <a href={recipe.sourceUrl}>
        <h2>{recipe.title}</h2>
      </a>
      <div style={cardContents}>
        <img src={recipe.image} alt={recipe.title} className="img-fluid" />
        <div>
          <ul>
          <li><i class="fa fa-clock-o"></i> {recipe.readyInMinutes} Minutes</li>
          <li><i class="fa fa-users"></i> Serves: {recipe.servings}</li>
          </ul>
          <br></br>
          <ul>
          <div className = "dietary-list">
            {recipe.diets
              ? recipe.diets.map(diet => {
                return <li key={diet}><i class="fa fa-check"></i>{diet}</li>;
                })
              : null}
            </div>
          </ul>
          <ul>
            {categories
              ? categories.map(category => {
                  return (
                    <li key={category}>
                      {category}
                      <a
                        href="javascript:;"
                        onClick={() => removeCategory(category)}
                      >
                        (remove)
                      </a>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
        <div className="recipe-source">
          <p>Source: {recipe.sourceName}</p>
          </div>
          <div className="category-dropdown">
          <CategoryDropdown
            categories={unusedCategories}
            addCategory={addCategory}
            version="recipeCard"
          />
        </div>
      </div>
    </div>
  );
}

export default FavoritesRecipeCard;