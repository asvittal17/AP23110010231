export type Notification = {
  id?: string;
  type: 'Event' | 'Result' | 'Placement';
  message: string;
  timestamp: string;
  seen?: boolean;
};

export async function fetchNotifications(): Promise<Notification[]> {
  try {
    // ✅ CALL YOUR NEXT API (NO CORS)
    const res = await fetch("/api/notifications");

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();

    // ✅ API returns { notifications: [...] }
    const list = data.notifications || [];

    return list.map((n: any) => ({
      id: n.ID ?? n.id,
      type: (n.Type ?? n.type) as Notification['type'] ?? 'Event',
      message: n.Message ?? n.message ?? '',
      timestamp: n.Timestamp ?? n.timestamp ?? new Date().toISOString(),
      seen: !!n.Seen,
    }))
  } catch (err: any) {
    throw new Error(err?.message ?? "Failed to fetch notifications");
  }
}
