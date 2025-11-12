import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class KeycloakAdminService {
  private token: string | null = null;
  private tokenExpiry: number | null = null;

  private readonly baseUrl = 'http://localhost:8080';
  private readonly realm = 'medFlow';
  private readonly clientId = 'nest-api';
  private readonly clientSecret = process.env.KEYCLOAK_CLIENT_SECRET || '';

  // Get  an admin token from Keycloak
  async getAdminToken(): Promise<string> {
    // Reuse cached token if still valid
    if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.token;
    }

    const params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('client_secret', this.clientSecret);
    params.append('grant_type', 'client_credentials');

    const res = await axios.post(
      `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`,
      params.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    this.token = res.data.access_token;
    // Token usually lasts 60 seconds * 1000 → use expires_in
    this.tokenExpiry = Date.now() + res.data.expires_in * 1000 - 5000; // small buffer

    return this.token!;
  }

  // Get user info by Keycloak ID
  async getUserById(userId: string): Promise<any> {
    const token = await this.getAdminToken();

    const res = await axios.get(
      `${this.baseUrl}/admin/realms/${this.realm}/users/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return res.data;
  }

  async deleteUser(keycloakId: string): Promise<void> {
    const token = await this.getAdminToken();
    await axios.delete(
      `${this.baseUrl}/admin/realms/${this.realm}/users/${keycloakId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
  }
}
