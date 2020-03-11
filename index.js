// Instantiate the Parse SDK for Javascript NodeJS
const Parse = require('parse/node')

// Configures the ParseURL to Back4app's API
Parse.serverURL = 'https://parseapi.back4app.com/'

// Inicializa o Parse com a AppID e a Javascript Key
Parse.initialize("h7qPxXCDHxHMZBqRINsXTZg78mm45QuNzikiiiV0", "NiiWhzKGrz5ntc5xahPC2KwIzWDCrxbeu9AyDB9m");


// Async function so we can use Async/Await
async function retrieveCapitalOfUkraineAndCode(){
    // Extends the class Continentscountriescities_Country, where we will be making queries
    const Country = Parse.Object.extend("Continentscountriescities_Country");
    // Creates a query object, to query on the Country object created above
    const query = new Parse.Query(Country);

    // Let's find the country which the property name is what we are looking for
    query.equalTo("name", "Ukraine");

    // Since we are looking only for the Capital and Code, let's tell Parse to retrieve only that and avoid overquerying
    query.select('capital', 'code')

    // Executes the find method and holds the results in a variable
    const results = await query.find();


    console.log('Found ' + results.length + ' countries with the searched name')

    // Loop through results and print
    for (let i = 0; i < results.length; i ++){
        let capital = results[i].get('capital')
        let code = results[i].get('code')
        
        console.log('\tThe Capital of this country is: ' + capital)
        console.log('\tThe Code for this country is: ' + code)
    }
}

// Lets create a new method that includes the Continent information about a Country
async function retrieveContinentDataForUkraine(){
    // Extends the class Continentscountriescities_Country, where we will be making queries
    const Country = Parse.Object.extend("Continentscountriescities_Country");
    // Creates a query object, to query on the Country object created above
    const query = new Parse.Query(Country);

    // Let's find the country which the property name is what we are looking for
    query.equalTo("name", "Ukraine");

    // Let's include the data for Continent in the query
    query.include('continent')

    // Since we are looking only for the Capital and Code, let's tell Parse to retrieve only that and avoid overquerying
    query.select('capital', 'code', 'continent')

    // Executes the find method and holds the results in a variable
    const results = await query.find();


    console.log('Found ' + results.length + ' countries with the searched name')

    // Loop through results and print
    for (let i = 0; i < results.length; i ++){
        let capital = results[i].get('capital')
        let code = results[i].get('code')
        let continent = results[i].get('continent').get('name')
        
        console.log('\tThe Capital of this country is: ' + capital)
        console.log('\tThe Code for this country is: ' + code)
        console.log('\tThe Name for the Continent for this country is: ' + continent)
    }
}

// Run the methods above
retrieveCapitalOfUkraineAndCode()
retrieveContinentDataForUkraine()