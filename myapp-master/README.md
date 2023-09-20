R1: Home page:

R1A: Display the name of the web application. - COMPLETED 

R1B:  Display links to other pages or a navigation bar that contains links to other pages. - COMPLETED

R2: About page: 

R2A: Display information about the web application including your name as the developer. Display a link to the home page or a navigation bar that contains links to other pages. - COMPLETED

R3: Register page:

R3A: Display a form to users to add a new user to the database. The form should consist of the following items: first name, last name, email address, username, and password.  Display a link to the home page or a navigation bar that contains links to other pages. - COMPLETED

R3B:  Collect form data to be passed to the back-end (database) and store user data in the database. Each user data consists of the following fields: first name, last name, email address, username and password. To provide security of data in storage, a hashed password should only be saved in the database, not a plain password. - COMPLETED

R3C: Display a message indicating that add operation has been done. - COMPLETED

R4: Login page:


R4A: Display a form to users to log in to the dynamic web application. The form should consist of the following items: username and password.  Display a link to the home page or a navigation bar that contains links to other pages. - COMPLETED

R4B: Collect form data to be checked against data stored for each registered user in the database. Users are logged in if and only if both username and password are correct.  - COMPLETED

R4C: Display a message indicating whether login is successful or not and why not successful. - COMPLETED

R5: Logout

There is a way to logout, a message is displayed upon successful logout. - COMPLETED

R6: Add food page (only available to logged-in users):

R6A: Display a form to users to add a new food item to the database. The form should consist of the following items: name, typical values, unit of the typical value, calories, carbs, fat, protein, salt, and sugar.  Display a link to the home page or a navigation bar that contains links to other pages. - COMPLETED

R6B:  Collect form data to be passed to the back-end (database) and store food items in the database. Each food item consists of the following fields: name, typical values, unit of the typical value, calories, carbs, fat, protein, salt, and sugar. Here is an example of a food item: - COMPLETED PARTIALLY 

R6C: Display a message indicating that add operation has been done. - COMPLETED

R7: Search food page - COMPLETED 

R7A: Display a form to users to search for a food item in the database. 'The form should contain just one field - to input the name of the food item'. Display a link to the home page or a navigation bar that contains links to other pages. - COMPLETED
 
R7B:  Collect form data to be passed to the back-end (database) and search the database based on the food name collected from the form. If food found, display a template file (ejs, pug, etc) including data related to the food found in the database to users; name, typical values, unit of the typical value, calories, carbs, fat, protein, salt, and sugar. Display a message to the user, if not found. - COMPLETED

R7C: Going beyond, search food items containing part of the food name as well as the whole food name. As an example, when searching for ‘bread’ display data related to ‘pitta bread’, ‘white bread’, ‘wholemeal bread’, and so on.- COMPLETED

R8: Update food page (only available to logged-in users) - COMPLETED PARTIALLY

R8A: Display search food form. Display a link to the home page or a navigation bar that contains links to other pages. - COMPLETED

R8B: If food found, display data related to the food found in the database to users including name, typical values, unit of the typical value, calories, carbs, fat, protein, salt, and sugar in forms so users can update each field. Display a message to the user if not found. Collect form data to be passed to the back-end (database) and store updated food items in the database. Display a message indicating the update operation has been done. You can go beyond this requirement by letting ONLY the user who created the same food item update it. - COMPLETED PARTIALLY

R8C: Implement a delete button to delete the whole record, when the delete button is pressed, it is good practice to ask 'Are you sure?' and then delete the food item from the database, and display a message indicating the delete has been done. You can go beyond this requirement by letting ONLY the user who created the same food item delete it.- NOT COMPLETED

R9: List food page (available to all users) - COMPLETED

R9A: Display all foods stored in the database including name, typical values, unit of the typical value, calories, carbs, fat, protein, salt, and sugar, sorted by name. Display a link to the home page or a navigation bar that contains links to other pages. - COMPLETED

R8B: You can gain more marks for your list page is organised in a tabular format instead of a simple list. - NOT COMPLETED

R9C: going beyond by letting users select some food items (e.g. by displaying a checkbox next to each food item and letting the user input the amount of each food item in the recipe e.g. 2x100 g flour). Then collect the name of all selected foods and calculate the sum of the nutritional information (calories, carbs, fat, protein, salt, and sugar) related to all selected food items for a recipe or a meal and display them as ‘nutritional information and calorie count of a recipe or a meal’. Please note, it is not necessary to store recipes or meals in the database. - NOT COMPLETED

R10: API
There is a basic API displayed on '/api' route listing all foods stored in the database in JSON format. i.e. food content can also be accessed as JSON via HTTP method, It should be clear how to access the API (this could include comments in code). Additional credit will be given for an API that implements get, post, push and delete.- COMPLETED

R11: form validation
All form data should have validations, examples include checking password length, email validation, integer data is integer and etc. - COMPLETED PARTIALLY
R12: Your dynamic web application must be implemented in Node.js on your virtual server. The back-end of the web application could be MongoDB or MySQL. Make sure you have included comments in your code explaining all sections of the code including database interactions. - COMPLETED

Improved the UI by adding different colours, layout in terms of positioning and font sizes