export const recipeData = {
  ingredients: [
    { ingredient_id: 1, name: '감자' },
    { ingredient_id: 2, name: '당근' },
    { ingredient_id: 3, name: '토마토' },
    { ingredient_id: 4, name: '밀가루' },
    { ingredient_id: 5, name: '피망' },
    { ingredient_id: 6, name: '치즈' },
  ],
  recipes: [
    {
      recipe_id: 1,
      main_image: 'images/recipe_detail/potato_stirfry.jpeg',
      recipe_name: '감자볶음',
      mean_rating: 4.5,
      comment_count: 3,
      nickname: '만개의레시피',
      method: '볶기',
      occation: '일상',
      kind: '비건',
    },
    {
      recipe_id: 2,
      main_image: 'images/recipe_detail/pizza.jpeg',
      recipe_name: '피자',
      mean_rating: 4.2,
      comment_count: 1,
      nickname: '만개의레시피',
      method: '굽기',
      occation: '손님접대',
      kind: '비건',
    },
  ],
};
