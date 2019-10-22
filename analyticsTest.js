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

    async updateEmailTypeAndCheck(){
        await this.analyticsPage.navigateToAnalyticsPage()
        await this.analyticsPage.emailTypeBarCounter()
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.changeEmailType("Marty Mackfly", 'Leila Howe', 'C')
        await this.actionsPage.validateEmailTypeChanged("Marty Mackfly")
        await this.analyticsPage.navigateToAnalyticsPage()
        setTimeout(()=>{
            console.log("wait for a while")
        this.analyticsPage.checkEmailBarCounter()}, 3000)
    }

    async updateOutstandingAndCheck(){
        await this.analyticsPage.navigateToAnalyticsPage()
        await this.analyticsPage.outstandingBarNumber()
        await this.actionsPage.navigateToActionsPage()
        await this.analyticsPage.updateSoldToClient("Marty Mcfly")
        await this.clientsPage.navigateToClientsPage()
        await this.analyticsPage.checkOutstandingBarNumber("Marty Mcfly")
    }

    async stabilityTest(){
        for(let i=0; i<=10; i++){
        await this.analyticsPage.navigateToAnalyticsPage()
        console.log("done stability test " + i)}
    }
}

let analyticsPageTest = new AnalyticsPageTest()
// analyticsPageTest.updateEmailTypeAndCheck()
analyticsPageTest.updateOutstandingAndCheck()
// analyticsPageTest.stabilityTest()