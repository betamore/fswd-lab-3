# Full Stack Web Development - Lab 3: Wild Wild Web

* Fork the repository and clone your fork to your machine.
* Run `npm install`.
* Run `npm run dev`.
* Open [http://localhost:8000/](http://localhost:8000) in your browser.

## Tasks to perform

* Start by looking at `public/index.html`, then take a look at the `public/app.js` file.
* Uncomment the three `require` statements at the beginning of `public/app.js`, and then reload the page in your browser. _**MAGIC!**_
* Open your browser's javascript console (In Chrome, it's under View > Developer > JavaScript Console)
* Enter the following and see what happens:

      $("h1").text("Hiya, world!");

* In the console, run this javascript:

      $("p code").css("background-color", "blue");
* Reload the page and watch your hard work… disappear.

## In Class Exercise

* Update the function so that the list elements that are created will disappear
  or be removed from the page when clicked.

## Homework

* Update the function to add a button `X` to the beginning of new todo list items
  that, when clicked, removes that list item from the list.
