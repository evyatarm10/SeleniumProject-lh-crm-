class HomePage {
    constructor(selenium, logger) {
        this.selenium = selenium
        this.logger = logger
    }
    
    async navigateToHomePage() { 
        await this.selenium.getURL("https://lh-crm.herokuapp.com") // navigate directly to the chosen page
    }

    // opening the home page and click the button to redirect to the chosen page
    async goToClientsPage() { 
        await this.navigateToHomePage()
        await this.selenium.clickElement("css", "#root > div > div.navbar > a:nth-child(4) > input") 
    }

    async goToActionsPage() {
        await this.navigateToHomePage()
        await this.selenium.clickElement("css", "#root > div > div.navbar > a:nth-child(3) > input")
    }

    async goToAnalyticsPage() {
        await this.navigateToHomePage()
        await this.selenium.clickElement("css", "#root > div > div.navbar > a:nth-child(2) > input")
    }
    async close(){
        await this.selenium.close()
    }
}

module.exports = HomePage