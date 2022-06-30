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

const clearContent = () => {
	const mealName = document.getElementById("name"); 
	const mealPicture = document.getElementById("first-color1");
	const ingredientsDiv = document.getElementById("ingredients");
	const measurementsDiv = document.getElementById("measurements");
	const instructionsDiv = document.getElementById("instructions");
	const youtube = document.getElementById("youtube");
	const arrayOfElements = [mealName, mealPicture, ingredientsDiv, measurementsDiv, instructionsDiv];

	arrayOfElements.forEach(element => {
		element.innerHTML = "";
	});

}


const fetchApiAndDisplay = () => {
	const mealName = document.getElementById("name"); 
	const mealPicture = document.getElementById("first-color1");
	const ingredientsDiv = document.getElementById("ingredients");
	const measurementsDiv = document.getElementById("measurements");
	const instructionsDiv = document.getElementById("instructions");
	const youtube = document.getElementById("youtube");
	const imgTag = document.createElement("img");

	axios.get("https://www.themealdb.com/api/json/v1/1/random.php")

		.then(response => {
			let mealObject = response.data.meals[0];
			let meal = mealObject.strMeal;
			let mealPic = mealObject.strMealThumb;
			let youtubeLink = mealObject.strYoutube;
			let finalIngredients = [];
			let finalMeasurements = [];

			if (mealObject.strYoutube === "") {
				youtube.disabled = true;
			}

			youtube.addEventListener("click", e => {
				e.preventDefault();
				window.open(youtubeLink, "_blank");
			})


			console.log("meal", mealObject);

			mealName.innerHTML = meal;

			imgTag.setAttribute("src", mealPic);
			mealPicture.append(imgTag);


			for (let i = 1; i < 20; i++) {
				let element = mealObject[`strMeasure${i}`]
				if (element !== " " || element !== "" || element !== null) {
					console.log(element);
					finalMeasurements.push(element);
				}
			}

			finalMeasurements.filter(item => {
				if (item !== "") {
					return item;
				}
			})
	 		console.log(finalMeasurements);

			for (let i = 1; i < 20; i++) {
				let ingredients = [];

				ingredients.push(mealObject[`strIngredient${i}`]);
				console.log(ingredients);
				ingredients.filter(element => {
					if (element) {
						finalIngredients.push(element);
					};
				});
			}

			for (let i = 0; i < finalIngredients.length; i++) {
				const item = document.createElement("li");
				const list = document.createElement("ul");
				ingredientsDiv.append(list);

				item.innerHTML = finalIngredients[i];
				list.append(item);
			}

			for (let i = 0; i < finalMeasurements.length; i++) {
				const item = document.createElement("li");
				const list = document.createElement("ul");
				measurementsDiv.append(list);

				item.innerHTML = finalMeasurements[i];
				list.append(item);
			}

			instructionsDiv.innerHTML = mealObject.strInstructions;

		})
}

window.onload = () => {
	fetchApiAndDisplay();
}

document.getElementById("recipe-btn").addEventListener("click", e => {
	e.preventDefault();
	clearContent();
	fetchApiAndDisplay();
});