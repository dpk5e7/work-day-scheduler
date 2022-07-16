$(document).ready(function () {
  let currentDay = $("#currentDay");
  let schedule = $("#schedule");
  let pMessage = $("#pMessage");

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
    currentHour = moment().format("hh a");
    // Remove leading zero
    if (currentHour.charAt(0) == "0") {
      currentHour = currentHour.substring(1);
    }
    currentHour = currentHour.toUpperCase();
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
      dvHourColumn.addClass("col-2 col-lg-1 hour align-middle");
      dvHourColumn.text(hours[i]);
      dvRow.append(dvHourColumn);

      // Create a column with a 100% textbox.  Change the border color on focus
      let dvTextBoxColumn = $("<div>");
      dvTextBoxColumn.addClass("col-8 col-lg-10 align-middle");
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
      dvSaveColumn.addClass("col-2 col-lg-1 saveBtn d-flex align-middle");
      let dvSave = $("<div>");
      dvSave.addClass("d-grid w-100");
      let btnSave = $(`<button class="btn btn-lg save-item-btn">💾</button>`);
      dvSave.append(btnSave);
      dvSaveColumn.append(dvSave);
      dvRow.append(dvSaveColumn);

      // Add dvRow to the schedule
      schedule.append(dvRow);
    }
  }

  schedule.on("click", ".save-item-btn", function (event) {
    event.preventDefault();

    // Get the hour to save
    let hourToSave = $(this).parent().parent().parent().children().eq(0).text();

    // get the textbox data for the row
    let strHourText = $(this)
      .parent()
      .parent()
      .parent()
      .children()
      .eq(1)
      .children()
      .eq(0)
      .val();

    // Look in schedulerEventData for a matching schedulerEvent
    let blnFound = false;
    for (let i = 0; i < schedulerEventData.length; i++) {
      if (schedulerEventData[i].time == hourToSave) {
        schedulerEventData[i].text = strHourText;
        blnFound = true;
        break;
      }
    }
    if (!blnFound) {
      schedulerEvent = {
        time: hourToSave,
        text: strHourText,
      };
      schedulerEventData.push(schedulerEvent);
    }

    // Save the array to localStorage
    localStorage.setItem("scheduleData", JSON.stringify(schedulerEventData));

    pMessage.append(`
      <div class="alert alert-success d-flex my-2 align-items-center alert-dismissible fade show"
        role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24"height="24" role="img" aria-label="Success:">
          <use xlink:href="#check-circle-fill" />
        </svg>
        <div>
          ${strHourText} saved to localStorage at ${hourToSave}!
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    `);
  });

  function loadScheduleData() {
    if (localStorage.getItem("scheduleData") != null) {
      schedulerEventData = JSON.parse(localStorage.getItem("scheduleData"));
    }
  }

  function loadDataIntoSchedule() {
    // Add data from local storage if it exits
    // THis isn't working right
    for (let i = 0; i < schedulerEventData.length; i++) {
      // loop through the schedule to find the right time
      let timeBlocks = schedule.children("div");

      for (let j = 0; j < timeBlocks.length; j++) {
        let timeBlockHour = timeBlocks[j].children[0].textContent;
        if (timeBlockHour == schedulerEventData[i].time) {
          // Set the text box value to schedulerEventData[i].text
          timeBlocks[j].children[1].children[0].value =
            schedulerEventData[i].text;
        }
      }
    }
  }

  function init() {
    setCurrentDay();
    loadScheduleData();
    buildSchedule();
    loadDataIntoSchedule();
  }
  init();
});
