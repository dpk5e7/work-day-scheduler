$(document).ready(function () {
  let currentDay = $("#currentDay");

  let schedulerEvent = {
    time: "",
    text: "",
  };
  let schedulerEventData = [];

  function setCurrentDay() {
    let strCurrentDay = moment().format("MMMM DD, YYYY");
    currentDay.text(strCurrentDay);
  }

  function init() {
    setCurrentDay();
  }
  init();
});
