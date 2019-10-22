const BasePage = require("./BasePage")
const ClientsPage = require("./ClientsPage")
const ActionsPage = require("./Actionspage")
const HomePage = require("./HomePage")
const AnalyticsPage = require("./AnalyticsPage")

class ActionTestPage {
    constructor() {
        this.testSelenium = new BasePage().selenium
        this.clientsPage = new ClientsPage(this.testSelenium)
        this.actionsPage = new ActionsPage(this.testSelenium)
        this.homePage = new HomePage(this.testSelenium)
        this.analyticsPage = new AnalyticsPage(this.testSelenium)
    }
   
    async addClientTest() {
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.addNewClient("Marty", "Mcfly", "England", "Leila Howe", "marty@mcfly.com")
        await this.homePage.goToClientsPage()
        await this.clientsPage.searchAndValidateClient("marty@mcfly.com", "Email") // validation with the search method from the clients page
    }

    async changeAndValidateMailType(){
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.changeEmailType("Marty Mcfly","Leila Howe", "B")
        await this.clientsPage.navigateToClientsPage()
        await this.actionsPage.validateEmailTypeChanged("Marty Mcfly")
    }

    async soldToInvalidClient() {
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.soldToInvalidUser("== ==")
        await this.clientsPage.navigateToClientsPage()
        await this.clientsPage.searchAndValidateClient("=", "Email")
        await this.actionsPage.validateSoldToInvalid()

    }
}

let actionTestPage = new ActionTestPage
actionTestPage.addClientTest()
// actionTestPage.changeAndValidateMailType()
// actionTestPage.soldToInvalidClient()