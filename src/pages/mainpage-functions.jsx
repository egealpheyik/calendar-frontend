export async function GetEvents(dateobj) {
  const data = JSON.stringify({
    userId: JSON.parse(localStorage.getItem("user")).userId,
    startDate: dateobj,
  });
  try {
    const response = await fetch("http://localhost:56935/api/event", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },

      body: data,
    }).then(async (response) => await response.json());
    // .then((x) => console.log("x", x));
    console.log("x", response);
    return response;
  } catch (exception) {
    console.log(exception);
    return false;
  }
}

export async function AddEvent(data) {
  console.log("testtest");
  console.log(data);
  // const data = JSON.stringify({
  //     "userId": JSON.parse(localStorage.getItem('user')).userId,
  //     "eventName": "deneme",
  //     "description": "denemee",
  //     "importance": 3,
  //     "startDate": "2020-12-31T00:00:00",
  //     "endDate": "2020-01-01T00:00:00",
  //     "time": "0001-01-01T00:00:00",
  //     "autoFinish": false,
  //     "isFinished": false
  // },)
  try {
    const response = await fetch("http://localhost:56935/api/event/aaa", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },

      body: data,
    }).then((response) => response.json());
    console.log(response);
    return response;
  } catch (exception) {
    console.log(exception);
    return false;
  }
}

export function convertData(userId, date) {
  var obj = {
    userId: userId,
    startDate: date,
  };
  return obj;
}

export async function DeleteEvent(data) {
  data = JSON.stringify(data);
  console.log("test223");
  console.log(data);
  // const data = JSON.stringify({
  //     "userId": JSON.parse(localStorage.getItem('user')).userId,
  //     "eventName": "deneme",
  //     "description": "denemee",
  //     "importance": 3,
  //     "startDate": "2020-12-31T00:00:00",
  //     "endDate": "2020-01-01T00:00:00",
  //     "time": "0001-01-01T00:00:00",
  //     "autoFinish": false,
  //     "isFinished": false
  // },)
  try {
    const response = await fetch("http://localhost:56935/api/event", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },

      body: data,
    }).then((response) => response.json());
    console.log(response);
    return response;
  } catch (exception) {
    console.log(exception);
    return false;
  }
}

export async function UpdateEvent(obj) {
  const data = JSON.stringify({
    eventId: obj.eventId,
    userId: JSON.parse(localStorage.getItem("user")).userId,
    eventName: obj.eventName,
    description: obj.description,
    startDate: obj.startDate,
    time: obj.time,
  });
  try {
    const response = await fetch("http://localhost:56935/api/event/update", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },

      body: data,
    }).then(async (response) => await response.json());
    // .then((x) => console.log("x", x));
    console.log("x", response);
    return response;
  } catch (exception) {
    console.log(exception);
    return false;
  }
}
