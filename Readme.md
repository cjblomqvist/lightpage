
  Tiny ~900 byte Express-inspired client-side router.
  
  Based upon page.js and simplified to only contain manually 
  invoced routers with callbacks. Simplified in order to work
  better with DerbyJS - but could also be used in other cases
  when the automatic routing is not desired.

```js
page('/', index)
page('/user/:user', show)
page('/user/:user/edit', edit)
page('/user/:user/album', album)
page('/user/:user/album/sort', sort)
```

## API

### page(path, callback[, callback ...])

  Defines a route mapping `path` to the given `callback(s)`.

```js
page('/', user.list)
page('/user/:id', user.load, user.show)
page('/user/:id/edit', user.load, user.edit)
page('*', notfound)
```

  Links that are not of the same origin are disregarded
  and will not be dispatched.

### page.process(path)

  Process routes based on `path`

### page.base([path])

  Get or set the base `path`. For example if page.js
  is operating within "/blog/*" set the base path to "/blog". 

## Routing

  The router uses the same string-to-regexp conversion
  that Express does, so things like ":id", ":id?", and "*" work
  as you might expect.

  Another aspect that is much like Express is the ability to
  pass multiple callbacks. You can use this to your advantage
  to flatten nested callbacks, or simply to abstract components.

### Separating concerns

  For example suppose you had a route to _edit_ users, and a
  route to _view_ users. In both cases you need to load the user.
  One way to achieve this is with several callbacks as shown here:

```js
page('/user/:user', load, show)
page('/user/:user/edit', load, edit)
```

  Using the `*` character we could alter this to match all
  routes prefixed with "/user" to achieve the same result:

```js
page('/user/*', load)
page('/user/:user', show)
page('/user/:user/edit', edit)
```

### Default 404 behaviour

  By default when a route is not matched,
  lightpage.js will not do anything

### Working with parameters and contexts

  Compared to page.js, and Express.js, instead of
  passing around a "Context" object, only the params
  are passed to the callbacks, along with the next
  callback. This is based upon the pattern of routes
  in DerbyJS.
  
  One can for example access params passed in the
  path, for example by accessingthe ":id" passed. 
  You can do this with `params.NAME` much like 
  Express:

```js
function load(params, next){
  var id = params.id
}
```

### Working with state

  __NOTE__: Compared to page.js, there are no
  states that are being passed along. This is due to
  DerbyJS having excluded this - it's simply easier to
  access other DerbyJS-specifc state variables 
  instead.

### Matching paths

  Here are some examples of what's possible
  with the string to `RegExp` conversion.

  Match an explicit path:
  
```js
page('/about', callback)
```

  Match with required parameter accessed via `ctx.params.name`:

```js
page('/user/:name', callback)
```

  Match with several params, for example `/user/tj/edit` or
  `/user/tj/view`.

```js
page('/user/:name/:operation', callback)
```

  Match with one optional and one required, now `/user/tj`
  will match the same route as `/user/tj/show` etc:

```js
page('/user/:name/:operation?', callback)
```

  Use the wildcard char "*" to match across segments,
  available via `ctx.params[N]` where __N__ is the
  index of "*" since you may use several. For example
  the following will match `/user/12/edit`, `/user/12/albums/2/admin`
  and so on.

```js
page('/user/*', loadUser)
```

  Named wildcard accessed, for example `/file/javascripts/jquery.js`
  would provide "/javascripts/jquery.js" as `ctx.params.file`:

```js
page('/file/:file(*)', loadUser)
```

  And of course `RegExp` literals, where the capture
  groups are available via `ctx.params[N]` where __N__
  is the index of the capture group.

```js
page(/^\/commits\/(\d+)\.\.(\d+)/, loadUser)
```

### Running tests

```
$ make test
$ open http://localhost:3000
```

## License 

(The MIT License)

Copyright (c) 2012 CJ Blomqvist &lt;kontakt@bbweb.se&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.