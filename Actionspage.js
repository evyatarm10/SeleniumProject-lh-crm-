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
    async changeEmailType(client,Owner, type) {
        try {
            await this.selenium.write(client, "css", "#root > div > div.actions-container > div.update-container > table > div > input")
            await this.selenium.write(Owner,'css', '#root > div > div.actions-container > div.update-container > table > table > tr.change-owner > th:nth-child(2) > input')
            await this.selenium.write(type, "css", "#change-email-type > th:nth-child(2) > input")
            await this.selenium.sleep(2000)
            await this.selenium.clickElement('xpath', '//*[@id="change-email-type"]/th[3]/input')
            await this.selenium.sleep(1000)

        } catch (error) {
            console.log('Email type method doesn\'t work')
        }
    }

    // method to validate the Email has change
    async validateEmailTypeChanged(input) {
        await this.selenium.write(input, "xpath", "//*[@id='root']/div/div[4]/div[1]/input")

        if (await this.selenium.getTextFromElement("css", "#root > div > div.clients-component > table > tr.clientDetails > th:nth-child(8)") ==="A" || "B" || "C" || "D") {
            console.log('Email type has changed succssefuly')
        } else {
            console.log('Email type not mach with the requested type')
        }
    }

    // method for negative test case 
    async soldToInvalidUser(Name) { // change the sold option to  yes for invalid client
        try {
            await this.addNewClient("==", "==", "=", "=", "=")
            await this.selenium.sleep(3500)
            await this.selenium.write(Name, "css", "#root > div > div.actions-container > div.update-container > table > div > input")
            await this.selenium.sleep(1000)
            await this.selenium.clickElement("xpath", '//*[@id="root"]/div/div[4]/div[1]/table/table/tr[3]/th[2]/input')
            await this.selenium.sleep(500)
            let popSoldBar = await this.selenium.isElementExists("xpath", "//th[text()='Sale was declared']")

             if(popSoldBar) {
                 console.log('the client approved the sold')
             } else {
                 console.log('you did not sold to the client')
             }

        } catch (error) {
            console.log('check your negative method' + error);
        }
    }


    async validateSoldToInvalid() { // validate that the sold changed to yes
        await this.selenium.sleep(1000)
        let sold = await this.selenium.getTextFromElement("css", "#root > div > div.clients-component > table > tr.clientDetails > th:nth-child(6)")

        if(sold === "YES")
        {
            console.log(`how did you manage to sell somthing to invalid client?? he is no one!`)
        } else {
            console.log( 'we can\'t sell to no one!!')
        }
    }
}

module.exports = ActionsPage