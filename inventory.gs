// Global variables
var TRIGGER_SHEET = 'STOCKING';
var UPDATE_SHEET = 'INVENTORY';
var ZEROED_SHEET = 'ZEROED';
var EMAIL_ADDRESS = '{{EMAIL}}'

function replicateRowInsertion(e){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss.getSheetName() == TRIGGER_SHEET) {
    var updateSheet = ss.getSheetByName(UPDATE_SHEET);
    var triggerSheet = ss.getSheetByName(TRIGGER_SHEET);
    var zeroedSheet = ss.getSheetByName(ZEROED_SHEET);
    var targetRow = ss.getActiveCell().getRow();
    var targetSku  = triggerSheet.getRange(targetRow, 3).getValue();
    var targetLocation = triggerSheet.getRange(targetRow, 4).getValue();
    var updateQuantity = triggerSheet.getRange(targetRow, 5).getValue();
    var stockingId = triggerSheet.getRange(targetRow, 1).getValue();

    var allUpdateSkus = updateSheet.getRange(2, 1, updateSheet.getLastRow()).getValues();
    var allLocations =  updateSheet.getRange(2, 2, updateSheet.getLastRow()).getValues();
    
    var found = false;
    
    //first we check if the sku exists in inventory and location
    for (var i = 0; i < allUpdateSkus.length; i++) {
      if (allUpdateSkus[i].toString() == targetSku && allLocations[i].toString() == targetLocation) {
        var range = updateSheet.getRange(i + 2, 3);
        var currentQuantity = range.getValue();
        var newQuantity = currentQuantity + updateQuantity;
          
        if (newQuantity === 0 || newQuantity < 0) { //delete item if it is zero or less than 0
          updateSheet.deleteRow(i + 2);
          zeroedSheet.appendRow([
            targetSku, 
            targetLocation, 
            newQuantity,
            stockingId
          ]); 
        
          // Send Alert Email that item out of stock, but first must check if in other location
          var stockedInOtherLocation = false;
          for (var j = 0; j < allUpdateSkus.length; j++) {
            //check if sku exists anwhere other than the spot we found it before
            if (allUpdateSkus[j].toString() == targetSku && i != j) {
                stockedInOtherLocation = true;
            }
          }
          if (!stockedInOtherLocation){
            var subject = targetSku + ' out of stock';
            var message = targetSku + ' out of stock('+ newQuantity + ') from ' + targetLocation + '. Daily quota remaining for emails: ' + MailApp.getRemainingDailyQuota();
            MailApp.sendEmail(EMAIL_ADDRESS, subject, message);
          }

        } else { //otherwise, update quantity and stocking id
          range.setValue(newQuantity);
          updateSheet.getRange(i + 2, 4).setValue(stockingId);
        }
        found = true;
        break;
      }
    }
      
    //if item was not found than we add a new item by inventory location and sku
    if (!found) {
      if (updateQuantity <= 0) {
        // set the email address
        var emailAddress = '{{EMAIL}}'
        // Send Alert Email that item out of stock at specific location
        var message = targetSku + ' out of stock and removed at ' + targetLocation + '. Daily quota remaining for emails: ' + MailApp.getRemainingDailyQuota();
        var subject = targetSku + ' WARNING, someone tried to remove stock that did not exist at' + targetLocation;
        MailApp.sendEmail(emailAddress, subject, message);
        
        //update zeroedSheet
        zeroedSheet.appendRow([
            targetSku, 
            targetLocation, 
            updateQuantity,
            stockingId
          ]);
      } else {  
        updateSheet.appendRow([
          targetSku, 
          targetLocation, 
          updateQuantity,
          stockingId
        ]);
      }
    }
  }
}


