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

    async searchClientTest(input, searchBy) {
        await this.homePage.goToClientsPage()
        await this.clientsPage.searchAndValidateClient(input, searchBy)
    }

    async deleteClientTest(searchBy, input) {
        await this.clientsPage.navigateToClientsPage()
        await this.clientsPage.deleteClientAndValidate(searchBy, input)
    }

    async updateClientTest(searchBy, input, newInput) {
        await this.homePage.goToClientsPage()
        await this.clientsPage.updateClientNameAndCheckPopup(searchBy, input, newInput)
    }
}

let clientPageTest = new ClientsPageTest()
// clientPageTest.searchClientTest("marty@mcfly.com", "Email")
clientPageTest.deleteClientTest("Name", "Evo")
// clientPageTest.updateClientTest("Name", "Marty", "====")
