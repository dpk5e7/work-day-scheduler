$(document).ready(function () {
  let currentDay = $("#currentDay");
  let schedule = $("#schedule");

  let hours = [
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
  ];

  let schedulerEvent = {
    time: "",
    text: "",
  };
  let schedulerEventData = [];

  function setCurrentDay() {
    let strCurrentDay = moment().format("MMMM DD, YYYY");
    currentDay.text(strCurrentDay);
  }

  // Making this function so that I can force different times during testing
  function getCurrentHour() {
    let currentHour = "11 AM";
    //currentHour = moment().format("hh a").ToUpperCase();
    return currentHour;
  }

  function buildSchedule() {
    let currentHour = getCurrentHour();
    let currentHourIndex = 25;

    for (let i = 0; i < hours.length; i++) {
      // Create <div class="row"></div>
      let dvRow = $("<div>");
      dvRow.addClass("row time-block");

      // Create a column for the hour
      let dvHourColumn = $("<div>");
      dvHourColumn.addClass("col-1 hour align-middle");
      dvHourColumn.text(hours[i]);
      dvRow.append(dvHourColumn);

      // Create a column with a 100% textbox.  Change the border color on focus
      let dvTextBoxColumn = $("<div>");
      dvTextBoxColumn.addClass("col-10 align-middle");
      //dvTextBoxColumn.text("There needs to be a texbox here.");
      let txtArea = $("<textarea>");
      txtArea.attr("rows", 3);
      dvTextBoxColumn.append(txtArea);

      if (hours[i] == currentHour) {
        dvTextBoxColumn.addClass("present");
        currentHourIndex = i;
      } else if (i < currentHourIndex) {
        dvTextBoxColumn.addClass("past");
      } else {
        dvTextBoxColumn.addClass("future");
      }

      dvRow.append(dvTextBoxColumn);

      // Create a column for the save button
      let dvSaveColumn = $("<div>");
      dvSaveColumn.addClass("col-1 saveBtn align-middle");
      dvSaveColumn.text("💾");
      dvRow.append(dvSaveColumn);

      // Add dvRow to the schedule
      schedule.append(dvRow);
    }
  }

  function init() {
    setCurrentDay();
    buildSchedule();
  }
  init();
});
