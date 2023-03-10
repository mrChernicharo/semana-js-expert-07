export function supportsWorkerType() {
  let supports = false;
  const tester = {
    get type() {
      supports = true;
    },
  };

  try {
    // will try to instantiate a Worker passing a fake url
    // this will trigger the getter if Workers are available
    // terminate kills the worker and prevents memory leaks
    new Worker("blob://", tester).terminate();
  } finally {
    return supports;
  }
}

export function prepareRunChecker({ timeDelay }) {
  let lastEvent = Date.now();

  return {
    shouldRun() {
      const result = (Date.now() - lastEvent) > timeDelay;
      if (result) lastEvent = Date.now();

      return result;
    },
  };
}
