# AdMyBrand_FE_Challenge 🚀

[![React Badge](https://img.shields.io/badge/-React-black?style=flat&logo=react)](https://reactjs.org/)
[![Leaflet Badge](https://img.shields.io/badge/-Leaflet-black?style=flat&logo=leaflet)](https://react-leaflet.js.org/)
[![Cypress Badge](https://img.shields.io/badge/-Cypress-black?style=flat&logo=cypress)](https://www.cypress.io/)
[![React Spinners Badge](https://img.shields.io/badge/-React%20Spinners-orange)](https://www.npmjs.com/package/react-spinners)
![Custom Form Control](https://img.shields.io/badge/Feature-Custom%20Form%20Control-blue)
![Notifications](https://img.shields.io/badge/Library-Notistack-purple)

## 📝 Description

This project is a frontend challenge for AdMyBrand. The primary functionality revolves around a custom form control component. This form control accepts several parameters, returning styled and state-managed input components. The main features include form submissions, fetching and displaying user details, and integrating a map to showcase user locations.

## 🚩 Features

1. **Custom FormControl Component**: This custom form control supports:
   - Custom validation functions
   - Custom error messages
   - contorl fires event on change
2. **API Integration**:
   - Make POST API calls to a free mock server.
   - Fetch and display a list of users.
3. **React-Leaflet Map Integration**: Display selected user locations on a map.
   - Provides clickable markers showing user details.
4. **Notifications**: Uses `notistack` library for responsive notifications.
   - Triggers on fetch request successes, POST request successes, and API call failures.
5. **Spinners**: Uses `react-spinners` to indicate a loading animation on api call
   - Triggers on fetch users & POST post.

## 🛠️ Technologies Used

- **React**: For the overall frontend framework.
- **Leaflet**: Integrated with React to display maps.
- **Notistack**: For creating responsive notifications/popups.
- **CSS** : Custom css for basic layout and styling
- **Cypress**: End-to-end testing framework to ensure application reliability.

## 🧪 Testing with Cypress

Several end-to-end test cases have been implemented using Cypress to ensure the reliability and functionality of the application:

- Ensure all input fields are rendered.
- Fetch user's list successfully.
- Show validation errors for empty fields upon submission.
- Successfully submit a post request.
- Ensure the form resets after submission.
- Gracefully handle API errors.
