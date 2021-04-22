import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Before(() => {
    cy.server()
})

const selectSelectValue = (selectSelector, optionValue) => {
    cy.get(selectSelector).click()
    return cy.get(`[data-value="${optionValue}"]`).click()
}

Given('the user is adding a new gateway with type SMPP', () => {
    cy.route({
        url: /\/gateways.json$/,
        method: 'GET',
        response: { gateways: [] },
    })

    cy.route({
        url: /gateways/,
        method: 'POST',
        response: {},
    }).as('createGatewayConfigurationXHR')

    cy.visitWhenStubbed('/')
    cy.get('{shared-navigationitem}:nth-child(2)').click()
    cy.get('{views-gatewayconfiglist-add}').click()

    selectSelectValue(
        '{views-gatewayconfigformnew-gatewaytype} [data-test="dhis2-uicore-singleselect"]',
        'smpp'
    )
})

When('the user fills in complete form data', () => {
    const name = 'Name'
    const systemId = 'Username'
    const host = 'localhsot'
    const systemType = 'VMS'
    const port = '5000'
    const password = 'pass word'
    const numberPlanIndicator = 'UNKNOWN'
    const typeOfNumber = 'INTERNATIONAL'
    const bindType = 'BIND_TX'
    const compressed = false

    cy.get('{smsgateway-fieldgatewayname}').type(name)
    cy.get('{smsgateway-fieldsystemid}').type(systemId)
    cy.get('{smsgateway-fieldhost}').type(host)
    cy.get('{smsgateway-fieldsystemtype}').type(systemType)
    selectSelectValue(
        '{smsgateway-fieldnumberplanindicator} [data-test="dhis2-uicore-singleselect"]',
        numberPlanIndicator
    )
    selectSelectValue(
        '{smsgateway-fieldtypeofnumber} [data-test="dhis2-uicore-singleselect"]',
        typeOfNumber
    )
    selectSelectValue(
        '{smsgateway-fieldbindtype} [data-test="dhis2-uicore-singleselect"]',
        bindType
    )
    cy.get('{smsgateway-fieldport}').type(port)
    cy.get('{smsgateway-fieldpassword}').type(password)

    cy.wrap({
        type: 'smpp',
        name,
        systemId,
        host,
        systemType,
        port,
        password,
        numberPlanIndicator,
        typeOfNumber,
        bindType,
        compressed,
    }).as('gatewayData')
})

When('the user fills in incomplete form data', () => {
    const systemId = 'Username'
    const host = 'localhsot'
    const systemType = 'VMS'
    const port = '5000'
    const password = 'pass word'
    const numberPlanIndicator = 'UNKNOWN'
    const typeOfNumber = 'INTERNATIONAL'
    const bindType = 'BIND_TX'
    const compressed = false

    cy.get('{smsgateway-fieldsystemid}').type(systemId)
    cy.get('{smsgateway-fieldhost}').type(host)
    cy.get('{smsgateway-fieldsystemtype}').type(systemType)
    selectSelectValue(
        '{smsgateway-fieldnumberplanindicator} [data-test="dhis2-uicore-singleselect"]',
        numberPlanIndicator
    )
    selectSelectValue(
        '{smsgateway-fieldtypeofnumber} [data-test="dhis2-uicore-singleselect"]',
        typeOfNumber
    )
    selectSelectValue(
        '{smsgateway-fieldbindtype} [data-test="dhis2-uicore-singleselect"]',
        bindType
    )
    cy.get('{smsgateway-fieldport}').type(port)
    cy.get('{smsgateway-fieldpassword}').type(password)

    cy.get('{smsgateway-fieldgatewayname}').as('missingFields')
    cy.wrap({
        type: 'smpp',
        name: '',
        systemId,
        host,
        systemType,
        port,
        password,
        numberPlanIndicator,
        typeOfNumber,
        bindType,
        compressed,
    }).as('gatewayData')
})

When('the user submits', () => {
    cy.get('{forms-gatewaysmppform-submit}').click()
})

Then('the entered data should be sent to the endpoint', () => {
    cy.all(
        () => cy.wait('@createGatewayConfigurationXHR'),
        () => cy.get('@gatewayData')
    ).then(([xhr, gatewayData]) => {
        expect(xhr.status).to.equal(200)
        expect(xhr.request.body).to.eql(gatewayData)
    })
})

Then('an error message should be shown at the invalid field', () => {
    cy.get('@missingFields').then($missingFields => {
        $missingFields.each((index, $missingField) => {
            cy.wrap($missingField).find('.error').should('exist')
        })
    })
})
