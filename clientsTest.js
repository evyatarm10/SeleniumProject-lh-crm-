const BasePage = require("./BasePage")
const HomePage = require("./HomePage")
const ClientsPage = require("./ClientsPage")
const ActionsPage = require("./Actionspage")

class ClientsPageTest {
    constructor() {
        this.testSelenium = new BasePage().selenium
        this.clientsPage = new ClientsPage(this.testSelenium)
        this.homePage = new HomePage(this.testSelenium)
        this.actionsPage = new ActionsPage(this.testSelenium)

    }

    async searchClientTest() {
        await this.homePage.goToClientsPage()
        await this.clientsPage.searchAndValidateClient("eden@blgm.com", "Email")
    }

    async deleteClientTest() { 
        await this.clientsPage.navigateToClientsPage()
        await this.clientsPage.deleteClientAndValidate("Name", "Marty")
    }

    async updateClientTest() {
        await this.homePage.goToClientsPage()
        await this.clientsPage.updateClientNameToInvalid("Name", "Marty", "====")    
    }
}

let clientPageTest = new ClientsPageTest()
// clientPageTest.searchClientTest()
clientPageTest.deleteClientTest()
// clientPageTest.updateClientTest()
