import CardsController from "./../controllers/cardsController.js";
import CardsView from "./../views/cardsView.js";
import CardsService from "./../services/cardsService.js";

const cardListWorker = new Worker("./src/workers/cardListWorker.js", {
  type: "module",
});

console.log(cardListWorker);

cardListWorker.postMessage({ hello: "hello" });

const [rootPath] = window.location.href.split("/pages/");
const factory = {
  async initialize() {
    return CardsController.initialize({
      view: new CardsView(),
      service: new CardsService({ 
        cardListWorker,
        dbUrl: `${rootPath}/assets/database.json` }),
    });
  },
};

export default factory;
