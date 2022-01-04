<div align="center">
 <h1> <img src="https://tft.vercel.app/logo192.png" width="22px"> Form Prototype <img src="https://tft.vercel.app/logo192.png" width="22px"></h1>
 <img src="https://img.shields.io/badge/Release-v.1.0.0-brightgreen?style=plastic"/>
 <img src="https://img.shields.io/badge/Code-GODMODE-brightgreen?style=plastic"/>
 <img src="https://img.shields.io/npm/v/npm?style=plastic">
 <img src="https://img.shields.io/website?style=plastic&url=https%3A%2F%2Fform-prototype.vercel.app/"> 
 <img src="https://img.shields.io/snyk/vulnerabilities/github/VishwaGauravIn/coding-challenge-frontend"/>
 <img src="https://img.shields.io/github/license/VishwaGauravIn/coding-challenge-frontend?color=green"/>
 <img src="https://img.shields.io/github/languages/code-size/VishwaGauravIn/coding-challenge-frontend?logo=github&style=plastic">
</div>

## Requirements (Expected from this Project)
Basic Form Prototype
 - The control should accept a label.
 - The control should accept a validation function with a configurable error message.
 - The control can be incorporated inside a `<form>` and the selected option pushed up to the form.
 - The control should fire an event on change.
 - Call this `https://jsonplaceholder.typicode.com/users` to populate a list of the users. `name` should be displayed while `id` should be saved as the value in the `form`.
 - Integrate embedded maps using Google maps api or any other similar service that you prefer to show the location as listed in the above api
 - Add the required validation with the `Please select a user` error message.
 - Add 2 text fields, one for `title` and one for `body` both with required validation.
 - On submit of the form create a new post by sending the data to `https://jsonplaceholder.typicode.com/posts`. The request interface will look like:
  ```json
  {
    title: "foo",
    body: "bar",
    userId: 1
  }
  ```
 - Handle the error when any of the HTTP requests fails by displaying an appropriate error message to the user.

**Time Limit: less than 24hrs**

## What I've delivered extra
- Server limit crosses alert
- Mobile responsiveness
- Fully featured inegration of Google Maps
- Theme Changer (with persist)
- Custom Scrollbar
- Background Animation
- User Load on first instance itself
- Live Preview
- and, this documentation

### Website is Live : [form-prototype.vercel.app](https://form-prototype.vercel.app)

# Screensorts
   <img src="https://github.com/VishwaGauravIn/Images/blob/main/fp.png?raw=true">
   
# PageSpeed Insights
<img src="https://raw.githubusercontent.com/VishwaGauravIn/Images/7ceb63fff8958ab7c8e11e66d91605d855334afc/pagespeed_index_form.svg">

# Tech Used
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![FastAPI](https://img.shields.io/badge/API-005571?style=for-the-badge&logo=fastapi)

## File Structuring
   <img src="https://github.com/VishwaGauravIn/Images/blob/main/file_structuring_form.png?raw=true">
   
## Trying to run this locally? Follow this
**If you are Using NPM then:**
- **Step 1:** Fork and Download the Repository
- **Step 2:** Open it in editor like VSCode
- **Step 3:** Open Terminal inside it and run ``` npm install``` to install required dependencies (you can apply '--force' after command and then run it , incase you face any error)
- **Step 4:** Run ```npm run dev``` to launch the website on 'localhost:3000' and check if it is working without any error.
- **Step 5:** Do your Changes and make sure that you don't get any error or warning.
- **Step 6:** Push on github and Create a Pull Request 

**Stuck? Search your issue/error on Google** 

### [Play With Code](https://codesandbox.io/s/github/VishwaGauravIn/coding-challenge-frontend) 
[![CodeSandbox](https://img.shields.io/badge/Codesandbox-040404?style=for-the-badge&logo=codesandbox&logoColor=DBDBDB)](https://codesandbox.io/s/github/VishwaGauravIn/tools-for-tech)
[![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://github.dev/VishwaGauravIn/coding-challenge-frontend)

> This is a fastrack creation (<6hrs) and doesn't represent the real quality of my productions. Check my other projects for reference.
