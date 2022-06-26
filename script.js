//Create a Recipe App by integrating the "TheMealDB" API's random recipe endpoint. When the page first loads, it should 
//display a random recipe, complete with a picture of the meal, name of the meal, a button to watch the YouTube video, and 
//the instructions of how to make the meal, along with the list of ingredients. When a user clicks a button called "new recipe", 
//it should show a new random and update the content on the page using JavaScript.

/*
1. 

*/

const fetchApiAndDisplay = () => {
	const mealName = document.getElementById("name"); 
	const mealPicture = document.getElementById("first-color1");
	const ingredients = document.getElementById("second-color1");
	const instructions = document.getElementById("second-color2");
	const youtube = document.getElementById("youtube");

	axios.get("https://www.themealdb.com/api/json/v1/1/random.php")

		.then(response => {
			mealObject = response.data.meals[0];
			console.log(mealObject);
			mealName.innerHTML = mealObject.strMeal;
			youtube
			
		})

}

window.onload = () => {
	fetchApiAndDisplay();
}

document.getElementById("recipe-btn").addEventListener("click", e => {
	e.preventDefault();

});