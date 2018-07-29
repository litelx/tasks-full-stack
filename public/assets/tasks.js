"use strict";



define('tasks/adapters/task', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.JSONAPIAdapter.extend({
        host: 'http://tasks.local',
        namespace: 'api'
    });
});
define('tasks/app', ['exports', 'tasks/resolver', 'ember-load-initializers', 'tasks/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('tasks/components/fa-icon', ['exports', '@fortawesome/ember-fontawesome/components/fa-icon'], function (exports, _faIcon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _faIcon.default;
    }
  });
});
define('tasks/components/fontawesome-node', ['exports', '@fortawesome/ember-fontawesome/components/fontawesome-node'], function (exports, _fontawesomeNode) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _fontawesomeNode.default;
    }
  });
});
define('tasks/components/task-component', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        notEditing: true,
        originTitle: '',

        didRender: function didRender() {
            this.set('className', this.done ? 'task-done' : '');
        },

        actions: {
            isTaskDone: function isTaskDone(id, done) {
                this.set('className', !done ? 'task-done' : '');
                var title = this.get('title');
                this.sendAction('updateTask', id, title, !done);
            },
            updateTaskTitle: function updateTaskTitle() {
                this.set('originTitle', this.get('title'));
                this.set('notEditing', false);
            },
            sendUpdate: function sendUpdate(id, title, done) {
                this.set('notEditing', true);
                this.sendAction('updateTask', id, title, done);
            },
            deleteTask: function deleteTask(id) {
                this.sendAction('deleteTask', id);
            },
            cancelAddTask: function cancelAddTask() {
                this.set('notEditing', true);
            }
        }
    });
});
define('tasks/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('tasks/controllers/tasks', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        showAddNewTask: false,

        actions: {
            addNewTaskComponent: function addNewTaskComponent() {
                this.set('showAddNewTask', true);
                this.set('addNew', false);
                this.set('title', '');
            },
            addNewTask: function addNewTask() {
                var title = this.get('title');
                // new task
                var task = this.store.createRecord('task', {
                    title: title,
                    done: false
                });

                function transitionToTask(task) {
                    // console.log('transitionTotask = ', task)
                }

                function failure(reason) {
                    console.log('failure = ', reason);
                }

                task.save().then(transitionToTask).catch(failure);
                this.set('showAddNewTask', false);
            },
            cancelAddTask: function cancelAddTask() {
                this.set('showAddNewTask', false);
            }
        }
    });
});
define('tasks/helpers/app-version', ['exports', 'tasks/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    var versionOnly = hash.versionOnly || hash.hideSha;
    var shaOnly = hash.shaOnly || hash.hideVersion;

    var match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('tasks/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('tasks/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('tasks/helpers/sub', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.sub = sub;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function sub(_ref) /*, hash*/{
    var _ref2 = _slicedToArray(_ref, 2),
        param1 = _ref2[0],
        param2 = _ref2[1];

    return param1 - param2;
  }

  exports.default = Ember.Helper.helper(sub);
});
define('tasks/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'tasks/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var name = void 0,
      version = void 0;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('tasks/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('tasks/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('tasks/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('tasks/initializers/export-application-global', ['exports', 'tasks/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('tasks/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('tasks/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('tasks/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("tasks/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('tasks/models/task', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        title: _emberData.default.attr('string'),
        done: _emberData.default.attr('boolean')
    });
});
define('tasks/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('tasks/router', ['exports', 'tasks/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('tasks');
  });

  exports.default = Router;
});
define('tasks/routes/tasks', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function model() {
            var taskList = this.get('store').findAll('task');

            var doneTasksList = this.store.findAll('task').then(function (results) {
                return results.filter(function (task) {
                    return task.get('done') === true;
                });
            });
            return Ember.RSVP.hash({
                all: taskList,
                done: doneTasksList
            });
        },

        actions: {
            deleteTask: function deleteTask(id) {
                this.get('store').findRecord('task', id, { backgroundReload: false }).then(function (task) {
                    task.destroyRecord();
                });
            },
            updateTask: function updateTask(id, title, done) {
                this.get('store').findRecord('task', id, { backgroundReload: false }).then(function (responseRecord) {
                    responseRecord.set('title', title);
                    responseRecord.set('done', done);
                    responseRecord.save();
                });
            }
        }

    });
});
define('tasks/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("tasks/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "UCzUJekm", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[0,\"\\n\"],[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "tasks/templates/application.hbs" } });
});
define("tasks/templates/components/task-component", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "RSyR4OLG", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1],[0,\"\\n\"],[4,\"if\",[[20,[\"notEditing\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"list-item\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"task-details\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"container\"],[7],[0,\"\\n                \"],[6,\"label\"],[7],[0,\"\\n                    \"],[6,\"input\"],[9,\"class\",\"checkbox\"],[9,\"type\",\"checkbox\"],[9,\"name\",\"done\"],[10,\"checked\",[18,\"done\"],null],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"isTaskDone\",[20,[\"id\"]],[20,[\"done\"]]],null],null],[7],[8],[0,\"\\n                    \"],[6,\"span\"],[9,\"class\",\"checkmark\"],[7],[8],[0,\"\\n                \"],[8],[0,\"\\n            \"],[6,\"span\"],[10,\"class\",[26,[[18,\"className\"],\" task-title\"]]],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"updateTaskTitle\"],null],null],[7],[1,[18,\"id\"],false],[0,\". \"],[1,[18,\"title\"],false],[8],[0,\"\\n            \"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"task-controllers\"],[7],[0,\"\\n            \"],[6,\"div\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"deleteTask\",[20,[\"id\"]]],null],null],[7],[1,[25,\"fa-icon\",[\"times\"],[[\"size\"],[\"3x\"]]],false],[8],[0,\"\\n        \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"list-item\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"task-details\"],[7],[0,\"\\n            \"],[1,[25,\"input\",null,[[\"type\",\"value\"],[\"text\",[20,[\"originTitle\"]]]]],false],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"task-controllers\"],[7],[0,\"\\n            \"],[6,\"img\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"sendUpdate\",[20,[\"id\"]],[20,[\"originTitle\"]],[20,[\"done\"]]],null],null],[9,\"src\",\"assets/upload.svg\"],[9,\"alt\",\"upload\"],[7],[8],[0,\"\\n            \"],[6,\"div\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"cancelAddTask\"],null],null],[7],[1,[25,\"fa-icon\",[\"ban\"],[[\"size\"],[\"2x\"]]],false],[8],[0,\"\\n        \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "tasks/templates/components/task-component.hbs" } });
});
define("tasks/templates/tasks", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "g4hk0QzG", "block": "{\"symbols\":[\"task\"],\"statements\":[[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    \"],[6,\"h1\"],[7],[0,\"משימות\"],[8],[0,\"\\n    \\n    \"],[6,\"button\"],[9,\"class\",\"add-btn\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"addNewTaskComponent\"],null],null],[7],[6,\"img\"],[9,\"src\",\"/assets/plus-circle.svg\"],[9,\"alt\",\"\"],[7],[8],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"showAddNewTask\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"list-item\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"task-details\"],[7],[0,\"\\n            \"],[1,[25,\"input\",null,[[\"type\",\"value\"],[\"text\",[20,[\"title\"]]]]],false],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"task-controllers\"],[7],[0,\"\\n            \"],[6,\"div\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"addNewTask\"],null],null],[7],[1,[25,\"fa-icon\",[\"plus\"],[[\"size\"],[\"2x\"]]],false],[8],[0,\"\\n            \"],[6,\"div\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"cancelAddTask\"],null],null],[7],[1,[25,\"fa-icon\",[\"ban\"],[[\"size\"],[\"2x\"]]],false],[8],[0,\"\\n        \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"each\",[[20,[\"model\",\"all\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"li\"],[7],[1,[25,\"task-component\",null,[[\"id\",\"title\",\"done\",\"deleteTask\",\"updateTask\"],[[19,1,[\"id\"]],[19,1,[\"title\"]],[19,1,[\"done\"]],\"deleteTask\",\"updateTask\"]]],false],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\n\"],[6,\"footer\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"footer\"],[7],[0,\"\\n        \"],[6,\"span\"],[7],[0,\"לסיום: \"],[1,[25,\"sub\",[[20,[\"model\",\"all\",\"length\"]],[20,[\"model\",\"done\",\"length\"]]],null],false],[8],[0,\"\\n        \"],[6,\"span\"],[7],[0,\"הושלמו: \"],[1,[20,[\"model\",\"done\",\"length\"]],false],[8],[0,\"\\n        \"],[6,\"span\"],[7],[0,\"סה\\\"כ: \"],[1,[20,[\"model\",\"all\",\"length\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "tasks/templates/tasks.hbs" } });
});


define('tasks/config/environment', [], function() {
  var prefix = 'tasks';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("tasks/app")["default"].create({"name":"tasks","version":"0.0.0+86d77bae"});
}
//# sourceMappingURL=tasks.map
