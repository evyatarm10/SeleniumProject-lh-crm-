class AnalyticsPage {
    constructor(selenium) {
	    this.selenium = selenium
	}

    async navigateToAnalyticsPage() {
            await this.selenium.getURL("https://lh-crm.herokuapp.com/analytics") // navigate directly to the chosen page
    }


    async emailTypeBarCounter(){
        await this.selenium.sleep(1000)
      let counterBefore =  await this.selenium.getTextFromElement("css", "#root > div > div.analytics > div.badges > div:nth-child(2) > div.badge-val")
       console.log(counterBefore) // showing the Email sent counter
    }

     

    async checkEmailBarCounter(){
      let counterAfter = await this.selenium.getTextFromElement("css", "#root > div > div.analytics > div.badges > div:nth-child(2) > div.badge-val")
        console.log(counterAfter) // validate that the Email sent counter increment by 1 
    } 

    async outstandingBarNumber(){
        await this.selenium.sleep(1000)
      let outstadingBefore = await this.selenium.getTextFromElement("css", "#root > div > div.analytics > div.badges > div:nth-child(3) > div.badge-val")
        console.log(' the current outstanding bar number is ' + outstadingBefore)
        await this.selenium.sleep(500)
    }

    async updateSoldToClient(fullName){ // change chosen client to sold and validate by the sold bar change
        await this.selenium.write(fullName, "css", "#root > div > div.actions-container > div.update-container > table > div > input")
        await this.selenium.sleep(1000)
        await this.selenium.clickElement("xpath", "//div[text() = 'UPDATE']")
        await this.selenium.sleep(500)
        await this.selenium.clickElement("xpath", "//input[@value = 'Sold']")
        await this.selenium.sleep(500)
        let popSoldBar = await this.selenium.isElementExists("xpath", "//th[text()='Sale was declared']")

         if(popSoldBar) {
             console.log('the client approved the sold')
         } 
         if(await this.selenium.isElementExists("xpath", "//div[@class = 'error-pop-up']")){
             console.log('you did not sold to the client')
         }
    }

    async checkOutstandingBarNumber(search){ // first verify that indeed the sold is updated and then check if the bar number has changed
        await this.selenium.sleep(2000)
        await this.selenium.write(search, "xpath", "//*[@id='root']/div/div[4]/div[1]/input")
        await this.selenium.sleep(500)
        let sold = await this.selenium.getTextFromElement("css", "#root > div > div.clients-component > table > tr.clientDetails > th:nth-child(6)")

        if(sold === "YES") 
        {
            console.log(`the client sold has changed to yes`)
        } else {
            console.log('the client sold didn\'t changed')
        }
        await this.selenium.sleep(2000)
        await this.navigateToAnalyticsPage()
        await this.selenium.sleep(1000)
      let outstadingAfter = await this.selenium.getTextFromElement("css", "#root > div > div.analytics > div.badges > div:nth-child(3) > div.badge-val")
        console.log('the updated bar is now ' + outstadingAfter)
    }
    

}    

module.exports = AnalyticsPage