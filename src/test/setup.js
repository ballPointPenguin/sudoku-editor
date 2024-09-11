// src/test/setup.js
import { cleanup } from '@testing-library/react'
import { expect, afterEach, vi } from 'vitest'
import { WorkerMock } from './workerMock'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend expect with jest-dom matchers
expect.extend(matchers)

// Clean up after each test
afterEach(() => {
  cleanup()
})

// Mock Worker
global.Worker = WorkerMock

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn()
