function getRandomTimelineData() {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const firstDate = randomDate(new Date(2005, 0, 1), new Date());
  const secondDate = randomDate(firstDate, new Date());
  const thirdDate = randomDate(secondDate, new Date());
  const firstEvent = getRandomEvent();
  const secondEvent = getRandomEvent();
  const thirdEvent = getRandomEvent();

  const timelineArray = [
    {
      content: firstEvent,
      timestamp: firstDate.toLocaleDateString("en-US", options),
    },
    {
      content: secondEvent,
      timestamp: secondDate.toLocaleDateString("en-US", options),
    },
    {
      content: thirdEvent,
      timestamp: thirdDate.toLocaleDateString("en-US", options),
    },
  ];
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

export default getRandomTimelineData;
