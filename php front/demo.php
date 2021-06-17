<!DOCTYPE html>
<html>
<head>
<script type="text/javascript" src="GameUrlsTest.js"></script>
<script type="text/javascript"></script>

</head>
<body>

<div id="demo">

<h1>The XMLHttpRequest Object</h1>

<form method="POST" onsubmit="return add(value)">
<select name="customers">
<option value="Please select a user">Please select a user</option>
<option value= 1 >Leanne Graham</option>
<option value= 2 >Ervin Howell</option>
<option value= 3 >Clementine Bauch</option>
<option value= 4 >Patricia Lebsack</option>
<option value= 5 >Chelsey Dietrich</option>
<option value= 6 >Mrs. Dennis Schulist</option>
<option value= 7 >Kurtis Weissnat</option>
<option value= 8 >Nicholas Runolfsdottir V</option>
<option value= 9 >Glenna Reichert</option>
<option value= 10 >Clementina DuBuque</option>
</select>
<br>
<br>

Title: <input type="text" name="title">
<br>
<br>

Body: <input type = "text" name="body">

<br>
<button type="submit">Submit</button>
</form>

<script>
function add(value){
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: title,
    body: body,
    userId: value,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
}
</script>
//var gameUrlObj = new GameUrlsTest();
</div>


</body>
</html>
