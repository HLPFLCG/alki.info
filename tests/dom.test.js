// DOM Tests
const { loadHTML } = require('./test-setup');

describe('DOM Structure', () => {
  beforeEach(() => {
    loadHTML('index.html');
  });

  test('should have profile section', () => {
    const profileSection = document.querySelector('.profile-section');
    expect(profileSection).toBeTruthy();
  });

  test('should have links container', () => {
    const linksContainer = document.querySelector('.links-container');
    expect(linksContainer).toBeTruthy();
  });

  test('should have multiple link items', () => {
    const linkItems = document.querySelectorAll('.link-item');
    expect(linkItems.length).toBeGreaterThan(0);
  });

  test('should have verified badge', () => {
    const verifiedBadge = document.querySelector('.verified-badge');
    expect(verifiedBadge).toBeTruthy();
  });

  test('should have profile image', () => {
    const profileImage = document.querySelector('.profile-image');
    expect(profileImage).toBeTruthy();
    expect(profileImage.tagName).toBe('IMG');
  });
});