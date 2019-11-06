const BasePage = require("./BasePage")
const HomePage = require("./HomePage")
const ClientsPage = require("./ClientsPage")
const ActionsPage = require("./Actionspage")

class ClientsPageTest {
    constructor() {
        this.Basepage = new BasePage()
        this.testSelenium = this.Basepage.selenium
        this.logger = this.Basepage.logger
        this.clientsPage = new ClientsPage(this.testSelenium, this.logger)
        this.homePage = new HomePage(this.testSelenium, this.logger)
        this.actionsPage = new ActionsPage(this.testSelenium, this.logger)
        
    }

    async searchClientTest(input, searchBy) {
        this.logger.info("Starting searchClientTest : ")
        await this.homePage.goToClientsPage()
        await this.clientsPage.searchAndValidateClient(input, searchBy)
    }

    async deleteClientTest(searchBy, input) {
        this.logger.info("deleteClientTest is starting :")
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
clientPageTest.deleteClientTest("Name", "Real")
// clientPageTest.updateClientTest("Name", "Marty", "====")
