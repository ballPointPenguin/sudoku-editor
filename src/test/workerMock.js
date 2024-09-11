// src/test/workerMock.js
export class WorkerMock {
  constructor(stringUrl) {
    this.url = stringUrl
    this.onmessage = null
  }

  postMessage(/* msg */) {
    // Simulate the worker's response
    setTimeout(() => {
      if (this.onmessage) {
        // For now, just return a fixed number of solutions
        this.onmessage({ data: '1' })
      }
    }, 0)
  }

  terminate() {
    // Do nothing
  }
}

global.Worker = WorkerMock
