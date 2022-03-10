"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.sort.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

var _react = _interopRequireWildcard(require("react"));

require("./styles/index.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Table(_ref) {
  let {
    list,
    pageNum = 0,
    width = "100%",
    height = "auto"
  } = _ref;
  const [colNames, setColNames] = (0, _react.useState)([]);
  const [page, setPage] = (0, _react.useState)(pageNum);
  const [pageSize, setPageSize] = (0, _react.useState)(10);
  const [data, setData] = (0, _react.useState)(list);
  const [order, setOrder] = (0, _react.useState)(1);
  const [activeCategorie, setActiveCategorie] = (0, _react.useState)(Object.keys(list[0])[0]);
  (0, _react.useEffect)(() => {
    const NewColName = [];
    list.forEach(object => {
      Object.keys(object).forEach(key => {
        if (!NewColName.includes(key)) return NewColName.push(key);
      });
    });
    setColNames(NewColName);
  }, []);
  (0, _react.useEffect)(() => {
    var _document$querySelect, _document$body$queryS;

    (_document$querySelect = document.querySelectorAll(".cat-btn")) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.forEach(el => {
      el.classList.remove("active");
      el.classList.remove("reverse");
    });
    (_document$body$queryS = document.body.querySelector("".concat("." + activeCategorie))) === null || _document$body$queryS === void 0 ? void 0 : _document$body$queryS.classList.add("active");
    if (order === -1) document.body.querySelector(".active").classList.add("reverse");
    sortData();
  }, [activeCategorie, order, list]);

  const sortData = () => {
    const newData = data.sort((a, b) => {
      if (!a[activeCategorie]) return -1 * order;
      if (!b[activeCategorie]) return 1 * order;
      return a[activeCategorie].localeCompare(b[activeCategorie]) * order;
    });
    return setData([...newData]);
  };

  const createPageButton = () => {
    if (data.length / pageSize > 1) {
      const res = [];

      for (let i = 0; i < Math.ceil(data.length / pageSize); i++) {
        res.push( /*#__PURE__*/_react.default.createElement("button", {
          key: i,
          className: page === i ? "page-btn active-page-btn" : "page-btn",
          onClick: () => setPage(i)
        }, i + 1));
      }

      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, res);
    } else {
      return /*#__PURE__*/_react.default.createElement("button", {
        onClick: () => onBack()
      }, "1");
    }
  };

  const switchCategorie = categorie => {
    return activeCategorie === categorie ? setOrder(order === 1 ? -1 : 1) : setActiveCategorie(categorie);
  };

  const onBack = () => {
    setPage(page - 1 > -1 ? page - 1 : page);
  };

  const onNext = () => {
    setPage(page + 1 < data.length / pageSize ? page + 1 : page);
  };

  const getFilteredItems = query => {
    if (!query) {
      return setData(list);
    } else {
      const newData = [];
      list.forEach(object => {
        Object.keys(object).forEach(key => {
          if (object[key].toLowerCase().includes(query)) {
            if (!newData.includes(object)) return newData.push(object);
          }
        });
      });
      setData(newData);
    }
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    "data-testid": "awesome-table"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "table-header"
  }, /*#__PURE__*/_react.default.createElement("div", null, "Show", /*#__PURE__*/_react.default.createElement("select", {
    "data-testid": "select",
    className: "select-entries",
    onChange: e => setPageSize(e.target.value)
  }, /*#__PURE__*/_react.default.createElement("option", {
    "data-testid": "select-option",
    value: 10
  }, "10"), /*#__PURE__*/_react.default.createElement("option", {
    "data-testid": "select-option",
    value: 25
  }, "25"), /*#__PURE__*/_react.default.createElement("option", {
    "data-testid": "select-option",
    value: 50
  }, "50"), /*#__PURE__*/_react.default.createElement("option", {
    "data-testid": "select-option",
    value: 100
  }, "100")), "entries"), /*#__PURE__*/_react.default.createElement("input", {
    "data-testid": "search",
    type: "text",
    onChange: e => getFilteredItems(e.target.value.toLowerCase()),
    placeholder: "Search"
  })), data.length > 0 && /*#__PURE__*/_react.default.createElement("table", {
    cellSpacing: "0",
    style: {
      width: width,
      height: height,
      padding: "5px 10px"
    }
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, colNames.map((headerItem, index) => {
    return /*#__PURE__*/_react.default.createElement("th", {
      "data-testid": "colName",
      className: headerItem + " cat-btn th",
      key: index,
      onClick: () => {
        switchCategorie(headerItem);
      }
    }, (headerItem[0].toUpperCase() + headerItem.slice(1)).replace("_", " "));
  }))), /*#__PURE__*/_react.default.createElement("tbody", null, Object.values(data.slice(pageSize * page, pageSize * page + pageSize)).map((obj, index) => /*#__PURE__*/_react.default.createElement("tr", {
    className: index % 2 ? "tr-even tr" : "tr-odd tr",
    key: index
  }, Object.values(obj).map((value, index2) => /*#__PURE__*/_react.default.createElement("td", {
    key: index2
  }, value)))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "table-footer"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Showing ", page * pageSize + 1, " to ", data.length < pageSize ? data.length : pageSize, " of ", data.length), /*#__PURE__*/_react.default.createElement("div", {
    className: "page-navigation"
  }, /*#__PURE__*/_react.default.createElement("button", {
    "data-testid": "btn-navigation-back",
    onClick: onBack
  }, "Previous"), createPageButton(), /*#__PURE__*/_react.default.createElement("button", {
    "data-testid": "btn-navigation-next",
    onClick: onNext
  }, "Next"))));
}

var _default = Table;
exports.default = _default;