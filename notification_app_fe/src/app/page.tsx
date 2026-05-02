"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Alert,
  Button,
} from "@mui/material";
import Link from "next/link";

import FilterBar from "../components/FilterBar";
import NotificationCard from "../components/NotificationCard";
import { fetchNotifications, Notification } from "../utils/api";


const HomePage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    fetchNotifications()
      .then((data) => {
        if (!mounted) return;
        setNotifications(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message || "Failed to fetch notifications");
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!filter) return notifications;

    return notifications.filter(
      (n) => n.type.toLowerCase() === filter.toLowerCase()
    );
  }, [notifications, filter]);

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
        All Notifications
      </Typography>

      {/* 🔥 PRIORITY BUTTON */}
      <Box mb={2} display="flex" gap={2}>
        <Link href="/priority" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Go to Priority
          </Button>
        </Link>
      </Box>

      {/* FILTER */}
      <FilterBar value={filter as any} onChange={setFilter} />

      {loading ? (
        <Box display="flex" justifyContent="center" minHeight={200}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={2} mt={1}>
          {filtered.map((n, idx) => (
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
};

export default HomePage;