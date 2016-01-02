Sails Isomorphic React Demo
----------

A simple demo app (a to-do list) demostrating isomorphic React served on Node.js and Sails.js.

<img src="https://github.com/desmat/sails-react-demo/blob/static/screenshot.png?raw=true"></img>


### Getting Started

```
git clone git@github.com:desmat/sails-react-demo.git
cd sails-react-demo
npm install
sails lift
```

### What is Isomorphic React?

Simply put, your React components will be rendered on the back-end AND front-end. The main benefit will be a more solid feel to the app from the user's perspective. Typical 'front-end oriented' web apps usually serve a very basic html page and let the javascript render the rest, resulting in flicker and often a perseved slow load time.

Instead this app will deliver a fully-rendered html document, often including fully rendered data-driven components, followed by typical React front-end stuff such as dynamic DOM manipulation.

Added benefits: simple urls, potentially cacheable server-side responses, better SEO support.


### How?

Basic isomorphism: 

* Create your React components normally
* Define your React routes normally

**At this point the static parts of your components will render on the back-end automatically.** The next steps will allow you to fully render data-driven components isomorphically:

* Define restful api end-points corresponding to the component
```
sails generate api Foo
```
* Associate the route with the api end-point(s) via the attribute `data`
```
<Route path="/foo" component={Foo} data="foo"/>
  <Route path="/bar" component={Bar} data="bar?a=b"/>
  <Route path="/secured" component={Secured} data="secured?userId=:userId"/>
</Route>	
```
**Note that the `data` attribute supports queries including the special query `'userId=:userId'` used to secure data behind a login wall**

* Implement the component's getInitialState and componentDidMount by pulling data from `Api.getInitial` and `Api.get` respectively
```
...
getInitialState() {
	return {data: Api.getInitial('foo')};
},  

componentDidMount() {
	Api.get('foo', function(data) { 
		/* update front-end state */
	});
},
...

```

That's it!


### But HOW?!!

By leveraging React's `renderToString` method and the React router, plus a few hacks.

Painful details here:
* https://github.com/desmat/sails-react-demo/blob/master/components/utils/ServerSideRenderer.jsx
* https://github.com/desmat/sails-react-demo/blob/master/components/utils/ClientSideRenderer.jsx
* https://github.com/desmat/sails-react-demo/blob/master/assets/js/Api.js (get and getInitial methods)


### What's Next/Limitations

* Ability to overwrite end-point implementations via ApiController and consistent use of end-point logic in ServerSideRenderer via sails.router.route()

### Notes

* To enable node debugging: http://stackoverflow.com/questions/29692155/sails-debug-command-not-working-in-sails-js#33509804, `sails debug` in a command-line, 'node-inspector' in another, open http://127.0.0.1:1337/ in a Chrome tab and http://127.0.0.1:8080/debug?port=5858 in another.
