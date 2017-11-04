/* 
	Author: Ben Switzer
	  Date: 11/3/2017
	
	Purpose: These are end-to-end tests for the github repo
	that I cloned right here:
	https://github.com/cornflourblue/angular-registration-login-example
	I split my describes into 3 sections (Register, Login, Home)
	Each one has multiple tests for that section.	
*/

// set the base url
let baseURL = "http://127.0.0.1:8080/";

// Register Page Tests

// View Model info
// vm.user.firstName
// -- 	   lastName
// -- 	   username
// -- 	   password

// Buttons: submit, cancel (link)
describe('Test the register page for loading.', function() {
  // gather the elements.
  let submitButton = element(by.buttonText("Register"));
  let firstName = element(by.model('vm.user.firstName'));
  let lastName = element(by.model('vm.user.lastName'));
  let username = element(by.model('vm.user.username'));
  let password = element(by.model('vm.user.password'));
  
  // load page
  beforeEach(function(){
	browser.get(baseURL+"#!/register");
  });
   
  it('should have a title', function() {
	expect(browser.getTitle()).toEqual('AngularJS User Registration and Login Example');
  });
  
  it('cancel button should go to login', function(){
	let cancelAnchor = element(by.css('.btn-link'));
	cancelAnchor.click();
	expect(browser.getCurrentUrl()).toEqual(baseURL+"#!/login");
  });
  
  it('Should require first name', function() {

	lastName.sendKeys(1);
	username.sendKeys(1);
	password.sendKeys(1);
	
	// let's try the submit button
	expect(submitButton.isEnabled()).toBe(false);

  });
  
  it('Should require last name', function() {

	firstName.sendKeys(1);
	username.sendKeys(1);
	password.sendKeys(1);
	
	// let's try the submit button
	expect(submitButton.isEnabled()).toBe(false);

  });
  
  it('Should require username', function() {

	firstName.sendKeys(1);
	lastName.sendKeys(1);
	password.sendKeys(1);
	
	// let's try the submit button
	expect(submitButton.isEnabled()).toBe(false);
	
  });
  
  it('Should require password', function() {
	firstName.sendKeys(1);
	lastName.sendKeys(1);
	username.sendKeys(1);
	
	// let's try the submit button
	expect(submitButton.isEnabled()).toBe(false);
  });
   
  it('The Register button should be enabled', function() {
	// we should clear the localStorage before we go forth.
	browser.executeScript('localStorage.clear();');
	
	// set the username.
	let un = 'Alicecooldude';
  
	firstName.sendKeys('Alice');
	lastName.sendKeys('bob');
	username.sendKeys(un);
	password.sendKeys('password');
	
	// let's try the submit button
	expect(submitButton.isEnabled()).toBe(true);
	// go ahead and click it
	submitButton.click();
	
	// Should be here now!
	expect(browser.getCurrentUrl()).toEqual(baseURL+"#!/login");
	expect(element(by.binding('flash')).getText()).toEqual("Registration successful");
	
	// get that local storage
	let users = browser.executeScript("return window.localStorage.users;");
	
	// make sure that Alice is there
	expect(users).toEqual('[{"firstName":"Alice","lastName":"bob","username":"Alicecooldude","password":"password","id":1}]');
  });
  

  it('Should tell us that the username is taken.', function() {
	// we should clear the localStorage before we go forth.
	browser.executeScript('localStorage.clear();');
	
	// set the username.
	let un = 'Alicecooldude';
  
	firstName.sendKeys('Alice');
	lastName.sendKeys('bob');
	username.sendKeys(un);
	password.sendKeys('password');
	
	// initialize that localStorage so it already has the user before they register.
	browser.executeScript("window.localStorage.users = '[{\"firstName\":\"Alice\",\"lastName\":\"bob\",\"username\":\"Alicecooldude\",\"password\":\"password\",\"id\":1}]';");

	// let's try the submit button
	expect(submitButton.isEnabled()).toBe(true);
	
	// go ahead and click it
	submitButton.click();
	
	// Shouldn't have moved location.
	expect(browser.getCurrentUrl()).toEqual(baseURL+"#!/register");
	expect(element(by.binding('flash')).getText()).toEqual('Username "' + un + '" is already taken');
	
	// get that local storage
	let users = browser.executeScript("return window.localStorage.users;");
	
	// make sure that Alice is there
	expect(users).toEqual('[{"firstName":"Alice","lastName":"bob","username":"Alicecooldude","password":"password","id":1}]');
  });
  
  it("Shouldn't change any data for Alicecooldude.", function() {
	// we should clear the localStorage before we go forth.
	browser.executeScript('localStorage.clear();');
	
	// set the username.
	let un = 'Alicecooldude';
  
	firstName.sendKeys('joe');
	lastName.sendKeys('franke');
	username.sendKeys(un);
	password.sendKeys('lasagna');
	
	// initialize that localStorage so it already has the user before they register.
	browser.executeScript("window.localStorage.users = '[{\"firstName\":\"Alice\",\"lastName\":\"bob\",\"username\":\"Alicecooldude\",\"password\":\"password\",\"id\":1}]';");

	// let's try the submit button
	expect(submitButton.isEnabled()).toBe(true);
	
	// go ahead and click it
	submitButton.click();
	
	// Shouldn't have moved location.
	expect(browser.getCurrentUrl()).toEqual(baseURL+"#!/register");
	expect(element(by.binding('flash')).getText()).toEqual('Username "' + un + '" is already taken');
	
	// get that local storage
	let users = browser.executeScript("return window.localStorage.users;");
	
	// make sure that Alice is there
	expect(users).toEqual('[{"firstName":"Alice","lastName":"bob","username":"Alicecooldude","password":"password","id":1}]');
  });
  
});


