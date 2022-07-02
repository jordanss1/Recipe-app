//Create a Recipe App by integrating the "TheMealDB" API's random recipe endpoint. When the page first loads, it should 
//display a random recipe, complete with a picture of the meal, name of the meal, a button to watch the YouTube video, and 
//the instructions of how to make the meal, along with the list of ingredients. When a user clicks a button called "new recipe", 
//it should show a new random and update the content on the page using JavaScript.

/*
1. Initialised function "fetchApiAndDisplay" in order to retrieve the API data and as well as the elements in the 
HTML that would display them. The API is retrieved and stored in "response" which is then used to assign multiple
variables to the data needed for the page. These are assigned to the appropriate elements on the page. 

2. A for loop is used to loop through the "strMeasure" and "strIngredient" properties. The values are stored in 
"ingredient". Since there are a variety of values that are null or empty strings, the if condition checks if 
the element is truthy as well as if the length is above 2 to filter those out. The remaining values are pushed to
the final array. The final for loop loops through the "finalIngredients" array and for each element appends them to 
a list item which is then appended to an unordered list. 

3. To display a full recipe on page load window.onload is called with a function expression that calls the 
fetchApiAndDisplay function.

4. clearContent function is initialised to clear the content of the HTML before the new recipe is appended to the
HTML with the new recipe button. It takes all the relevant HTML elements gathered in array and the forEach method 
is called on the array to assign the elements an empty string which clears the HTML.

5. The new recipe button event listener calls the clearContent function to clear the HTML and then the 
fetchApiAndDisplay function to display the new function.

*/


const clearContent = () => {
	const mealName = document.getElementById("name"); 
	const mealPicture = document.getElementById("first-color1");
	const ingredientsDiv = document.getElementById("ingredients");
	const instructionsDiv = document.getElementById("instructions");
	const youtube = document.getElementById("youtube");
	const arrayOfElements = [mealName, mealPicture, ingredientsDiv, instructionsDiv, youtube];

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
	const anchorTag = document.createElement("a");

	axios.get("https://www.themealdb.com/api/json/v1/1/random.php")

		.then(response => {
			let mealObject = response.data.meals[0];
			let meal = mealObject.strMeal;
			let mealPic = mealObject.strMealThumb;
			let youtubeLink = mealObject.strYoutube;
			let finalIngredients = [];

			if (mealObject.strYoutube === "") {
				youtube.disabled = true;
			}

			/*youtube.addEventListener("click", e => {
				e.preventDefault();
				window.open(youtubeLink, "_blank");
			})*/

			anchorTag.setAttribute("href", youtubeLink);
			anchorTag.setAttribute( "target", "_blank");
			anchorTag.innerHTML = "Watch Video";
			youtube.append(anchorTag);
			mealName.innerHTML = meal;
			imgTag.setAttribute("src", mealPic);
			mealPicture.append(imgTag);
			instructionsDiv.innerHTML = mealObject.strInstructions;


			for (let i = 1; i < 20; i++) {
	     		let ingredient = mealObject[`strMeasure${i}`] + " " + mealObject[`strIngredient${i}`];

	     		console.log(ingredient);
	                
	       		if (ingredient.length > 2 && ingredient) {
	               finalIngredients.push(ingredient);
      			 }
			};


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


document.getElementById("recipe-btn").addEventListener("click", e => {
	e.preventDefault();
	clearContent();
	fetchApiAndDisplay();
});