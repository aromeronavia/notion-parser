const DOMAnalyzer = require("./DOMAnalyzer");
const DataObserver = require("./dataObserver");

const start = async () => {
  const url =
    "https://www.notion.so/Landing-Page-748739e660884953873949122eab8700";
  const analyzer = new DOMAnalyzer(url, new DataObserver());
  await analyzer.run();
};

start();
