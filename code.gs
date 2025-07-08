/**
 * doPost function: Handles POST requests sent to the Web App URL.
 * This is the entry point for form submissions from your frontend.
 *
 * @param {Object} e The event object containing form data.
 */
function doPost(e) {
  // IMPORTANT: Replace 'Your Feedback Sheet Name' with the actual name of your Google Sheet.
  // Example: If your Google Sheet is titled "Website Feedback Data", use that.
  const SPREADSHEET_NAME = 'Website Feedback Data';
  const SHEET_NAME = 'Feedback Entries'; // Or the name of the specific sheet/tab within your spreadsheet

  try {
    // Get the active spreadsheet by name
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet || spreadsheet.getName() !== SPREADSHEET_NAME) {
      // If the active spreadsheet isn't the one we want, try opening it by ID or by iterating through recent files
      // For simplicity, let's assume getActiveSpreadsheet() gets the one bound to this script,
      // or you can use SpreadsheetApp.openById('YOUR_SPREADSHEET_ID')
      // For now, if the name doesn't match, we'll indicate an error
       return createJsonResponse(
          'error',
          'Spreadsheet not found or mismatched. Please ensure the script is bound to the correct spreadsheet or adjust SPREADSHEET_NAME.'
       );
    }

    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      return createJsonResponse('error', 'Sheet "' + SHEET_NAME + '" not found in the spreadsheet. Please check the sheet name.');
    }

    // Extract data from the event object.
    // When sending FormData, parameters are directly available in e.parameter.
    const email = e.parameter.email;
    const feedback = e.parameter.feedback;
    const timestamp = new Date();

    // Basic validation (can be expanded)
    if (!email || !feedback) {
      return createJsonResponse('error', 'Missing email or feedback data.');
    }

    // Append the data as a new row to the sheet
    sheet.appendRow([timestamp, email, feedback]);

    // Return a success JSON response to the client
    return createJsonResponse('success', 'Thank you for your feedback!');

  } catch (error) {
    // Log any errors that occur during execution for debugging
    console.error("Error processing feedback submission: ", error.message, error.stack);
    // Return an error JSON response to the client
    return createJsonResponse('error', 'An internal server error occurred. Please try again later.');
  }
}

/**
 * Helper function to create a consistent JSON response.
 *
 * @param {string} status 'success' or 'error'
 * @param {string} message The message to send to the client.
 * @returns {GoogleAppsScript.Content.TextOutput} A TextOutput object with JSON content.
 */
function createJsonResponse(status, message) {
  const output = ContentService.createTextOutput(
    JSON.stringify({ status: status, message: message })
  );
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * doGet function: Handles GET requests.
 * Optional: You can remove this if you only expect POST requests.
 * It's good practice to have it for testing the web app URL directly.
 */
function doGet(e) {
  return ContentService.createTextOutput("Hello! This is the feedback submission endpoint. Please use POST requests.");
}
