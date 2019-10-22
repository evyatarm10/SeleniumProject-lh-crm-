const SeleniumInfra = require("./seleniumInfra")

class BasePage {
  constructor() {
    this.selenium = new SeleniumInfra() 
  }
}

module.exports = BasePage;
