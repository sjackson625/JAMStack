# 1. The JAMStack, AJAX and Static Site Generation

- [1. The JAMStack, AJAX and Static Site Generation](#1-the-jamstack-ajax-and-static-site-generation)
  - [1.1. Homework](#11-homework)
  - [1.2. Goals](#12-goals)
  - [1.3. Static Site Generation](#13-static-site-generation)
    - [The Jamstack](#the-jamstack)
    - [1.3.1. Eleventy](#131-eleventy)
    - [1.3.2. Initial Setup](#132-initial-setup)
    - [1.3.3. Create a Layout Template](#133-create-a-layout-template)
  - [````md](#md)
  - [pageTitle: New York Today](#pagetitle-new-york-today)
  - [Articles](#articles)
    - [1.3.4. Markdown](#134-markdown)
    - [1.3.5. Create a Collection](#135-create-a-collection)
  - [````md](#md-1)
  - [tags: page](#tags-page)
  - [Articles](#articles-1)
    - [1.3.6. Templating and Front Matter](#136-templating-and-front-matter)
      - [1.3.7. Collections](#137-collections)
      - [HTML and Markdown](#html-and-markdown)
    - [1.3.10. Simplify the Posts Collection](#1310-simplify-the-posts-collection)
    - [Commit and Deploy](#commit-and-deploy)
  - [1.4. Ajax](#14-ajax)
    - [1.4.1. Fetch](#141-fetch)
    - [1.4.2. Rest API](#142-rest-api)
    - [1.4.3. Looping](#143-looping)
    - [1.4.4. Adding Our Ajax](#144-adding-our-ajax)
  - [1.5. Notes](#15-notes)

## 1.1. Homework

- watch this video on [Fetch](https://youtu.be/Oive66jrwBs)
- create your own New York Times developer account and use it to customize your Ajax page

## 1.2. Goals

- introduce static site generation with eleventy
- introduce the Markdown language
- use templates to create html pages
- introduce templating languages

## 1.3. Static Site Generation

### The Jamstack

A "stack" is a collection of software used to solve a common problem. In web development common stacks include MEAN (MongoDB, ExpressJS, Angular and Node), MERN (MongoDB, ExpressJS, React and Node) and LAMP (Linux, Apache, MySQL, and PHP).

The [JAMstack](https://jamstack.org/what-is-jamstack/) is an architecture that pre-renders pages and uses a build process to deploy them to a content delivery network.

In terms of the [design patterns](https://github.com/front-end-foundations/FlexNav#aside---design-patterns) we examined previously, JAMstack sites are the simplest and most traditional - static HTML pages

### 1.3.1. Eleventy

As we will learned, JAMstack sites use pre-rendering tools that use a build process to create the multiple pages that comprise a web site.

[Eleventy](https://www.11ty.io/) (aka 11ty) is a simple [static site generator](https://jamstack.org/generators/) Static websites are very popular due to their simplicity, superior speed, SEO and security.

Every generator uses a template processor - software designed to combine templates with data to output documents. The language that the templates are written in is known as a template language or templating language.

The benefits of 11ty over other completing generators include the fact that it is written in JavaScript and its comparative simplicity. It uses [Liquid](https://shopify.github.io/liquid/) under the hood to make pages. Liquid is the in-house templating engine created and maintained by Shopify. You can use additional template engines with 11ty if you wish.

The most popular static site generator - Jekyll - is used at Github and is written in Ruby.

### 1.3.2. Initial Setup

Today were are building a simple multipage [static website](https://zealous-kilby-113356.netlify.com) with an [ajax connection](https://zealous-kilby-113356.netlify.com/posts/ajax/) that pulls articles from the New York Times.

Create a git `.gitignore` file at the top level targeting the node_modules folder:

```sh
node_modules
```

```sh
$ npm init -y
$ npm install --save-dev @11ty/eleventy
```

Add a script to `package.json`:

```js
"scripts": {
  "start": "eleventy --serve"
},
```

Note: since 11ty renders Markdown files we need to either delete the readme.md file in this repo or create an `.eleventyignore` file with the contents `readme.md`. Here's the [documentation](https://www.11ty.dev/docs/ignores/) for Eleventy ignore files.

### 1.3.3. Create a Layout Template

[Reference](https://www.11ty.io/docs/layouts/)

Create `_includes/layout.html` at the top level:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="/css/styles.css" />
    <title>My Blog</title>
  </head>
  <body>
    <div class="content">
      <h1>{{ pageTitle }}</h1>
      {{ content }}
    </div>
  </body>
</html>
```

Note the `{{ pageTitle }}` and `{{ content }}` template regions. Our content will be inserted there.

Add [passthroughs](https://www.11ty.dev/docs/copy/) for our static assets in an `.eleventy.js` file.

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "static/css": "css" });
  eleventyConfig.addPassthroughCopy({ "static/img": "img" });
  eleventyConfig.addPassthroughCopy({ "static/js": "js" });
};
```

This is our eleventy configuration file. It is a function that exports its contents for use by the Eleventy publishing system.

Create `index.md` on the top level with the following structure:

```md
---
pageTitle: New York Today
---

## Articles

A list of articles will apear here
```

Run `npm start` and open the localhost address in Chrome.

Note:

- the generated `_site` folder
- the conversion from markdown to html
- the files specified in our config are copied into `_site`

Link the page to our template and add more content:

````md
---
layout: layout.html
pageTitle: New York Today
---

## Articles

> Dorothy followed her through many of the beautiful rooms in her castle.

We will use `document.querySelector` and

```html
<html>
  <head> </head>
</html>
```

A list of articles will apear here
````

The index file we created has been merged with `_includes/layout` because of the `layout: layout.html` front matter instruction.

Now that the page is linked to our template it includes the `<h1>` tag referenced there `<h1>{{ pageTitle }}</h1>`.

The template uses a templating language called [liquid](https://shopify.github.io/liquid/basics/introduction/) developed by Shopify. we will be using a handfull of these. 11ty supports many templating languages.

Because the `_site` folder is generated by eleventy we can add it to our `.gitignore`.

### 1.3.4. Markdown

[Markdown](https://www.markdownguide.org/getting-started/) is an extremely simple language used extensively in web development.

It allows you to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid HTML. invented by [John Gruber](https://daringfireball.net/projects/markdown/) - it (or one of its many [flavors](https://help.github.com/en/articles/basic-writing-and-formatting-syntax)) is ubiquitous in web publishing. This readme file is written in [markdown](https://www.markdownguide.org/basic-syntax#code).

Note: many of the conventions for Markdown arose from how people used email when it was confined to simple text documents, e.g. a bulleted list:

```txt
* item one
* item two
* item three
```

- item one
- item two
- item three

### 1.3.5. Create a Collection

We wll create a collection of pages using [tags](https://www.11ty.io/docs/collections/) in our front matter.

In `pages/about.md`:

```md
---
layout: layout.html
pageTitle: About Us
tags: page
navTitle: About
---

## We are

- a group of commited citizens
- a caring community
- a force in national politics

We are New Yorkers.

[Home](/)
```

Note:

- the changes in the `_site` folder. Navigate to `http://localhost:8080/pages/about/`
- the transformation of markdown to HTML (examine the HTML in dev tools)

Create a navbar in `layout.html`:

```html
<nav>
  <ul>
    {% for page in collections.page %}
    <li>{{ page.data.navTitle }}</li>
    {% endfor %}
  </ul>
</nav>
```

Add a tag and nav title to index.md:

````md
---
layout: layout.html
pageTitle: New York Today
navTitle: Home
tags: page
---

## Articles

> Dorothy followed her through many of the beautiful rooms in her castle.

We will use `document.querySelector` and

```html
<html>
  <head> </head>
</html>
```

A list of articles will apear here
````

You should see a list of navTitles at the top.

The front matter `navTitle` and `tags` in our two pages are used in the template's navbar.

Add anchor tags to the template:

```html
<nav>
  <ul>
    {% for page in collections.page %}
    <li>
      <a href="{{ page.url | url }}">{{ page.data.navTitle }}</a>
    </li>
    {% endfor %}
  </ul>
</nav>
```

Let's a few more pages to the pages folder:

`contact.md`:

```md
---
layout: layout.html
pageTitle: Contact Us
tags: page
navTitle: Contact
---

## Here's how:

- 917 865 5517

[Home](/)
```

`pictures.md`:

```md
---
pageTitle: Apples
navTitle: Pictures
images:
  - apples.png
  - apples-red.png
  - apples-group.png
---

{% for filename in images %}
<img src="/img/{{ filename }}" alt="A nice picture of apples." />
{% endfor %}

[Home](/)
```

Navigate to `http://localhost:8080/pages/pictures/`

Link it to the template:

```md
---
layout: layout.html
pageTitle: Apples
navTitle: Pictures
tags: page
images:
  - apples.png
  - apples-red.png
  - apples-group.png
---
```

### 1.3.6. Templating and Front Matter

Recall, 11ty uses a templating software called Liquid by default. `{{ content }}` is a Liquid [object](https://shopify.github.io/liquid/basics/introduction/). If templating is new to you don't worry, it is generally quite simple and can be mastered easily.

There are many [templating languages](https://colorlib.com/wp/top-templating-engines-for-javascript/) besides Liquid (and 11ty supports most).

The material at the top between the `---`'s is called [frontmatter](https://www.11ty.io/docs/data-frontmatter/) and uses `Yaml` (Yet Another Markup Language) syntax.

#### 1.3.7. Collections

[Collections](https://www.11ty.io/docs/collections/) use tags to group content.

You can use multiple tags:

```md
---
layout: layout.html
pageTitle: Contact Us
tags:
  - page
  - contact
navTitle: Contact
---

## Here's how:

- 917 865 5517

[Home](/)
```

Note: front matter tags can be written `tags: page` or `tags: [page]` if you need multiple tags use: `tags: [page, other]`. Here's the tagging [documentation](https://www.11ty.io/docs/collections/#tag-syntax).

#### HTML and Markdown

You can use HTML in a markdown file:

```html
---
layout: layout.html
pageTitle: Contact Us
tags: page
navTitle: Contact
---

<h2>Here's how:</h2>

<ul>
  <li>917 865 5517</li>

  <a href="/">Home</a>
</ul>
```

You can use HTML files alongside markdown.

Change the name of `contact.md` to `contact.html`.

### 1.3.10. Simplify the Posts Collection

We will add additional tags that can be used to reorganize content.

Create `pages/pages.json`:

```js
{
	"layout": "layout.html",
	"tags": ["pages", "nav"]
}

```

Any document in the pages folder will inherit these properties. We can now remove the `tags` and `layout` metadata from all files in the pages directory.

E.g.: `pages/about.md`:

```md
---
pageTitle: About Us
navTitle: About
---

## We are

- a group of commited New Yorkers
- a caring community
- a force in national politics

We are New Yorkers.

[Home](/)
```

Let's use the `page` collection to display all the posts.

In `index.html` :

```md
---
layout: layout.html
pageTitle: New York Today
navTitle: Home
tags:
  - page
---

## Articles

{% for page in collections.page %}

  <h2><a href="{{ page.url }}">{{ page.data.pageTitle }}</a></h2>
  <em>{{ page.date | date: "%Y-%m-%d" }}</em>
{% endfor %}
```

Note: the `|` character in `post.date | date: "%Y-%m-%d"` is a filter. There are quite a number of [available filters](https://help.shopify.com/en/themes/liquid/filters) for example: `upcase`:

```
{% for page in collections.page %}
  <h2><a href="{{ page.url }}">{{ page.data.pageTitle | upcase }}</a></h2>
  <em>{{ page.date | date: "%Y-%m-%d" }}</em>
{% endfor %}
```

### Commit and Deploy

Commit and push your site to a new Github repository.

Sign into Netlify and create a new site from Git.

## 1.4. Ajax

Ajax allows you to get data from your own or another's service. Web services expose data in the form of an API which allows you to get, delete, update or create data via [routes](http://jsonplaceholder.typicode.com/). Today, we are solely focused on getting data.

The original [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) browser API is in widespread use. You should make yourself familiar with it, however we will be using a newer (and simpler) API called fetch.

Examine `posts/ajax.html` in VS Code:

```html
---
pageClass: ajax
pageTitle: New York Today
navTitle: Ajax
---

<h2>Ajax</h2>

<button>Click</button>

<div></div>
```

Don't worry about the `---` material at the top. It is not part of the HTML and can be ignored (we'll get to it later).

View the page in chrome.

### 1.4.1. Fetch

The `fetch()` [API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) takes one mandatory argument, the path to the resource you want to fetch. It returns something known as a Promise that, in turn, resolves to the response after the content is received.

_API_ stands for [Application Programming Interface](https://medium.freecodecamp.org/what-is-an-api-in-english-please-b880a3214a82).

### 1.4.2. Rest API

We need data we can fetch from the internet. We'll start with [Typicode](http://jsonplaceholder.typicode.com/), a site set up just to play with. Note that you can do more than just get data, you can also post, create, delete and update data. Together these functions are often refered to a `CRUD`.

Open a console in the browser.

A promise:

```sh
> fetch('https://jsonplaceholder.typicode.com/posts')
```

A resolved promise using `.then`:

```sh
> fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json())
```

Since the promise is resolved you can see the actual data in the console. It returns an array of 100 fake posts which we can console.log:

```sh
fetch('https://jsonplaceholder.typicode.com/posts/')
  .then(response => response.json())
  .then(json => console.log(json))
```

You can see the same data if you travel to `https://jsonplaceholder.typicode.com/posts/` in a new tab. Try [other resources](http://jsonplaceholder.typicode.com/) such as comments or photos.

Note the basic structure - an array of objects:

```js
[
  { ... },
  { ... }
]
```

The format is json - [JavaScript Object Notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)

Let's start out our script with event delegation.

In `scripts.js`:

```js
document.addEventListener("click", clickHandlers);

function clickHandlers() {
  console.log(event.target);
}
```

Use [matches](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches) in the context of in `if` statement to run a function:

```js
document.addEventListener("click", clickHandlers);

function clickHandlers() {
  if (event.target.matches("button")) {
    getData();
  }
}

var getData = function () {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => console.log(json));
};
```

Instead of logging the data we will call yet another function:

```js
document.addEventListener("click", clickHandlers);

function clickHandlers() {
  if (event.target.matches("button")) {
    getData();
  }
}

var addContent = function (data) {
  console.log(data);
  document.querySelector(".content div").innerText = data[1].body;
};

var getData = function () {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => addContent(json));
};
```

Note:

- `document.querySelector('.content div')` - targets an empty div
- `data[1]` - we use `[1]` to get the second entry
- `data[1].body` - we use `.` notation to access just one of the properties of the entry

For comparison, here's the XMLHttpRequest version:

```js
document.addEventListener("click", clickHandlers);

function clickHandlers() {
  console.log(event.target);
  if (event.target.matches("button")) {
    getData();
  }
}

var addContent = function (data) {
  console.log(data);
  document.querySelector(".content div").innerText = data[4].title;
};

var getData = function (data) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      addContent(JSON.parse(xhr.responseText));
    } else {
      console.log("The request failed!");
    }
  };
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
  xhr.send();
};
```

Note:

- `JSON.parse(xhr.responseText)` is similar to `response => response.json()` in the `fetch` version

### 1.4.3. Looping

Let's use the New York Times [developers](https://developer.nytimes.com/) site for our data.

```js
document.addEventListener("click", clickHandlers);

// store the link plus the API key in a variable
// https://api.nytimes.com/svc/topstories/v2/science.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0
var nyt =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0";

function clickHandlers() {
  if (event.target.matches("button")) {
    getData();
  }
}

var getData = function () {
  fetch(nyt)
    .then((response) => response.json())
    .then((json) => console.log(json));
};
```

Examine the nature of the returned data in the console. The `results` property contains the data we are interested in.

```js
document.addEventListener("click", clickHandlers);

var nyt =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=OuQiMDj0xtgzO80mtbAa4phGCAJW7GKa";

function clickHandlers() {
  if (event.target.matches("button")) {
    getData();
  }
}

var addContent = function (data) {
  // initialize an empty variable
  var looped = "";

  // use += in a for loop that uses the length of the results
  for (i = 0; i < data.results.length; i++) {
    looped += `
      <div class="item">
        <h3>${data.results[i].title}</h3>
        <p>${data.results[i].abstract}</p>
      </div>
      `;
  }
  document.querySelector(".content").innerHTML = looped;
};

var getData = function () {
  fetch(nyt)
    .then((response) => response.json())
    .then((json) => addContent(json));
};
```

Note: I've declared the variable looped _before_ I started working with it.

Something like the below wouldn't work as it resets the value everytime the for loop runs.

```js
for (i = 0; i < data.results.length; i++) {
  var looped = "";
  looped += `
      <div class="item">
        <h3>${data.results[i].title}</h3>
        <p>${data.results[i].abstract}</p>
      </div>
      `;
}
```

An alternative method (which is more advanced) might use the `map()` method on the array:

```js
document.addEventListener("click", clickHandlers);

var nyt =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=OuQiMDj0xtgzO80mtbAa4phGCAJW7GKa";

function clickHandlers() {
  if (event.target.matches("button")) {
    getData();
  }
}

var addContent = function (data) {
  var looped = data.results
    .map(
      (result) =>
        `
      <div class="item">
        <h3>${result.title}</h3>
        <p>${result.abstract}</p>
      </div>
    `
    )
    .join("");
  document.querySelector(".content").innerHTML = looped;
};

var getData = function () {
  fetch(nyt)
    .then((response) => response.json())
    .then((json) => addContent(json));
};
```

Add CSS to format the data:

```css
.ajax .content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
}

.ajax .item {
  border-bottom: 1px dashed #aaa;
}
```

Note: I've added a class `ajax` to the body tag of this page _only_.

Commit your changes and push to your github repo. A finished version of this file is available to you in the `spring2019-done` branch of this repo.

### 1.4.4. Adding Our Ajax

Add a new `ajax.html` file to the posts folder with:

```html
---
pageClass: ajax
pageTitle: New York Today
navTitle: Ajax
---

<h2>Ajax</h2>

<button>Click</button>
```

Note the new `pageClass` property. We will use this in our `layout.html` template.

Add the following to `js/scripts.js`:

```js
document.addEventListener("click", clickHandlers);

var nyt =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=OuQiMDj0xtgzO80mtbAa4phGCAJW7GKa";

function clickHandlers() {
  if (event.target.matches("button")) {
    getData();
  }
}

var addContent = function (data) {
  var looped = "";

  for (i = 0; i < data.results.length; i++) {
    looped += `
      <div class="item">
        <h3>${data.results[i].title}</h3>
        <p>${data.results[i].abstract}</p>
      </div>
      `;
  }

  document.querySelector(".content div").innerHTML = looped;
};

var getData = function () {
  fetch(nyt)
    .then((response) => response.json())
    .then((json) => addContent(json));
};
```

And edit `layout.html` to include a link (`<script src="/js/scripts.js" ></script>`) to our JavaScript file _and_ to use `pageClass` (`<body class="{{ pageClass }}">`):

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="/css/styles.css" />
    <title>My Blog</title>
  </head>
  <!-- new -->
  <body class="{{ pageClass }}">
    <nav>
      <ul>
        {% for nav in collections.nav %}
        <li
          class="nav-item{% if nav.url == page.url %} nav-item-active{% endif %}"
        >
          <a href="{{ nav.url | url }}">{{ nav.data.navTitle }}</a>
        </li>
        {%- endfor -%}
      </ul>
    </nav>

    <div class="content">
      <h1>{{ pageTitle }}</h1>

      {{ content }}
    </div>
    <!-- new -->
    <script src="/js/scripts.js"></script>
  </body>
</html>
```

Note:

- the ajax should work
- the body tag should now have the class defined in `ajax.html`

Add CSS to taste:

```css
.nav-item-active a {
  color: #fff;
  background-color: #007eb6;
  border-radius: 4px;
}

.ajax button {
  border: none;
  padding: 0.5rem 1rem;
  background: #007eb6;
  color: #fff;
  border-radius: 4px;
  font-size: 1rem;
}

.ajax .content > div {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
}

.ajax .item {
  border-bottom: 1px dashed #aaa;
}
```

Note:

- we are using the className frontmatter property to scope this page and enable the css
- the use of the `>` selector
- the use of the `.nav-item-active a` selector
- the root relative paths for the CSS and JavaScript.

If we upload this to a web server our site will [break](http://oit2.scps.nyu.edu/~devereld/session7/_site/) due to the root links.

The error reads:

`Loading failed for the <script> with source “http://oit2.scps.nyu.edu/js/scripts.js”.`

There are a number of ways to deal with this including putting a `base` tag in the head of the document:

`<base href="https://www.oit2.scps.nyu.edu.com/session7/_site">`

We'll use [Netlify](https://www.netlify.com/) to put this on the web. Register and/or log in to [app.netlify.com](https://app.netlify.com) and drag and drop the `_site` folder onto the web browser window to upload the contents [live to the web](https://zealous-kilby-113356.netlify.com/).

We can also hook into a Github branch to set up [continuous delpoyment](https://app.netlify.com/start). Here is a [sample](https://agitated-bartik-814348.netlify.com/) with [admin](https://agitated-bartik-814348.netlify.com/admin).

For more experience with 11ty, download the official 11ty blog template or, if you feel like a challenge and something fancier, try Villalobos' new [template](https://github.com/planetoftheweb/seven) or [Skeleventy](https://skeleventy.netlify.com/), or any of the starter files on the [11ty](https://www.11ty.io/docs/starter/) starter page.

## 1.5. Notes
