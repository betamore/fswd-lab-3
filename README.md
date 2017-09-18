
# Full Stack Web Development - Lab 4: GETs, POSTs, and templates

[![Greenkeeper badge](https://badges.greenkeeper.io/betamore/fswd-lab-3.svg)](https://greenkeeper.io/)

1. Fork the repository to your own Github account.
2. Clone your fork to your own machine.
3. Navigate to the clone on your machine and run `npm install`

## GETs

We already implemented a GET request in the previous labs. Remember:

```javascript
// Replaced by the public/index.html file
app.get('/', function(request, response) {
    response.end("Hello world!");
});

app.get('/:name', function(request, response) {
    response.end('Hello, ' + request.params.name + '!');
});
```

Those are both GET requests!

But what if we need the user to pass in additional information? We
could make the route (the `'/'` and `'/:name'` part of the code)
longer. What if the information we need has some default values
(i.e. not all of it is guaranteed to be there)? Are we going to need
to construct every possible combination of request parameters? That
seems silly.

### Query Strings

You can pass additional data to a GET request with a query string in the url.

    http://localhost:8000/David?lastName=Raynes&inseam=36

Specifically, the query string is after the path (`/David`). It starts
with a question mark (`?`) and is followed by any number of field and
value pairs in the form `field=value`, with each pair separated by an
ampersand (`&`).

Like the `:name` parameter that was extracted by Express for us, the
url query string parameters are also extracted and made available in
the request object (via `params`, like `name` was).

So the `lastName` field could be accessed with
`request.query.lastName`.

### Use some query strings

* Open [`http://localhost:8000/David`](http://localhost:8000/David) in
  your browser (or any other name, if you'd prefer).
* Add `?lastName=Raynes` to the url and reload (again, feel free to try another)
* Notice how the output didn't change? Yeah, go change that so your
  web application reacts to this new parameter. Your application
  should respond by adding the specified last name to the
  greeting. (e.g,
  [`http://localhost:8000/David?lastName=Raynes`](http://localhost:8000/David?lastName=Raynes)
  should result in `Hello, David Raynes!` in your browser)

Got that working? __Awesome!__

Now add another parameter to the url: `&inseam=36`. But there's a
_twist_: what do you do if the parameter is not present?

* If the `inseam` parameter is present, add an additional sentence to
  the output: `And I understand your inseam is <inseam> inches.`
* If the `inseam` parameter is not present, use the existing behavior
  to output `Hello …` to the browser.

For an additional challenge, try adding some logic to the `inseam` behavior:

* If the `inseam` parameter is larger than 34, add `Wow, you are tall!` to the output
* If the `inseam` parameter is smaller than 26, add `How is the weather down there?` to the output
* Otherwise, maintain the existing behavior

## POSTs

GETs are fun and all, but we want our apps to actually *do*
something. Step one for that is adding a form to the HTML our page
delivers.

&rarr; Insert Magic Wand Waving Here &larr;

Take a look at the updated `index.html` page by opening
[`http://localhost:8000/`](http://localhost:8000/). We're back to the
To Do app!

Try entering a new to do item in the form a clicking the add button. Doesn't work, does it?

### Implement it!

With the addition of the `body-parser` express middleware (already
incorporated), you can access the POST data with `request.body`. It
acts like `request.query`, in that it has fields and values.

Update the handler for the `/todo/new` url by having it output `Added
to do: <value of todo field>`.
