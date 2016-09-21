# Full Stack Web Development - Lab 3: Wild Wild Web

* Fork the repository and clone your fork to your machine.
* Run `npm install`.
* Run `npm start`.
* Open [http://localhost:8000/](http://localhost:8000) in your browser.

## Tasks to perform

* Start by looking at `public/index.html`, then take a look at the `public/app.js` file.
* Uncomment the three `import` statements at the beginning of `public/app.js`, and then reload the page in your browser. _**MAGIC!**_
* Open your browser's javascript console (In Chrome, it's under View > Developer > JavaScript Console)
* Enter the following and see what happens:

      $("h1").text("Hiya, world!");

* In the console, run this javascript:

      $("p code").css("background-color", "blue");
* Reload the page and watch your hard work… disappear.

## Exercise!

With your newfangled knowledge of jQuery, update the function that handles the "Add Todo" button click to add a button, labeled "X" to the list item that is created. This button, when clicked, will removed that one list item from the list (and nothing more).
