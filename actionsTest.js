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
   
    async addClientTest(firstName, lastName, country, owner, Email) {
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.addNewClient(firstName, lastName, country, owner, Email)
        await this.homePage.goToClientsPage()
        await this.clientsPage.searchAndValidateClient(Email, "Email") // validation with the search method from the clients page
    }

    async changeAndValidateMailType(){
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.changeEmailType(client, type)
        await this.clientsPage.navigateToClientsPage()
        await this.clientsPage.validateEmailTypeChanged(input)
    }

    async addNewClientAndValidateSold() {
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.addNewClientAndValidateSoldMessage(firstName, lastName, country, owner, Email)
        await this.clientsPage.navigateToClientsPage()
        await this.clientsPage.searchAndValidateClient(Email, "Email")
        await this.clientsPage.validateSoldToClient()

    }
}

let actionTestPage = new ActionTestPage
actionTestPage.addClientTest("Marty", "Mcfly", "England", "Leila Howe", "marty@mcfly.com")
// actionTestPage.changeAndValidateMailType()
// actionTestPage.addNewClientAndValidateSold()