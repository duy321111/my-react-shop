const WINDOW_MS = Number(process.env.LOGIN_WINDOW_MS || 10 * 60 * 1000);
const BLOCK_MS = Number(process.env.LOGIN_BLOCK_MS || 15 * 60 * 1000);
const MAX_FAILED_PER_ACCOUNT = Number(process.env.LOGIN_MAX_FAILED_PER_ACCOUNT || 5);
const MAX_FAILED_PER_IP = Number(process.env.LOGIN_MAX_FAILED_PER_IP || 20);

const accountAttempts = new Map();
const ipAttempts = new Map();

const normalizeIp = (ip = "") => ip.replace("::ffff:", "");

const getTracker = (store, key, now) => {
  const existing = store.get(key);

  if (!existing) {
    const created = { count: 0, windowStart: now, blockedUntil: 0, lastSeen: now };
    store.set(key, created);
    return created;
  }

  existing.lastSeen = now;
  if (existing.windowStart + WINDOW_MS <= now) {
    existing.count = 0;
    existing.windowStart = now;
  }

  return existing;
};

const markFailure = (tracker, maxAllowed, now) => {
  tracker.count += 1;
  tracker.lastSeen = now;

  if (tracker.count >= maxAllowed) {
    tracker.blockedUntil = now + BLOCK_MS;
    tracker.count = 0;
    tracker.windowStart = now;
  }
};

const pruneStore = (store, now) => {
  for (const [key, value] of store.entries()) {
    const isExpired = value.lastSeen + BLOCK_MS + WINDOW_MS <= now;
    if (isExpired) store.delete(key);
  }
};

let requestsSincePrune = 0;

export const loginProtection = (req, res, next) => {
  const now = Date.now();
  const ip = normalizeIp(req.ip || req.socket?.remoteAddress || "unknown");
  const email = String(req.body?.email || "").trim().toLowerCase();
  const accountKey = `${ip}:${email || "unknown"}`;

  const accountTracker = getTracker(accountAttempts, accountKey, now);
  const ipTracker = getTracker(ipAttempts, ip, now);

  const blockedUntil = Math.max(accountTracker.blockedUntil || 0, ipTracker.blockedUntil || 0);
  if (blockedUntil > now) {
    const retryAfterSec = Math.ceil((blockedUntil - now) / 1000);
    res.set("Retry-After", String(retryAfterSec));
    return res.status(429).json({
      message: "Bạn thử đăng nhập quá nhiều lần. Vui lòng thử lại sau.",
      retryAfterSec,
    });
  }

  res.on("finish", () => {
    const doneAt = Date.now();
    const latestAccount = getTracker(accountAttempts, accountKey, doneAt);
    const latestIp = getTracker(ipAttempts, ip, doneAt);

    if (res.statusCode === 401) {
      markFailure(latestAccount, MAX_FAILED_PER_ACCOUNT, doneAt);
      markFailure(latestIp, MAX_FAILED_PER_IP, doneAt);
    }

    if (res.statusCode >= 200 && res.statusCode < 300) {
      accountAttempts.delete(accountKey);
    }

    requestsSincePrune += 1;
    if (requestsSincePrune >= 100) {
      pruneStore(accountAttempts, doneAt);
      pruneStore(ipAttempts, doneAt);
      requestsSincePrune = 0;
    }
  });

  next();
};
