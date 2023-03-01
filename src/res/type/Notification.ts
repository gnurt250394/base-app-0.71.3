enum NotificationType {
  SYSTEM = 'SYSTEM',
  USER = 'USER',
}
interface NotificationPayload {
  data: any;
  notification: any;
}
export interface Notification {
  id: string;
  target: NotificationType;
  userId: string;
  topic: string;
  payload: NotificationPayload;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}
