/**
 * Notification Service
 * Handles toast/notification display and management
 */

import { toast } from 'sonner';

export interface NotificationOptions {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  icon?: string;
}

export class NotificationService {
  /**
   * Show success notification
   */
  static success(message: string, options?: NotificationOptions) {
    toast.success(message, {
      duration: options?.duration || 3000,
    });
  }

  /**
   * Show error notification
   */
  static error(message: string, options?: NotificationOptions) {
    toast.error(message, {
      duration: options?.duration || 4000,
    });
  }

  /**
   * Show info notification
   */
  static info(message: string, options?: NotificationOptions) {
    toast.info(message, {
      duration: options?.duration || 3000,
    });
  }

  /**
   * Show warning notification
   */
  static warning(message: string, options?: NotificationOptions) {
    toast.warning(message, {
      duration: options?.duration || 3500,
    });
  }

  /**
   * Show loading notification
   */
  static loading(message: string) {
    return toast.loading(message);
  }

  /**
   * Update notification
   */
  static updateNotification(id: string | number, message: string, type: 'success' | 'error' | 'info' | 'warning') {
    toast[type](message, { id: String(id) });
  }

  /**
   * Show confirmation dialog with custom title and actions
   */
  static confirm(
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) {
    // Simple confirmation using browser confirm
    if (window.confirm(`${title}\n\n${message}`)) {
      onConfirm();
    } else if (onCancel) {
      onCancel();
    }
  }

  /**
   * Show notification with action button
   */
  static action(message: string, actionLabel: string, onAction: () => void) {
    toast(message, {
      action: {
        label: actionLabel,
        onClick: onAction,
      },
    });
  }

  /**
   * Clear all notifications
   */
  static clearAll() {
    toast.dismiss();
  }
}

export default NotificationService;
