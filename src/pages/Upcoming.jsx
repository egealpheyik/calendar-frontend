export async function GetUpcomingEvents(dateobj, imp) {
  const data = JSON.stringify({
    userId: JSON.parse(localStorage.getItem("user")).userId,
    importance: imp,
    startDate: dateobj,
  });
  try {
    const response = await fetch("http://localhost:56935/api/event/upcoming", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },

      body: data,
    }).then((response) => response.json());
    console.log("feth-output", response);
    return response;
  } catch (exception) {
    console.log(exception);
    return false;
  }
}
