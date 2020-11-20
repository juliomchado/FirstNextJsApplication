"use strict";
exports.__esModule = true;
var Home_1 = require("../styles/pages/Home");
function Home() {
    var _a = useState([]), recommendedProducts = _a[0], setRecommendedProducts = _a[1];
    return (React.createElement("div", null,
        React.createElement("section", null,
            React.createElement(Home_1.Title, null, "Products"),
            React.createElement("ul", null, recommendedProducts.map(function (recommendedProducts) {
                return (React.createElement("l1", { key: recommendedProducts.id }, recommendedProducts.title));
            })))));
}
exports["default"] = Home;
