class ActionsPage {
    constructor(selenium) {
        this.selenium = selenium
    }

    async navigateToActionsPage() {
        await this.selenium.getURL("https://lh-crm.herokuapp.com/actions") // navigate directly to the chosen page
    }
    // method to add a new client
    async addNewClient(firstName, lastName, country, owner, Email) {
        try {
            await this.selenium.write(firstName, "id", "firstName")
            await this.selenium.write(lastName, "id", "lastName")
            await this.selenium.write(country, "id", "country")
            await this.selenium.write(owner, "css", "input[id='owner']")
            await this.selenium.write(Email, "id", "email")
            await this.selenium.clickElement("className", "add-client-btn")


        } catch (error) {
            console.log('check your addnewuser method')
        }
    }

    // method that change Email type
    async changeEmailType(client, type) {
        try {
            await this.selenium.write(client, "xpath", "//input[@list = 'names']")
            await this.selenium.write(type, "xpath", "//input[@list = 'emailType']")
            await this.selenium.sleep(500)
            await this.selenium.clickElement("xpath", "//div[text() = 'UPDATE']")
            await this.selenium.sleep(1000)
            await this.selenium.clickElement('xpath', "//input[@value = 'Send']")
            await this.selenium.sleep(1000)

        } catch (error) {
            console.log('Email type method doesn\'t work')
        }
    }



    // method to add new client and update him to sold (this can be a negative case by adding an invalid client)
    async addNewClientAndValidateSoldMessage(firstName, lastName, country, owner, Email) { // change the sold option to  yes for the client
        try {
            await this.addNewClient(firstName, lastName, country, owner, Email)
            await this.selenium.sleep(3500)
            await this.selenium.write(firstName + " " + lastName, "xpath", "//input[@list = 'names']")
            await this.selenium.clickElement("xpath", "//div[text() = 'UPDATE']")
            await this.selenium.sleep(500)
            await this.selenium.clickElement("xpath", "//input[@value = 'Sold']")
            await this.selenium.sleep(500)
            let popSoldBar = await this.selenium.isElementExists("xpath", "//th[text()='Sale was declared']")

            if (popSoldBar) {
                console.log('the client approved the sold')
            }
            if (await this.selenium.isElementExists("xpath", "//div[@class = 'error-pop-up']")) {
                console.log('you did not sold to the client')
            }

        } catch (error) {
            console.log('check your negative method' + error)
        }
    }
}

module.exports = ActionsPage