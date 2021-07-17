# Notes on implementation.
 
 - I have tried use minimum dependencies to style the form, all the layout is arranged using simple css.
 - Dropdown logic for userList is implemented in form control component itself, no external dependency have been used.
# Notes on features of the project
- Form control takes a validator function that shows error message supplied by validator function itself. It can be customised to validate with any logic and custom error message.
- Specific error message will be shown for missing field, if more than one field is missing, code logic follow priority user->title->body to show error message.
- Success and failure message after form submission has been implemented
- ** IMPORTANT ** Although I have implemented Map feature based on user location,API that was provided was outputing wrong coordinates. So google map cant find those coordinates, but it will work with right coordinates.
  
# Notes on testing
- Jest and RTL libraries were used to write test.
- Most of the test has been written with async logic. 
- Test written for fetching user list and rendering it.
- Test written for appearance of map after user has been selected
- Test written for full flow entring user,title,body and final submission.
- Test written for server failure, and appropriate notification after it.
  