function doPost(e) {
  var feedback = e.parameter.feedback;
  var email = e.parameter.email;

  Logger.log("Feedback: " + feedback);
  Logger.log("Email: " + email);

  // Save to Sheet or take action...

  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}
