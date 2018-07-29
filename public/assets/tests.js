'use strict';

define('tasks/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/task.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/task.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/task-component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/task-component.js should pass ESLint\n\n13:13 - Use closure actions, unless you need bubbling (ember/closure-actions)\n20:13 - Use closure actions, unless you need bubbling (ember/closure-actions)\n23:13 - Use closure actions, unless you need bubbling (ember/closure-actions)');
  });

  QUnit.test('controllers/tasks.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/tasks.js should pass ESLint\n\n23:39 - \'task\' is defined but never used. (no-unused-vars)\n28:17 - Unexpected console statement. (no-console)');
  });

  QUnit.test('helpers/sub.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/sub.js should pass ESLint\n\n');
  });

  QUnit.test('models/task.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/task.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/tasks.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/tasks.js should pass ESLint\n\n');
  });
});
define('tasks/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
  }
});
define('tasks/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'tasks/tests/helpers/start-app', 'tasks/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Ember.RSVP.resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };
});
define('tasks/tests/helpers/start-app', ['exports', 'tasks/app', 'tasks/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var attributes = Ember.merge({}, _environment.default.APP);
    attributes.autoboot = true;
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('tasks/tests/integration/components/add-task-component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('add-task-component', 'Integration | Component | add task component', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "2KZnIXQC",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"add-task-component\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "I/uu4YpT",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"add-task-component\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('tasks/tests/integration/components/task-component-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('task-component', 'Integration | Component | task component', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Hnu8iiHZ",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"task-component\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "3W+60Do/",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"task-component\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('tasks/tests/integration/helpers/sub-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('sub', 'helper:sub', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "GsMnyn0s",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"sub\",[[20,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('tasks/tests/test-helper', ['tasks/app', 'tasks/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('tasks/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/add-task-component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/add-task-component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/task-component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/task-component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/sub-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/sub-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/adapters/task-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/task-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/tasks-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/tasks-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/task-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/task-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/tasks-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/tasks-test.js should pass ESLint\n\n');
  });
});
define('tasks/tests/unit/adapters/task-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('adapter:task', 'Unit | Adapter | task', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('tasks/tests/unit/controllers/tasks-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:tasks', 'Unit | Controller | tasks', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('tasks/tests/unit/models/task-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('task', 'Unit | Model | task', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('tasks/tests/unit/routes/tasks-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:tasks', 'Unit | Route | tasks', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
require('tasks/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
