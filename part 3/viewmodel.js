// PART 1

function WebmailViewModel() {
    // Data
    var self = this;
    self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    self.chosenFolderId = ko.observable();
    
    // Behaviors
    self.goToFolder = function(folder) {
        self.chosenFolderId(folder);
    };
};

ko.applyBindings(new WebmailViewModel());


// PART 2

function WebmailViewModel() {
    // Data
    var self = this;
    self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    self.chosenFolderId = ko.observable();
    self.chosenFolderData = ko.observable();
    
    // Behaviors
    self.goToFolder = function(folder) {
        self.chosenFolderId(folder);
        $.get('/mail', {folder: folder}, self.chosenFolderData);
    };
    
    // Show inbox by default
    self.goToFolder('Inbox');
};

ko.applyBindings(new WebmailViewModel());


// PART 3
function WebmailViewModel() {
    // Data
    var self = this;
    self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    self.chosenFolderId = ko.observable();
    self.chosenFolderData = ko.observable();
    self.chosenMailData = ko.observable();
    
    // Behaviors
    self.goToFolder = function(folder) {
        self.chosenFolderId(folder);
        self.chosenMailData(null); // stop showing a mail
        $.get('/mail', {folder: folder}, self.chosenFolderData);
    };
    self.goToMail = function (mail) {
        self.chosenFolderId(mail.folder);
        self.chosenFolderData(null); // stop showing a folder
        $.get("/mail", {mailId: mail.id}, self.chosenMailData);
    };
    
    // Show inbox by default
    self.goToFolder('Inbox');
};

ko.applyBindings(new WebmailViewModel());


// PART 4

function WebmailViewModel() {
    // Data
    var self = this;
    self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    self.chosenFolderId = ko.observable();
    self.chosenFolderData = ko.observable();
    self.chosenMailData = ko.observable();
    
    // Behaviors
    self.goToFolder = function(folder) {
        location.hash = folder
    };
    self.goToMail = function (mail) {
        location.hash = mail.folder + '/' + mail.id
    };
        
    // Client side routes
    Sammy(function() {
        this.get('#:folder', function() {
            self.chosenFolderId(this.params.folder);
            self.chosenMailData(null);
            $.get("/mail", {folder: this.params.folder}, self.chosenFolderData);
        });
        
        this.get('#:folder/:mailId', function() {
            self.chosenFolderId(this.params.folder);
            self.chosenFolderData(null);
            $.get("/mail", {mailId: this.params.mailId}, self.chosenMailData);
        });
        
        this.get('', function() {this.app.runRoute('get', '#Inbox')});
    }).run();
};

ko.applyBindings(new WebmailViewModel());
