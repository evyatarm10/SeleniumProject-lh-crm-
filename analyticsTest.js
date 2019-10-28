const BasePage = require("./BasePage")
const ClientsPage = require("./ClientsPage")
const ActionsPage = require("./Actionspage")
const HomePage = require("./HomePage")
const AnalyticsPage = require("./AnalyticsPage")

class AnalyticsPageTest {
    constructor() {
        this.testSelenium = new BasePage().selenium
        this.clientsPage = new ClientsPage(this.testSelenium)
        this.actionsPage = new ActionsPage(this.testSelenium)
        this.homePage = new HomePage(this.testSelenium)
        this.analyticsPage = new AnalyticsPage(this.testSelenium)
    }

    async updateEmailTypeAndCheck(client, type, input) {
        await this.analyticsPage.navigateToAnalyticsPage()
        let emailCounter = await this.analyticsPage.getEmailTypeBarCounter()
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.changeEmailType(client, type) // updating email type in action page
        await this.clientsPage.navigateToClientsPage()
        await this.clientsPage.validateEmailTypeChanged(input) // 
        await this.analyticsPage.navigateToAnalyticsPage()
        let emailcounterAfter = await this.analyticsPage.getEmailTypeBarCounter()

        if (emailCounter == emailcounterAfter - 1) {
            console.log("the email counter has been updated")

        } else {
            console.log("the email counter didn't changed")

        }
    }

    async updateOutstandingAndCheck(firstName, lastName, country, owner, Email) {
        await this.analyticsPage.navigateToAnalyticsPage()
        let soldCounter = await this.analyticsPage.getOutstandingBarNumber()
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.addNewClientAndValidateSoldMessage(firstName, lastName, country, owner, Email)
        await this.clientsPage.navigateToClientsPage()
        await this.clientsPage.validateSoldToClient()
        await this.analyticsPage.navigateToAnalyticsPage()
        let soldCounterAfter = await this.analyticsPage.getOutstandingBarNumber()

        if (soldCounter == soldCounterAfter + 1) {
            console.log("the outstanding bar number has been updated")

        } else {
            console.log("the counter didn't changed")
        }
    }

    async stabilityTest() {
        for (let i = 0; i <= 10; i++) {
            await this.analyticsPage.navigateToAnalyticsPage()
            console.log("done stability test " + i)
        }
    }
}

let analyticsPageTest = new AnalyticsPageTest()
analyticsPageTest.updateEmailTypeAndCheck("Evo Mal", "C", "Evo")
// analyticsPageTest.updateOutstandingAndCheck("Evo", "Mal", "israel", "Leila Howe", "ev@mal")
// analyticsPageTest.stabilityTest()