// Login Tests

// View Model info
// vm.username
// -- password
  
// Buttons: Login, Register (link)
describe('Test the login page', function() {
   let loginButton = element(by.buttonText("Login"));
   let username = element(by.model('vm.username'));
   let password = element(by.model('vm.password'));

   beforeEach(function(){
	browser.get(baseURL+'#!/login');
  });
  
  it('should have a title', function() {
	expect(browser.getTitle()).toEqual('AngularJS User Registration and Login Example');
  });

  it('cancel button should go to register', function(){
	let cancelAnchor = element(by.css('.btn-link'));
	cancelAnchor.click();
	expect(browser.getCurrentUrl()).toEqual(baseURL+"#!/register");
  });
  
  it('should alert the user if login credentials are bad', function(){
	username.sendKeys('Alice');
	password.sendKeys('foobobbar');
	loginButton.click();
	expect(element(by.binding('flash')).getText()).toEqual("Username or password is incorrect");
  });
  
  it('should login?', function(){
	// clear the localStorage (just in case).
	browser.executeScript('localStorage.clear();');
	// initialize that localStorage so it already has the user before they register.
	browser.executeScript("window.localStorage.users = '[{\"firstName\":\"Alice\",\"lastName\":\"bob\",\"username\":\"Alicecooldude\",\"password\":\"password\",\"id\":1}]';");

	// Fire away!
	username.sendKeys('Alicecooldude');
	password.sendKeys('password');
	
	loginButton.click();
	
	expect(browser.getCurrentUrl()).toEqual(baseURL+"#!/");
	
	let firstNameHeader = element(by.binding('vm.user.firstName')).getText();
	
	expect(firstNameHeader).toEqual("Hi Alice!");
  });
  
});


// Home Tests

// View Model info
// vm.user.firstName
// vm.allUsers
  
// Links: Login, Delete (takes id)
describe('Tests for the home page.', function() {
   let loginButton = element(by.buttonText("Login"));

   let username = element(by.model('vm.username'));
   let password = element(by.model('vm.password'));

	// login before each test scenario.
	beforeEach(function(){
		browser.get(baseURL+'#!/login');
		
		// clear the localStorage.
		browser.executeScript('localStorage.clear();');
		// initialize that localStorage so it already has the user before they register.
		browser.executeScript("window.localStorage.users = '[{\"firstName\":\"Alice\",\"lastName\":\"bob\",\"username\":\"Alicecooldude\",\"password\":\"password\",\"id\":1},{\"firstName\":\"Bob\",\"lastName\":\"alice\",\"username\":\"Bobcooldude\",\"password\":\"********\",\"id\":2}]';");

		username.sendKeys('Alicecooldude');
		password.sendKeys('password');
		
		loginButton.click();	
	});
  
  it('Logout should take us to the login page.', function(){
	let logoutAnchor = element(by.css('.btn-primary'));
	
	// check if we have a logout button!
	expect(logoutAnchor.getText()).toEqual("Logout");
	logoutAnchor.click();
	
	// if we hit logout, then we go to login.
	expect(browser.getCurrentUrl()).toEqual(baseURL+"#!/login");
  });

  it('Test users in the repeater', function(){
    // get all them users in the vm!
	let users = element.all(by.repeater('user in vm.allUsers'));  
	 
	// count how many we have
	expect(users.count()).toEqual(2);
	// check the first one.
	expect(users.first().getText()).toEqual("Alicecooldude (Alice bob) - Delete");
	expect(users.last().getText()).toEqual("Bobcooldude (Bob alice) - Delete");

  });
  
  it('Deletes the users', function(){
	let users = element.all(by.repeater('user in vm.allUsers'));  
	
	// make sure we have 2 users.
	expect(users.count()).toEqual(2);
	
	// get and click the delete button for Alice bob.
	users.get(0).element(by.css('[ng-click="vm.deleteUser(user.id)"]')).click();
	
	// should only have 1, right?
	expect(users.count()).toEqual(1);
	expect(users.first().getText()).toEqual("Bobcooldude (Bob alice) - Delete");
  });
  
}); 


