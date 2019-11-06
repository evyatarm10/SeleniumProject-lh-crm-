class AnalyticsPage {
    constructor(selenium, logger) {
        this.selenium = selenium
        this.logger = logger
	}

    async navigateToAnalyticsPage() {
            await this.selenium.getURL("https://lh-crm.herokuapp.com/analytics") // navigate directly to the chosen page
    }

    
    async getEmailTypeBarCounter(){
        await this.selenium.sleep(2000)
      let counter =  await this.selenium.getTextFromElement("css", "#root > div > div.analytics > div.badges > div:nth-child(2) > div.badge-val")
       console.log(counter)
       this.logger.info(counter) // showing the Email sent counter
       await this.selenium.sleep(1000)
       return counter
    }

    async getOutstandingBarNumber(){
        await this.selenium.sleep(2000)
      let outstading = await this.selenium.getTextFromElement("css", "#root > div > div.analytics > div.badges > div:nth-child(3) > div.badge-val")
        console.log('the current outstanding bar number is ' + outstading)
        this.logger.info('the current outstanding bar number is ' + outstading)
        await this.selenium.sleep(1000)
        return outstading
    }
}    

module.exports = AnalyticsPage