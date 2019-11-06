const BasePage = require("./BasePage")
const ClientsPage = require("./ClientsPage")
const ActionsPage = require("./Actionspage")
const HomePage = require("./HomePage")
const AnalyticsPage = require("./AnalyticsPage")

class ActionTestPage {
    constructor() {
        this.Basepage = new BasePage()
        this.testSelenium = this.Basepage.selenium
        this.logger = this.Basepage.logger
        this.clientsPage = new ClientsPage(this.testSelenium, this.logger)
        this.actionsPage = new ActionsPage(this.testSelenium, this.logger)
        this.homePage = new HomePage(this.testSelenium, this.logger)
        this.analyticsPage = new AnalyticsPage(this.testSelenium, this.logger)
    }

    async addClientTest(firstName, lastName, country, owner, Email) {
        console.log('Going to add client and validate the searched parameters')
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.addNewClient(firstName, lastName, country, owner, Email)
        await this.homePage.goToClientsPage()
        await this.clientsPage.searchAndValidateClient(Email, "Email") // validation with the search method from the clients page
    }

    async changeAndValidateMailType(client, type, input) {
        console.log("coosing a client without email type, adding type fpr the client and validate")
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.changeEmailType(client, type)
        await this.clientsPage.navigateToClientsPage()
        await this.clientsPage.validateEmailTypeChanged(input)
    }

    async addNewClientAndValidateSold(firstName, lastName, country, owner, Email) {
        console.log("adding new client and changing the sold to yes then validate that the sold changed")
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.addNewClientAndValidateSoldMessage(firstName, lastName, country, owner, Email)
        await this.clientsPage.navigateToClientsPage()
        await this.clientsPage.searchAndValidateClient(Email, "Email")
        await this.clientsPage.validateSoldToClient()

    }
}

let actionTestPage = new ActionTestPage

async function testAction() {
    await actionTestPage.addClientTest("Marty", "Mcfly", "England", "Leila Howe", "marty@mcfly.com")
    await actionTestPage.changeAndValidateMailType("Marty Mcfly", "C", "Marty")
    await actionTestPage.addNewClientAndValidateSold("Real", "Madrid", "Spain", "Florentino Perez" , "Realmadid@campeones")
    actionTestPage.homePage.close()
}

testAction()
