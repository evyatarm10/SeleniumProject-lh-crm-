class ClientsPage {
        constructor(selenium, logger) {
                this.selenium = selenium
                this.logger = logger
        }

        async navigateToClientsPage() {
                await this.selenium.getURL("https://lh-crm.herokuapp.com/client") // navigate directly to the chosen page
        }

        // this function check the functionality of the search bar
        async searchAndValidateClient(input, searchBy) {   //search client by name or email and validate that client found
                try {
                        await this.selenium.write(searchBy, "css", "#root > div > div.clients-component > div.search-clients > select")
                        await this.selenium.write(input, "css", "#root > div > div.clients-component > div.search-clients > input[type=text]")
                        await this.selenium.sleep(1000)
                        let name = await this.selenium.getTextFromElement("xpath", '//*[@id="root"]/div/div[4]/table/tr[2]/th[1]')
                        let email = await this.selenium.getTextFromElement("xpath", '//*[@id="root"]/div/div[4]/table/tr[2]/th[4]')
                        if (name === input || email === input) {
                                console.log(`your client\'s ${searchBy} is ${input}`)
                                this.logger.info(`your client\'s ${searchBy} is ${input}`)
                        } else {
                                console.log(`couldn't get ${input}!`)
                                this.logger.info(`couldn't get ${input}!`)
                        }
                } catch (error) {
                        console.log('the search client method has a problem' + error)
                        this.logger.error('the search client method has a problem' + error)
                }
        }

        // this method check the functionality of the clients page
        async deleteClientAndValidate(checkBy, input) { // delete client and check by pop-up then verify in the list with the search method
                try {
                        await this.selenium.write(checkBy, "css", "#root > div > div.clients-component > div.search-clients > select")
                        await this.selenium.write(input, "xpath", "//*[@id='root']/div/div[4]/div[1]/input")
                        await this.selenium.clickElement("xpath", '//*[@id="root"]/div/div[4]/table/tr[2]/th[4]')
                        await this.selenium.clickElement("className", "delete-client-popup-btn")
                        await this.selenium.sleep(500)
                        let deleteSuccess = await this.selenium.isElementExists("className", "success-pop-up")
                        console.log(deleteSuccess)
                        if (deleteSuccess) {
                                console.log(`the web page confirmed the delete action`)
                                this.logger.info(`the web page confirmed the delete action`)
                        } else {
                                console.log(`${input} is still on the list try again`)
                                this.logger.info(`${input} is still on the list try again`)
                        }
                        await this.selenium.sleep(4000)
                        await this.selenium.clearElementField("css", "#root > div > div.clients-component > div.search-clients > input[type=text]") // clear the search client filed
                        await this.selenium.sleep(3000)
                        await this.searchAndValidateClient(input, checkBy) // second validation to ensure that client is no longer in the list

                } catch (error) {
                        console.log('you have a problem with the delete method ' + error)
                        this.logger.error('you have a problem with the delete method ' + error)
                }
        }

        // this method is for negative test case
        async updateClientNameAndCheckPopup(searchBy, input, newInput) { // update client name to invalid name and verify
                try {
                        await this.selenium.write(searchBy, "css", "#root > div > div.clients-component > div.search-clients > select")
                        await this.selenium.write(input, "xpath", "//*[@id='root']/div/div[4]/div[1]/input")
                        await this.selenium.clickElement('xpath', '//*[@id="root"]/div/div[4]/table/tr[2]/th[4]')
                        await this.selenium.clearElementField("css", "#name")
                        await this.selenium.write(newInput, "css", "#name")
                        await this.selenium.clickElement("css", "#root > div > div.clients-component > div.details-pop-up-container > div > div.update-pop-up-btn > input.update-client-popup-btn")
                        await this.selenium.sleep(500)
                        let updateSuccess = await this.selenium.isElementExists("className", "success-pop-up")

                        if (updateSuccess) {
                                console.log(`there is no way that client name is ${newInput}`)
                                this.logger.info(`there is no way that client name is ${newInput}`)
                        } else {
                                console.log('the client stay\'s normal')
                                this.logger.info('the client stay\'s normal')
                        }
                        await this.selenium.sleep(4000)
                        await this.selenium.clearElementField("xpath", "//*[@id='root']/div/div[4]/div[1]/input") //clear the search client filed
                        await this.selenium.sleep(3000)
                        await this.searchAndValidateClient(newInput, searchBy) // check if the invalid name appears on the list     

                } catch (error) {
                        console.log('fix the update method ' + error)
                        this.logger.error('fix the update method ' + error)
                }
        }

        // method to validate the Email has change
        async validateEmailTypeChanged(input) {
                await this.selenium.sleep(800)
                await this.selenium.write(input, "xpath", "//input[@type = 'text']")

                if (await this.selenium.getTextFromElement("css", "#root > div > div.clients-component > table > tr.clientDetails > th:nth-child(8)") === "A" || "B" || "C" || "D") {
                        console.log('Email type has changed succssefuly')
                        this.logger.info('Email type has changed succssefuly')
                } else {
                        console.log('Email type not mach with the requested type')
                        this.logger.info('Email type not mach with the requested type')
                }
        }



        async validateSoldToClient() { // validate that the sold changed to yes
                await this.selenium.sleep(1000)
                let sold = await this.selenium.getTextFromElement("css", "#root > div > div.clients-component > table > tr.clientDetails > th:nth-child(6)")

                if (sold === "YES") {
                        console.log("the client sold has changed to yes")
                        this.logger.info("the client sold has changed to yes")
                } else {
                        console.log("the client sold didn't changed")
                        this.logger.info("the client sold didn't changed")
                }
        }
}

module.exports = ClientsPage