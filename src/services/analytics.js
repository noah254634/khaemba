import axios from 'axios';

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_BASE_URL = (() => {
  if (!configuredApiUrl) return '/api';
  const withProtocol =
    configuredApiUrl.startsWith('/') || configuredApiUrl.includes('://')
      ? configuredApiUrl
      : `https://${configuredApiUrl}`;
  const normalized = withProtocol.replace(/\/$/, '');
  return normalized === '/api' || normalized.endsWith('/api')
    ? normalized
    : `${normalized}/api`;
})();

function getSessionId() {
  let id = sessionStorage.getItem('portfolio_sess_id');
  if (!id) {
    id = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('portfolio_sess_id', id);
  }
  return id;
}

let sessionStartTime = Date.now();

export function trackPageView(path = window.location.pathname) {
  const sessionId = getSessionId();
  const referrer = document.referrer || 'Direct';
  const durationSeconds = Math.floor((Date.now() - sessionStartTime) / 1000);

  const payload = {
    sessionId,
    path,
    referrer,
    durationSeconds,
  };

  axios.post(`${API_BASE_URL}/analytics/track`, payload).catch(() => {});
}

export function useAnalyticsTracker(pathname) {
  const sessionId = getSessionId();

  // Track page view on path change
  trackPageView(pathname);

  // Send periodic heartbeat every 15s to record active time spent
  const interval = setInterval(() => {
    const durationSeconds = Math.floor((Date.now() - sessionStartTime) / 1000);
    axios
      .post(`${API_BASE_URL}/analytics/heartbeat`, {
        sessionId,
        durationSeconds,
      })
      .catch(() => {});
  }, 15000);

  // Send beacon on page exit/visibility change
  const handleExit = () => {
    const durationSeconds = Math.floor((Date.now() - sessionStartTime) / 1000);
    const data = JSON.stringify({ sessionId, durationSeconds });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        `${API_BASE_URL}/analytics/heartbeat`,
        new Blob([data], { type: 'application/json' })
      );
    }
  };

  window.addEventListener('beforeunload', handleExit);

  return () => {
    clearInterval(interval);
    window.removeEventListener('beforeunload', handleExit);
  };
}
