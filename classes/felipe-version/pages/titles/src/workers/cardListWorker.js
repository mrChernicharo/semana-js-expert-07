// a worker needs to implement the onmessage and the postMessage methods

onmessage = ({ data }) => {
  // postMessage("message received", data);
  console.log("worker message", data.maxItems);
  console.log('activating blocking operation...')
  console.time('blocking-op')

  // blocking function
  let counter = 0
  for (; counter < data.maxItems; counter++) console.log('.')
  console.timeEnd('blocking-op', counter)

  postMessage({ response: "ok", data: counter });
};
