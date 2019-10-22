class ClientsPage {
        constructor(selenium) {
                this.selenium = selenium
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
                        } else {
                                console.log(`couldn't get ${input}!`)
                        }
                } catch (error) {
                        console.log('the search client method has a problem' + error)
                }
        }
        // this method check the functionality of the clients page
        async deleteClientAndValidate(checkBy, text) { // delete client and check by pop-up then verify in the list with the search method
                try {
                        await this.selenium.write(checkBy, "css", "#root > div > div.clients-component > div.search-clients > select")
                        await this.selenium.write(text, "xpath", "//*[@id='root']/div/div[4]/div[1]/input")
                        await this.selenium.clickElement("xpath", '//*[@id="root"]/div/div[4]/table/tr[2]/th[4]')
                        await this.selenium.clickElement("className", "delete-client-popup-btn")
                        await this.selenium.sleep(500)
                        let deleteSuccess = await this.selenium.isElementExists("className", "success-pop-up")
                                console.log(deleteSuccess)
                        if (deleteSuccess) {
                                console.log(`the web page confirmed the delete action`)
                        } else {
                                console.log(`${text} is still on the list try again`)
                        }
                        await this.selenium.sleep(4000)
                        await this.selenium.clearElementField("css", "#root > div > div.clients-component > div.search-clients > input[type=text]") // clear the search client filed
                        await this.selenium.sleep(3000)
                        await this.searchAndValidateClient("Marty", "Name") // second validation to ensure that client is no longer in the list

                } catch (error) {
                        console.log('you have a problem with the delete method ' + error);
                }
        }
        // this method is for negative test case
        async updateClientNameToInvalid(searchThe, inputText, newInput) { // update client name to invalid name and verify
                try {
                        await this.selenium.write(searchThe, "css", "#root > div > div.clients-component > div.search-clients > select")
                        await this.selenium.write(inputText, "xpath", "//*[@id='root']/div/div[4]/div[1]/input")
                        await this.selenium.clickElement('xpath', '//*[@id="root"]/div/div[4]/table/tr[2]/th[4]')
                        await this.selenium.clearElementField("css", "#name")
                        await this.selenium.write(newInput, "css", "#name")
                        await this.selenium.clickElement("css", "#root > div > div.clients-component > div.details-pop-up-container > div > div.update-pop-up-btn > input.update-client-popup-btn")
                        await this.selenium.sleep(500)
                        let updateSuccess = await this.selenium.isElementExists("className", "success-pop-up")

                        if (updateSuccess) {
                                console.log(`there is no way that client name is ${newInput}`)
                        } else {
                                console.log('the client stay\'s normal')
                        }
                        await this.selenium.sleep(4000)
                        await this.selenium.clearElementField("xpath", "//*[@id='root']/div/div[4]/div[1]/input") //clear the search client filed
                        await this.selenium.sleep(3000)
                        await this.searchAndValidateClient('====', "Name") // check if the invalid name appears on the list     

                } catch (error) {
                        console.log('fix the update method ' + error)
                }
        }
}

module.exports = ClientsPage