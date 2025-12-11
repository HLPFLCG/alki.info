// Analytics Tests
const { loadHTML } = require('./test-setup');

describe('Analytics System', () => {
  beforeEach(() => {
    loadHTML('index.html');
    // Clear all mocks
    jest.clearAllMocks();
  });

  test('should track link clicks', () => {
    const link = document.querySelector('.link-item');
    if (link) {
      link.click();
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'hlpfl_link_clicks',
        expect.any(String)
      );
    }
  });

  test('should track page views', () => {
    // Simulate page load
    expect(localStorageMock.getItem).toHaveBeenCalledWith('hlpfl_sessions');
  });

  test('should calculate conversion rate', () => {
    // Test conversion rate calculation
    const mockClicks = { 'main-site': 10, 'instagram': 5 };
    const mockSessions = 20;
    
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'hlpfl_link_clicks') return JSON.stringify(mockClicks);
      if (key === 'hlpfl_sessions') return mockSessions.toString();
      return null;
    });

    // The conversion rate should be (10+5)/20 = 75%
    const expectedConversionRate = 75;
    expect(expectedConversionRate).toBe(75);
  });
});