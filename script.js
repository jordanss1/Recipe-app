//Create a Recipe App by integrating the "TheMealDB" API's random recipe endpoint. When the page first loads, it should 
//display a random recipe, complete with a picture of the meal, name of the meal, a button to watch the YouTube video, and 
//the instructions of how to make the meal, along with the list of ingredients. When a user clicks a button called "new recipe", 
//it should show a new random and update the content on the page using JavaScript.

/*
1. 

*/

/*const findIngredientsAndMeasurements = (tempLiteral, array, object) => {
	for (let i = 1; i < 20; i++) {
		let ingredients = [];

		ingredients.push(object[`tempLiteral${}`]);
		ingredients.filter(element => {
			if (element) {
				array.push(element);
			};
		});
	}
};*/

const fetchApiAndDisplay = () => {
	const mealName = document.getElementById("name"); 
	const mealPicture = document.getElementById("first-color1");
	const ingredientsDiv = document.getElementById("ingredients");
	const instructionsDiv = document.getElementById("second-color2");
	const youtube = document.getElementById("youtube");
	const imgTag = document.createElement("img");

	axios.get("https://www.themealdb.com/api/json/v1/1/random.php")

		.then(response => {
			let mealObject = response.data.meals[0];
			let meal = mealObject.strMeal;
			let mealPic = mealObject.strMealThumb;
			let finalIngredients = [];
			let finalMeasurements = [];

			if (mealObject.strYoutube === "") {
				youtube.disabled = true;
			}

			console.log(mealObject);

			mealName.innerHTML = meal;

			imgTag.setAttribute("src", mealPic);
			mealPicture.append(imgTag);

			for (let i = 1; i < 20; i++) {
				let ingredients = [];

				ingredients.push(mealObject[`strIngredient${i}`]);
				ingredients.filter(element => {
					if (element) {
						finalIngredients.push(element);
					};
				});
			}

			console.log(finalIngredients); 

			for (let i = 0; i < finalIngredients.length; i++) {
				const item = document.createElement("li");
				const list = document.createElement("ul");
				ingredientsDiv.append(list);

				item.innerHTML = finalIngredients[i];
				list.append(item);
			}

		})
}

window.onload = () => {
	fetchApiAndDisplay();
}

document.getElementById("youtube").addEventListener("click", e => {
	e.preventDefault();

	axios.get("https://www.themealdb.com/api/json/v1/1/random.php")

		.then(response => {
			let link = response.data.meals[0].strYoutube;
			window.open(link, "_blank");
		})

})

document.getElementById("recipe-btn").addEventListener("click", e => {
	e.preventDefault();

});