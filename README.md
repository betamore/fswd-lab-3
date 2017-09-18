
# Full Stack Web Development - Lab 3
## Express GETs, POSTs, and Pug templates

[![Greenkeeper badge](https://badges.greenkeeper.io/betamore/fswd-lab-3.svg)](https://greenkeeper.io/)

1. Fork the repository to your own Github account.
2. Clone your fork to your own machine.
3. Navigate to the clone on your machine and run `npm install`

### Static Files and Middleware

Express has a concept called [middleware](http://expressjs.com/en/guide/using-middleware.html).
Middleware, at a basic level, is a function that is run against every request
that comes in to the server. The [static middleware](https://expressjs.com/en/starter/static-files.html)
will check to see if a given request matches a file on the filesystem and, if one
matches, it will send the contents of that file as the response. Note that a request
for `/` is effectively equivalent to requesting `/index.html`; it is a long standing
[web convention](https://en.wikipedia.org/wiki/Webserver_directory_index). The
Express server in this lab is configured to look for these files in the `public/`
directory:

```javascript
// Add the static middleware, pointed at the ./public directory
app.use(express.static('public'));
```

Start the Express server with the command `npm run dev`. Make a request to
`http://localhost:8000` with your browser. View the page source (in Chrome,
control-click or right click) in the browser and select 'View Page Source'.

Try making a request to the server using the `http` command from last class.

```bash
$ http localhost:8000
HTTP/1.1 200 OK
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Connection: keep-alive
Content-Length: 182
Content-Type: text/html; charset=UTF-8
Date: Mon, 18 Sep 2017 02:21:37 GMT
ETag: W/"b6-15e92ca63f8"
Last-Modified: Mon, 18 Sep 2017 02:21:31 GMT
X-Powered-By: Express

<html>
  <head>
    <title>Hello world!</title>
  </head>
  <body>
    <h1>Hello world!</h1>
    <p>This is coming from the <code>public/index.html</code> file</p>
  </body>
</html>
```

What looks different here from the server we wrote using node's `http` module
and its `createServer` function?

Now open the `public/index.html` file in your text editor. Change the text
between `<h1>` and `</h1>` to be `Hiya world!` (or something else if you'd prefer)
and reload the page in your browser.

How is this different than the server from last class? *Why* is it different?

### GETs

Express can be configured to respond to `GET` requests with a function instead of a file.
Add the following code to `./lib/server.js` (before `module.exports = app;`) and
restart your server (`Control-C` and then run `npm run dev`).

```javascript
app.get('/', function(request, response) {
    response.end('Hello world!');
});
```

Make a request to [`http://localhost:8000`](http://locahost:8000) now.

Still see the `public/index.html` contents? Express processes requests in the order
that your code establishes. The static middleware matches the request with
`public/index.html` and then tells Express that no more processing is necessary.

Try to make your server respond with the function you just added instead of the
HTML file.

#### Matching URLs

Like the last lab, write a function to respond to a request to `/David` with
`Hello, David!`.

```javascript
app.get('/David', function(request, response) {
    response.end('Hello, David!');
});
```

What about `/John`? `/Lee`? `/Allison`? Like the last lab, we can write code that
will take the currently requested URL into account when generating the response.
You can write a URL for Express to match that, instead of having a fixed value,
will match based on a pattern: `'/:name'`. The `:name` portion of the URL will
match anything up until the next `/`, and the part that matched it will be made
available on the `params` property of the `request` object (_e.g._, `request.params.name`)
that is passed to the function.

```javascript
app.get('/:name', function(request, response) {
    response.end('Hello, ' + request.params.name + '!');
});
```

But what if we need the user to pass in additional information? We
could make the route (the `'/'` and `'/:name'` part of the code)
longer. What if the information we need has some default values
(i.e. not all of it is guaranteed to be there)? Are we going to need
to construct every possible combination of request parameters? That
seems silly.

#### Query Strings

You can pass additional data to a GET request with a query string in the url.

```
http://localhost:8000/David?lastName=Raynes&inseam=36
```

Specifically, the query string is after the path (`/David`). It starts with a
question mark (`?`) and is followed by any number of field and value pairs in
the form `field=value`, with each pair separated by an ampersand (`&`).

Like the `:name` parameter that was extracted by Express for us, the url query
string parameters are also extracted and made available in the request object
via the `query` property. So the `lastName` field could be accessed with
`request.query.lastName`.

##### Use some query strings

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

### POSTs

GETs are fun and all, but we want our apps to actually *do* something. Step one
for that is adding a form to the HTML our page delivers. Or, for the time being,
just making a `POST` request with the `http` tool:

```bash
$ http -f POST localhost:8000 field=value
POST / HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 11
Content-Type: application/x-www-form-urlencoded; charset=utf-8
Host: localhost:8000
User-Agent: HTTPie/0.9.9

field=value

HTTP/1.1 404 Not Found
Connection: keep-alive
Content-Length: 140
Content-Security-Policy: default-src 'self'
Content-Type: text/html; charset=utf-8
Date: Mon, 18 Sep 2017 03:04:46 GMT
X-Content-Type-Options: nosniff
X-Powered-By: Express

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot POST /</pre>
</body>
</html>
```

How does the request look different from the `GET`s from earlier? We're making a
request to `/`, so why are we getting a 404 response?

Just like `app.get()`, Express has an `app.post()` function to tell Express how
to handle a POST request. By default, Express does nothing with the data in a POST
request, so we need to add some middleware to gather that data for us, specifically
the `body-parser` middleware.

```bash
npm install --save body-parser
```

```javascript
var bodyParser = require('body-parser');

// to extract form data from POST bodies
app.use(bodyParser.urlencoded({ extended: true }));
```

Remember that Express runs through middlewares and request handlers in order, so
that `app.use()` needs to be before the `app.post()` in your code. The middleware
makes the POST request data available on the `body` property of the `request`
object (`request.body.field`).

```javascript
app.post('/', function(request, response) {
    response.end('Value of field is ' + request.body.field);
});
```

Verify that making a POST request to your server works as expected.

```bash
$ http -f --verbose POST localhost:8000 field=value
POST / HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 11
Content-Type: application/x-www-form-urlencoded; charset=utf-8
Host: localhost:8000
User-Agent: HTTPie/0.9.9

field=value

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 5
Date: Mon, 18 Sep 2017 03:21:38 GMT
X-Powered-By: Express

value
```

Notice that the response headers for the POST request are different than the
ones for the GET request. Why do you think that is the case?

### Using templates instead of text

As much fun as sending the browser plain strings may be, users these days expect
something a bit fancier. Enter [pug](http://pugjs.org) (or one of a number of other
template languages).

#### Adding the package to the project

```bash
npm install --save pug
```

```javascript
app.set('view engine', 'pug');
app.set('views', './views');
```

#### The templates themselves

The pug template language centers around the structure of the HTML document itself.
Pug uses the indentation to determine where in the structure a particular element
falls, then the first word of the line to determine the element to generate, and
the rest of the text to determine the content of the element.

Create the `views/` directory: `mkdir views` (or add the folder in your text editor).
Then create the `views/index.pug` file.

```pug
//- views/index.pug
html
    head
        title Hello world!

    body
        h1 Hello world!
        p This is coming from the #[code views/index.pug] file
```

#### Using the templates

The templates do not automatically get used by Express; you have to tell it when
you want to use a template to generate the HTML to send in the response. To do that,
use the `render` method on the `response` object (`response.render('templateFile')`).

```javascript
app.get('/', function(request, responses) {
    response.render('index');
});
```

What advantages to templates have over simple strings? Any disadvantages?

#### Passing information to templates

The `render` method also accepts a second argument: an object containing names
(and corresponding values) to send to the template, where you can use those names
as variables in the template.

```javascript
app.get('/', function(request, response) {
    response.render('index', { name: 'world'});
});
```

And inside the template, you can use that as a variable in a couple ways:

* `#{variableName}` inside a larger string of text will insert the value
* `element= variableName` will generate an element with the value as the contents

```pug
//- views/index.pug
html
    head
        title Hello #{name}!

    body
        h1 Hello #{name}!
        h2= name
        p This is coming from the #[code views/index.pug] file

```

#### Layouts

Templates can also make use of a larger template to generate a common set of HTML
by using the `extends` keyword along with the `block` keyword.

```pug
//- views/index.pug
extends ./layout

block bodyContents
    h1 Hello #{name}!
    h2= name
    p This is coming from the #[code views/index.pug] file
```

And in that larger template, the `block` keyword is then used to determine where
the contents of the template are inserted into the larger HTML document.

```pug
//- views/layout.pug
html
    head
        title Hello world!
    body
        block bodyContents
```    
