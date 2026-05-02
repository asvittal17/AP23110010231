import { Notification } from './api'

// Priority value mapping: higher is more important
const PRIORITY_MAP: Record<Notification['type'], number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export function sortByPriorityThenTime(notifications: Notification[]): Notification[] {
  return [...notifications].sort((a, b) => {
    const pa = PRIORITY_MAP[a.type] ?? 0;
    const pb = PRIORITY_MAP[b.type] ?? 0;
    if (pb !== pa) return pb - pa; // higher priority first
    const ta = new Date(a.timestamp).getTime();
    const tb = new Date(b.timestamp).getTime();
    return tb - ta; // latest first when same priority
  });
}
