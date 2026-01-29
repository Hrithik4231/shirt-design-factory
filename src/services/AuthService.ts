/**
 * Authentication Service
 * Handles user authentication, registration, and token management
 */

import { LOCAL_STORAGE_KEYS } from '@/constants/appConstants';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer' | 'designer' | 'moderator';
  avatar?: string;
  createdAt: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: AuthToken;
}

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  /**
   * Get singleton instance
   */
  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Initialize auth service and restore session if available
   */
  initialize(): void {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.userProfile);
    const storedAccessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken);

    if (storedUser && storedAccessToken) {
      try {
        this.currentUser = JSON.parse(storedUser);
        this.accessToken = storedAccessToken;
      } catch (error) {
        this.logout();
      }
    }
  }

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    // Validate input
    if (!data.email || !data.password || !data.name) {
      return { success: false, message: 'Missing required fields' };
    }

    if (data.password !== data.confirmPassword) {
      return { success: false, message: 'Passwords do not match' };
    }

    if (data.password.length < 8) {
      return { success: false, message: 'Password must be at least 8 characters' };
    }

    if (!data.agreeToTerms) {
      return { success: false, message: 'You must agree to the terms and conditions' };
    }

    try {
      // Simulate API call - Replace with actual API call
      const user: User = {
        id: `user_${Date.now()}`,
        email: data.email,
        name: data.name,
        role: 'customer',
        createdAt: new Date().toISOString(),
      };

      const token: AuthToken = {
        accessToken: `token_${Date.now()}`,
        refreshToken: `refresh_${Date.now()}`,
        expiresIn: 3600,
      };

      this.setAuthData(user, token);

      return {
        success: true,
        message: 'Registration successful',
        user,
        token,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Registration failed',
      };
    }
  }

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Validate input
    if (!credentials.email || !credentials.password) {
      return { success: false, message: 'Email and password are required' };
    }

    try {
      // Simulate API call - Replace with actual API call
      // This is a mock implementation
      if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
        const user: User = {
          id: 'user_1',
          email: credentials.email,
          name: 'Admin User',
          role: 'admin',
          createdAt: new Date().toISOString(),
        };

        const token: AuthToken = {
          accessToken: `token_${Date.now()}`,
          refreshToken: `refresh_${Date.now()}`,
          expiresIn: 3600,
        };

        this.setAuthData(user, token, credentials.rememberMe);

        return {
          success: true,
          message: 'Login successful',
          user,
          token,
        };
      }

      return { success: false, message: 'Invalid email or password' };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Login failed',
      };
    }
  }

  /**
   * Logout user
   */
  logout(): void {
    this.currentUser = null;
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem(LOCAL_STORAGE_KEYS.userProfile);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.authToken);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.refreshToken);
  }

  /**
   * Refresh access token
   */
  async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) {
      return false;
    }

    try {
      // Simulate API call - Replace with actual API call
      const newAccessToken = `token_${Date.now()}`;
      this.accessToken = newAccessToken;
      localStorage.setItem(LOCAL_STORAGE_KEYS.authToken, newAccessToken);
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    return this.accessToken;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.currentUser !== null && this.accessToken !== null;
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: string): boolean {
    return this.currentUser?.role === role;
  }

  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<User>): Promise<boolean> {
    if (!this.currentUser) {
      return false;
    }

    try {
      this.currentUser = { ...this.currentUser, ...updates };
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.userProfile,
        JSON.stringify(this.currentUser)
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Change password
   */
  async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }> {
    if (!this.isAuthenticated()) {
      return { success: false, message: 'User not authenticated' };
    }

    if (!oldPassword || !newPassword) {
      return { success: false, message: 'Passwords are required' };
    }

    if (newPassword.length < 8) {
      return { success: false, message: 'Password must be at least 8 characters' };
    }

    try {
      // Simulate API call - Replace with actual API call
      return { success: true, message: 'Password changed successfully' };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Password change failed',
      };
    }
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    if (!email) {
      return { success: false, message: 'Email is required' };
    }

    try {
      // Simulate API call - Replace with actual API call
      return {
        success: true,
        message: 'Password reset email has been sent',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Password reset request failed',
      };
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }> {
    if (!token || !newPassword) {
      return { success: false, message: 'Token and password are required' };
    }

    if (newPassword.length < 8) {
      return { success: false, message: 'Password must be at least 8 characters' };
    }

    try {
      // Simulate API call - Replace with actual API call
      return { success: true, message: 'Password reset successful' };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Password reset failed',
      };
    }
  }

  /**
   * Private method to set auth data
   */
  private setAuthData(user: User, token: AuthToken, rememberMe?: boolean): void {
    this.currentUser = user;
    this.accessToken = token.accessToken;
    this.refreshToken = token.refreshToken;

    localStorage.setItem(LOCAL_STORAGE_KEYS.userProfile, JSON.stringify(user));
    localStorage.setItem(LOCAL_STORAGE_KEYS.authToken, token.accessToken);

    if (rememberMe) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.refreshToken, token.refreshToken);
    }
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();

export default authService;
