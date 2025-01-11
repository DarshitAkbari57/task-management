import { TextEncoder, TextDecoder } from "util";
import "@testing-library/jest-dom";

// Polyfill for TextEncoder and TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
Object.defineProperty(globalThis, "import", {
  value: {
    meta: {
      env: {
        VITE_SERVERURL: "",
      },
    },
  },
});
globalThis.import.meta = { env: { VITE_SERVERURL: "" } };
// jest.setup.js or setupTests.js (adjust the file name as per your setup)
// jest.setup.js
global.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));
