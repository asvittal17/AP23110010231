"use client";
import React from 'react'
import { Card, CardActionArea, CardContent, Typography, Chip, Box } from '@mui/material'
import { Notification } from '../utils/api'

type Props = {
  notification: Notification
  onClick?: (n: Notification) => void
}

const NotificationCard: React.FC<Props> = ({ notification, onClick }) => {
  const { type, message, timestamp, seen } = notification
  return (
    <Card variant="outlined" sx={{ opacity: seen ? 0.6 : 1 }}>
      <CardActionArea onClick={() => onClick?.(notification)}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip label={type} color={type === 'Placement' ? 'secondary' : 'default'} size="small" />
          <Typography variant="body1" sx={{ flex: 1 }}>
            {message}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(timestamp).toLocaleString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default NotificationCard
