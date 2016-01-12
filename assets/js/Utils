var _ = require('lodash');

module.exports = {

  //recursively read react router definition and extract routes to be matched later
  readReactRoutes(component) {
    //console.log('path: ' + component.props.path);
    var self = this;
    var path = typeof component.props.path !== 'undefined' ? component.props.path : '';
    var routes = {}; routes[path] = {};

    if (component.props.hasOwnProperty('children')) {
      _.each(component.props.children, function(child) { 
        var childRoutes = self.readReactRoutes(child);
        routes[path][Object.keys(childRoutes)[0]] = childRoutes[Object.keys(childRoutes)[0]];
      });
    }

    return routes;
  },

  /*
   * Given routeTree:
   * {
   *   '/': {
   *     foo: {},
   *     bar: {
   *       car: {},
   *       dar: {}
   *     }
   *   }
   * }
   * 
   * The following routes would match:
   * /foo
   * /
   * bar
   * bar/car
   */
  matchReactRoute(path, routeTree) {
    var self = this;

    //allow providing routes as string
    if (typeof(path) == 'string') return self.matchReactRoute(path.split('/'), routeTree);

    var route = path[0];
    //console.log('routes'); console.dir(routes);
    //console.log('routeTree'); console.dir(routeTree);
    //console.log('route'); console.dir(route);

    for (var i = 0; i < Object.keys(routeTree).length; i++) {
      var key = Object.keys(routeTree)[i];
      //console.log('key (' + (typeof key) + ')'); console.dir(key);
      if (key == '*' || key == route || 
          (route == '' && key == '/') ||
          (route == '/' && key == '')) {
        //console.log('match! route=' + route + ' key=' + key);

        if (path.length == 1) {
          //console.log('total match!!!');
          return true;
        }
        else {
          return self.matchReactRoute(path.splice(1, path.length), routeTree[key]);
        }
      }
    };

    return false;
  },

  /*
   * Given policies:
   * {
   *   '*': true, 
   *   'foo': {
   *     'bar': 'doBar', 
   *     '*': 'doFoo'
   *   }, 
   *   'car': false
   * }
   * 
   * Following routes would return:
   * /: true
   * /foo: true, 'doFoo'
   * foo/bar: true, 'doFoo', 'doBar'
   */
  matchPolicies(path, policies) {
    var self = this;

    //allow providing routes as string
    if (typeof(path) == 'string') return self.matchPolicies(path.split('/'), policies);
    //edge case: remove root
    if (path.length > 1 && (path[0] == '/' || path[0] == '')) return self.matchPolicies(path.slice().splice(1, path.length), policies);

    var matches = [];
    var route = path[0];

    //console.log('routes'); console.dir(routes);
    //console.log('policies'); console.dir(policies);
    //console.log('route'); console.dir(route);

    for (var i = 0; i < Object.keys(policies).length; i++) {
      var key = Object.keys(policies)[i];
      //console.log('key (' + (typeof key) + ')'); console.dir(key);
      if (key == '*' || key == route || 
          (route == '' && key == '/') ||
          (route == '/' && key == '')) {

        //console.log('match! route=' + route + ' key=' + key + ' typeof match=' + typeof(policies[key]) + ' isArray=' + (policies[key] instanceof Array));
        if (policies[key] instanceof Array || 
            typeof(policies[key]) == 'string' || 
            typeof(policies[key]) == 'boolean') {
          matches.push(policies[key]);
        }
        else if (typeof(policies[key]) == 'object' && path.length == 1) {
          //special case: sub-route includes *
          _.each(Object.keys(policies[key]), function(k) {
            if (k == '*' && (
                typeof(policies[key][k]) == 'string' || 
                typeof(policies[key][k]) == 'boolean')) {
              matches.push(policies[key][k]);
            }
          });
        }

        if (path.length > 1) {
          matches.push(self.matchRoute(path.splice(1, path.length), policies[key]));
        }
      }
    };

    return _.flatten(matches);;
  },

};
