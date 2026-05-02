"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import NotificationCard from "../../components/NotificationCard";
import FilterBar from "../../components/FilterBar";
import { fetchNotifications, Notification } from "../../utils/api";
import Link from "next/link";
import { Button } from "@mui/material";

export default function PriorityPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");

  // ✅ Fetch only once
  useEffect(() => {
    fetchNotifications()
      .then((res) => {
        setNotifications(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message || "Failed to fetch");
        setLoading(false);
      });
  }, []);

  // ✅ Priority + Filter + Top 10
  const processedData = useMemo(() => {
    if (!notifications.length) return [];

    const priorityMap: Record<string, number> = {
      Placement: 3,
      Result: 2,
      Event: 1,
    };

    let filtered = notifications;

    if (filter) {
      filtered = notifications.filter(
        (n) => n.type.toLowerCase() === filter.toLowerCase()
      );
    }

    const sorted = filtered.sort((a, b) => {
      if (priorityMap[b.type] !== priorityMap[a.type]) {
        return priorityMap[b.type] - priorityMap[a.type];
      }
      return (
        new Date(b.timestamp).getTime() -
        new Date(a.timestamp).getTime()
      );
    });

    return sorted.slice(0, 10);
  }, [notifications, filter]);

  // ✅ Mark as seen
  const handleClick = (n: Notification) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item === n ? { ...item, seen: true } : item
      )
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Top Priority Notifications
      </Typography>

      <Box mb={2} display="flex" gap={2}>
  <Link href="/" style={{ textDecoration: "none" }}>
    <Button variant="outlined">Back to All Notifications</Button>
  </Link>
</Box>

      <FilterBar value={filter as any} onChange={setFilter} />

      {loading ? (
        <Box display="flex" justifyContent="center" minHeight={200}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={2} mt={1}>
          {processedData.map((n, idx) => (
            <Grid item xs={12} md={6} key={n.id ?? idx}>
              <NotificationCard
                notification={n}
                onClick={handleClick}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}