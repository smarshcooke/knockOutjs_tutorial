// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
// NOTE THAT THE ACTIVATOR FOR KNOCKOUT.JS ALWAYS NEEDS TO GO BELOW THE KNOCKOUT FUNCTIONS.

// PART 1 

function AppViewModel() {
    this.firstName = "Bert";
    this.lastName = "Bertington";
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());

// PART 2

function AppViewModel() {
    this.firstName = ko.observable("Bert");
    this.lastName = ko.observable("Bertington");
};

ko.applyBindings(new AppViewModel());

// PART 3

function AppViewModel() {
    this.firstName = ko.observable("Bert");
    this.lastName = ko.observable("Bertington");
    this.fullName = ko.computed(function() {
    return this.firstName() + " " + this.lastName();
}, this);
};

// Activates knockout.js
ko.applyBindings(new AppViewModel());

// PART 4 

function AppViewModel() {
    this.firstName = ko.observable("Bert");
    this.lastName = ko.observable("Bertington");
    
    this.fullName = ko.computed(function() {
    return this.firstName() + " " + this.lastName();
}, this);

    this.capitalizeLastName = function() {
        var currentVal = this.lastName();
        this.lastName(currentVal.toUpperCase());
    };
};

// Activates knockout.js
ko.applyBindings(new AppViewModel());
