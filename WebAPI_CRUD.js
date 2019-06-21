// JavaScript source code

var Category = {
    PreferredCustomer : 1,
    Standard: 2
}

var accountId = '';

function deleteRecord() {
    if (accountId != '') {
        Xrm.WebApi.deleteRecord("account", accountId).then(
        function success(result) {
            alert("Account deleted successfully. \n\n" + "Going to call retrieveMultiple() function now.");
            // perform operations on record deletion
            retrieveMultiple();
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );
    }
}

function retrieveRecord() {
    if (accountId != '') {
        Xrm.WebApi.retrieveRecord("account", accountId, "?$select=accountcategorycode,address1_addressid,address1_longitude,donotphone,name,_primarycontactid_value,revenue").then(
                    function success(result) {
                        debugger;
                        var accountInfo = '';

                        var _primarycontactid_value = result["_primarycontactid_value"];
                        var _primarycontactid_navigation_property = result["_primarycontactid_value@Microsoft.Dynamics.CRM.associatednavigationproperty"];
                        var _primarycontactid_value_lookuplogicalname = result["_primarycontactid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var _primarycontactid_value_formatted = result["_primarycontactid_value@OData.Community.Display.V1.FormattedValue"];

                        var _transactioncurrencyid_value = result["_transactioncurrencyid_value"];
                        var _transactioncurrencyid_navigation_property = result["_transactioncurrencyid_value@Microsoft.Dynamics.CRM.associatednavigationproperty"];
                        var _transactioncurrencyid_value_lookuplogicalname = result["_transactioncurrencyid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var _transactioncurrencyid_value_formatted = result["_transactioncurrencyid_value@OData.Community.Display.V1.FormattedValue"];

                        var accountcategorycode = result["accountcategorycode"];
                        var accountcategorycode_formatted = result["accountcategorycode@OData.Community.Display.V1.FormattedValue"];

                        var accountid = result["accountid"];
                        var address1_addressid = result["address1_addressid"];

                        var address1_longitude = result["address1_longitude"];
                        var address1_longitude_formatted = result["address1_longitude@OData.Community.Display.V1.FormattedValue"];

                        var donotphone = result["donotphone"];
                        var donotphone_formatted = result["donotphone@OData.Community.Display.V1.FormattedValue"];

                        var name = result["name"];

                        var revenue = result["revenue"];
                        var revenue_formatted = result["revenue@OData.Community.Display.V1.FormattedValue"];

                        accountInfo += 'Account Name = ' + name + '\n';
                        accountInfo += 'Primary Contact = ' + _primarycontactid_value_formatted + '\n';
                        accountInfo += 'Category = ' + accountcategorycode_formatted + '\n';
                        accountInfo += 'Annual Revenue = ' + revenue_formatted + '\n';

                        alert("Account retrieved successfully. Details are given below : \n\n" + accountInfo + "\n\n" + "Going to delete the account now.");

                        deleteRecord();
                    },
                    function (error) {
                        debugger;
                        console.log(error.message);
                        // handle error conditions
                    });
    }
}

function updateRecord() {
    if (accountId != '') {
        var accountInfo = '';

        var accountName = "Modified - Alex Ferguson";
        var primaryContactId = "49a0e5b9-88df-e311-b8e5-6c3be5a8b200"; //-- Adrian Dumitrascu
        var primaryContactName = "Adrian Dumitrascu";
        var accountCategoryCode = Category.PreferredCustomer;
        var annualRevenue = 55664433;

        var entityData =
        {
            "name": accountName,
            "revenue": annualRevenue,        // Currency (money type) ---Display Text = Annual Revenue
            "donotphone": true,    //Two Option (boolean type) ---Display Text = Do not allow Phone Calls
            "address1_longitude": 78.23625,     //Floating Point Number (decimal type) --- Display Text = Address 1: Longitude
            "address1_composite": "Modified - This is address 1",  //Multiple Lines of Text (memo type) --- Display Text = Address 1
            "accountcategorycode": accountCategoryCode,     // Option Set --- Display Text = Category
            //--Contact Name = Adrian Dumitrascu
            "primarycontactid@odata.bind": "/contacts(" + primaryContactId + ")" //--- Lookup --- Display Text = Primary Contact
        }

        Xrm.WebApi.updateRecord("account", accountId, entityData).then(
                        function success(result) {

                            var accountInfo = '';
                            accountInfo += 'Account Name = ' + accountName + '\n';
                            accountInfo += 'Primary Contact = ' + primaryContactName + '\n';
                            accountInfo += 'Category = Preferred Customer \n';
                            accountInfo += 'Annual Revenue = ' + annualRevenue + '\n';

                            alert("Account updated successfully. Details are given below : \n\n" + accountInfo + "\n\n" + "Going to retrieve record.");

                            retrieveRecord();
                        },
                        function (error) {
                            // handle error conditions
                            console.log(error.message);
                            reject(error.message);
                        }
                    );
    }
}

function createRecord() {

    var accountInfo = '';
    var accountName = "Alex Ferguson";
    var primaryContactId = "25A17064-1AE7-E611-80F4-E0071B661F01"; //-- Abraham McCormick
    var primaryContactName = "Abraham McCormick";
    var accountCategoryCode = Category.Standard;
    var annualRevenue = 7500000;

    var entityData =
    {
        "name": accountName,
        "revenue": annualRevenue,        // Currency (money type) ---Display Text = Annual Revenue
        "donotphone": false,    //Two Option (boolean type) ---Display Text = Do not allow Phone Calls
        "address1_longitude": 112.512634,     //Floating Point Number (decimal type) --- Display Text = Address 1: Longitude
        "address1_composite": "This is address 1",  //Multiple Lines of Text (memo type) --- Display Text = Address 1
        "accountcategorycode": accountCategoryCode,     // Option Set --- Display Text = Category
        "primarycontactid@odata.bind": "/contacts(" + primaryContactId + ")" //--- Lookup --- Display Text = Primary Contact
    }

    Xrm.WebApi.createRecord("account", entityData).then(
                function success(result) {
                    //Success - No Return Data
                    accountId = result.id;
                    var accountInfo = '';
                    accountInfo += 'Account Name = ' + accountName + '\n';
                    accountInfo += 'Primary Contact = ' + primaryContactName + '\n';
                    accountInfo += 'Category = Standard \n';
                    accountInfo += 'Annual Revenue = ' + annualRevenue + '\n';

                    alert("Account created. Details are given below : \n\n" + accountInfo + "\n\n" + "Going to update this record now.");
                    updateRecord();
                    //return accountId;
                },
                function (error) {
                    alert(error.message);
                }
            );
}

function retrieveMultiple() {
    debugger;
    var query = '?$select=accountcategorycode,address1_addressid,address1_longitude,donotphone,name,_primarycontactid_value,revenue&$filter=_primarycontactid_value ne null&$top=5';
    Xrm.WebApi.retrieveMultipleRecords("account", query).then(
                function success(accounts) {
                    debugger;
                    var results = accounts.entities;
                    results.forEach(function (result, index, array) {

                        // Transform crm object to kendo model
                        var _primarycontactid_value = result["_primarycontactid_value"];
                        var _primarycontactid_navigation_property = result["_primarycontactid_value@Microsoft.Dynamics.CRM.associatednavigationproperty"];
                        var _primarycontactid_value_lookuplogicalname = result["_primarycontactid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var _primarycontactid_value_formatted = result["_primarycontactid_value@OData.Community.Display.V1.FormattedValue"];

                        var _transactioncurrencyid_value = result["_transactioncurrencyid_value"];
                        var _transactioncurrencyid_navigation_property = result["_transactioncurrencyid_value@Microsoft.Dynamics.CRM.associatednavigationproperty"];
                        var _transactioncurrencyid_value_lookuplogicalname = result["_transactioncurrencyid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var _transactioncurrencyid_value_formatted = result["_transactioncurrencyid_value@OData.Community.Display.V1.FormattedValue"];

                        var accountcategorycode = result["accountcategorycode"];
                        var accountcategorycode_formatted = result["accountcategorycode@OData.Community.Display.V1.FormattedValue"];

                        var accountid = result["accountid"];
                        var address1_addressid = result["address1_addressid"];

                        var address1_longitude = result["address1_longitude"];
                        var address1_longitude_formatted = result["address1_longitude@OData.Community.Display.V1.FormattedValue"];

                        var donotphone = result["donotphone"];
                        var donotphone_formatted = result["donotphone@OData.Community.Display.V1.FormattedValue"];

                        var name = result["name"];

                        var revenue = result["revenue"];
                        var revenue_formatted = result["revenue@OData.Community.Display.V1.FormattedValue"];
                    });

                    alert("Executed function retrieveMultipleRecords() successfully. \n\n "+ "Total Accounts retrieved = " + results.length);
                },
                function (error) {
                    debugger;
                    console.log(error.message);
                    // Reject promise
                    reject(Error(error.message));
                }
            );
}

function executeCRUDOperationsByWebAPI() {
    createRecord();
    //updateRecord();
    //retrieveRecord();
    //deleteRecord();
    //retrieveMultiple();
}