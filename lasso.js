function scheduleEmails() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();

    var email_addresses = [];
    var names = [];
    var companies = [];

    for (var i = 1; i < rows.length; i++) {
        email_addresses.push(rows[i][0]);
        names.push(rows[i][1]);
        companies.push(rows[i][2]);
    }

    // Set properties as string representations of the arrays
    PropertiesService.getScriptProperties().setProperty('email_addresses', email_addresses.join(','));
    PropertiesService.getScriptProperties().setProperty('names', names.join(','));
    PropertiesService.getScriptProperties().setProperty('companies', companies.join(','));

    var schedule_time_input = rows[1][3]; // Assumes the schedule time is the same for all outgoing emails
    Logger.log("Emails: " + email_addresses);
    Logger.log("Names: " + names);
    Logger.log("Companies: " + companies);
    Logger.log("Scheduled Time: " + schedule_time_input);
    var schedule_time = new Date(schedule_time_input);

    var now = new Date();
    if (schedule_time <= now) {
        Logger.log("Error: Scheduled time must be in the future");
        return;
    }

    // Triggers are how we make up for the fact that the GMAIL API doesn't have an endpoint for scheduling emails
    // You can create triggers that'll run your apps script functions at specific times
    ScriptApp.newTrigger('sendEmail')
        .timeBased()
        .at(schedule_time)
        .create();

    Logger.log("Emails successfully scheduled");
}

function sendEmail() {
    // Retrieve properties and split back into arrays
    var email_addresses = PropertiesService.getScriptProperties().getProperty('email_addresses').split(',');
    var names = PropertiesService.getScriptProperties().getProperty('names').split(',');
    var companies = PropertiesService.getScriptProperties().getProperty('companies').split(',');


    for (var i = 0; i < email_addresses.length; i++) {
        var subject = 'Super Rad Recruiting Opportunity';
        var body = `
            Hello ${names[i]},

            I heard your company, ${companies[i]}, is like super cool and stuff.

            Wanna work with my company, superCoolios? Check our website out <a href='https://bit.ly/superRadStudentOrg'>here</a>

            And check out our like super cool company resume <a href='https://drive.google.com/file/d/1WPD84J75EYk_ZxWuuHehPNzC2lfER8EU/view?usp=sharing'>here</a>
        `;

        // Define CC recipients if needed
        var cc = 'exampleCC@gmail.com';
        body = body.replace(/\n/g, '<br>');

        GmailApp.sendEmail(email_addresses[i], subject, body, {
            cc: cc,
            htmlBody: body // Send the body as HTML
        });
    }
}
