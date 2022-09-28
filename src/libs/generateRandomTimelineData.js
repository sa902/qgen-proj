function test() {
  const options2 = { year: "numeric", month: "numeric", day: "numeric" };
  const firstDate = randomDate(new Date(2005, 0, 1), new Date());
  const secondDate = randomDate(new Date(2005, 0, 1), new Date());
  const thirdDate = randomDate(new Date(2005, 0, 1), new Date());
  const firstEvent = getRandomEvent();
  const secondEvent = getRandomEvent();
  const thirdEvent = getRandomEvent();

  const timelineArray = [
    {
      content: firstEvent,
      timestamp: firstDate.toLocaleDateString("en-US", options2),
    },
    {
      content: secondEvent,
      timestamp: secondDate.toLocaleDateString("en-US", options2),
    },
    {
      content: thirdEvent,
      timestamp: thirdDate.toLocaleDateString("en-US", options2),
    },
  ];
  // return d.toLocaleDateString("en-US", options2);
  return timelineArray;
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function getRandomEvent() {
  const events = [
    "Dog found roaming the streets",
    "Dog sent to shelter",
    "Dog sent to family",
    "Dog has passed",
    "Dog gained the ability to speak",
    "Dog gained sentience",
    "Dog solved cold fusion",
    "Dog became an eleceted goverment official",
    "Dog somehow achieved global domination",
    "Dog became grand master at chess",
    "Dog made a cult",
    "Dog became a cat?",
  ];
  return events[Math.floor(Math.random() * events.length)];
}
// activities: [
//   {
//     content: "Event start",
//     timestamp: "09/12/2010",
//   },
//   {
//     content: "Approved",
//     timestamp: "2018-04-13",
//   },
//   {
//     content: "Success",
//     timestamp: "2018-04-11",
//   },
// ],

// var options = {
//   weekday: "long",
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// };

export default test;
