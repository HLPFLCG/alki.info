// Test Setup and Configuration
const { JSDOM } = require('jsdom');
const fs = require('fs');

// Setup test environment
global.dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost:8080',
  pretendToBeVisual: true,
  resources: 'usable'
});

global.window = global.dom.window;
global.document = global.dom.window.document;
global.navigator = global.dom.window.navigator;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

// Mock fetch
global.fetch = jest.fn();

// Load HTML content for testing
const loadHTML = (filename) => {
  const html = fs.readFileSync(filename, 'utf8');
  document.documentElement.innerHTML = html;
};

module.exports = { loadHTML };