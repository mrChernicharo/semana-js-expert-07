onmessage = (msg) => {
  const { data } = msg;
  console.log("worker says", data);

  postMessage({
    ok: "ok",
  });
};
