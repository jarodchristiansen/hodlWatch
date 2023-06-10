"use strict";

var _posts = require("./posts");

var _newsfeed = require("./newsfeed");

var _user = require("./user");

var _assets = require("./assets");

var _scalars = require("../scalars");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var Product = require("../models/product");

var resolvers = {
  Date: _scalars.dateScalar,
  Query: _objectSpread(
    {},
    _posts.PostResolver,
    {},
    _newsfeed.NewsFeedResolver,
    {},
    _user.UserResolver.queries,
    {},
    _assets.AssetResolver,
    {
      getProducts: function getProducts() {
        var products;
        return regeneratorRuntime.async(
          function getProducts$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return regeneratorRuntime.awrap(Product.find({}));

                case 3:
                  products = _context.sent;
                  return _context.abrupt("return", products);

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);
                  console.log(_context.t0);

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          },
          null,
          null,
          [[0, 7]]
        );
      },
      getProduct: function getProduct(_, _ref) {
        var id, product;
        return regeneratorRuntime.async(function getProduct$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                id = _ref.id;
                _context2.next = 3;
                return regeneratorRuntime.awrap(Product.findById(id));

              case 3:
                product = _context2.sent;

                if (product) {
                  _context2.next = 6;
                  break;
                }

                throw new Error("Product not found");

              case 6:
                return _context2.abrupt("return", product);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        });
      },
    }
  ),
  Mutation: _objectSpread({}, _user.UserResolver.mutations, {
    // products
    newProduct: function newProduct(_, _ref2) {
      var input, product, result;
      return regeneratorRuntime.async(
        function newProduct$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                input = _ref2.input;
                _context3.prev = 1;
                product = new Product(input);
                _context3.next = 5;
                return regeneratorRuntime.awrap(product.save());

              case 5:
                result = _context3.sent;
                return _context3.abrupt("return", result);

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](1);
                console.log(_context3.t0);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        },
        null,
        null,
        [[1, 9]]
      );
    },
    updateProduct: function updateProduct(_, _ref3) {
      var id, input, product;
      return regeneratorRuntime.async(function updateProduct$(_context4) {
        while (1) {
          switch ((_context4.prev = _context4.next)) {
            case 0:
              (id = _ref3.id), (input = _ref3.input);
              _context4.next = 3;
              return regeneratorRuntime.awrap(Product.findById(id));

            case 3:
              product = _context4.sent;

              if (product) {
                _context4.next = 6;
                break;
              }

              throw new Error("Product not found");

            case 6:
              _context4.next = 8;
              return regeneratorRuntime.awrap(
                Product.findOneAndUpdate(
                  {
                    _id: id,
                  },
                  input,
                  {
                    new: true,
                  }
                )
              );

            case 8:
              product = _context4.sent;
              return _context4.abrupt("return", product);

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    deleteProduct: function deleteProduct(_, _ref4) {
      var id, product;
      return regeneratorRuntime.async(function deleteProduct$(_context5) {
        while (1) {
          switch ((_context5.prev = _context5.next)) {
            case 0:
              id = _ref4.id;
              _context5.next = 3;
              return regeneratorRuntime.awrap(Product.findById(id));

            case 3:
              product = _context5.sent;

              if (product) {
                _context5.next = 6;
                break;
              }

              throw new Error("Producto no encontrado");

            case 6:
              _context5.next = 8;
              return regeneratorRuntime.awrap(
                Product.findOneAndDelete({
                  _id: id,
                })
              );

            case 8:
              return _context5.abrupt("return", "Producto eliminado");

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
  }),
};
module.exports = resolvers;
