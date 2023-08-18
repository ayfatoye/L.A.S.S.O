# L.A.S.S.O

L.A.S.S.O (Liaison Acquisition System for Sponsor Outreach) is a script designed to automate the process of cold emailing sponsors or recruiters who might be interested in sponsoring your student organization's events. With L.A.S.S.O, you can conveniently reach out to potential sponsors and schedule your emails for specific times when recipients are more likely to check their inboxes, thereby maximizing the chances of your email being read.

## Developer's Note
- This is a public version of the![Example_of_Spreadsheet](https://github.com/ayfatoye/L.A.S.S.O/assets/140027391/066daf70-f684-40b7-9e0d-3a40dff009cf)
 L.A.S.S.O project with a simpler email template/data so I can share my code without any of my student org's proprietary data

## Features

### Mass Emailing
- Using Google Apps Script and the Gmail API, L.A.S.S.O allows you to reach out to many people at once. The upper limit is set by the Gmail API and may vary.
- L.A.S.S.O enables you to include links to documents and sites in your email by utilizing the HTML body feature from the Gmail API. This also helps to reduce the size of your email, compared to including actual files (such as PDFs, images, etc.)

### Email Scheduling
- Since the Gmail API does not provide an endpoint for scheduling emails, L.A.S.S.O utilizes time-based triggers as a workaround for scheduling emails.
- L.A.S.S.O takes user input for when you want to send out your email and uses it to create the appropriate time-trigger.

## Usage

### Prerequisites
- Access to Google Spreadsheets (free)
- Access to Google Apps Script (free)

### Installation & Setup
- Open a Google spreadsheet (a one-time step)
  - The sheet will be used for user input
- Make three columns in this order: Email Addresses, Names, Companies, Schedule Time
  - The column headers can be anything
- Fill out the first three columns with the information of the sponsors you want to contact
- Only the first row of the "Schedule Time" column needs to be filled out
  - Fill out the date/time in this format: YYYY-MM-DD HH:MM:SS

### Running the Script
- Open Google Apps Script via your Google Spreadsheet
  - Extensions > Apps Script
- Name your new Apps Script project
  - Click on "Untitled Project"
- Enter the Code.gs file
  - Feel free to open a new .gs file if you prefer
- Copy the code in lasso.js from this repository
  - You can also clone the repo so you can make necessary changes to the email body in your preferred code editor
- After editing the script to include the email body and links you desire, paste the script into your Code.gs in Apps Script
- Click "Run" in Apps Script
- Be aware that differences in time zones between your Google Spreadsheet and Apps Script project might be an issue, depending on your particular Google account
  - Some console logging is included in the script to allow you to check synchronization
  - A workaround may be required

## Challenges
- I had never worked with the Gmail API before, and I didn't even know what Google Apps Script was
- I originally attempted this in a Python project and went through the entire creation process (including the pain of figuring out Google authentication) before realizing that the Gmail API didn't have an endpoint for scheduling emails
  - I had to start over and search for workarounds to this problem until I discovered time-based triggers in Google Apps Script
- During testing, I kept forgetting to change the date in my "schedule time" column, causing the script to send the emails immediately
  - I remedied this by coding in some manual error management, allowing users to set the schedule time for dates/times in the future.
