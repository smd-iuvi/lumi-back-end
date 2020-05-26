"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);


class App {
    

     constructor () {
      this.express = _express2.default.call(void 0, )
    }

     middlewares () {
      this.express.use(_express2.default.json())
      this.express.use(_cors2.default.call(void 0, ))
    }

     database () {

    }
}
