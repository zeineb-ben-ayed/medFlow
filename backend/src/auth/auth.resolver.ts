import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthResponse } from './dto/auth-response.dto';
import axios from 'axios';
import { Public } from 'nest-keycloak-connect';

@Resolver()
export class AuthResolver {
  private keycloakUrl = 'http://localhost:8080';
  private realm = 'medFlow';
  private clientId = 'nest-api';
  private clientSecret = process.env.KEYCLOAK_CLIENT_SECRET || '';
    @Public()
    @Mutation(() => AuthResponse)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<AuthResponse> {
    const params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append(
      'client_secret',this.clientSecret
    );
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);

    const { data } = await axios.post(
      'http://localhost:8080/realms/medFlow/protocol/openid-connect/token',
      
      params.toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    return data;
  }
  //register 

@Public()
@Mutation(() => String)
async register(
  @Args('username') username: string,
  @Args('email') email: string,
  @Args('password') password: string,
  @Args('role') role: string,
  @Args('dateNaissance') dateNaissance: string,
  @Args('firstName') firstName: string,
  @Args('lastName') lastName: string,
): Promise<string> {

  // 1️⃣ Obtenir token admin
  const tokenParams = new URLSearchParams();
  tokenParams.append('client_id', 'nest-api');
  tokenParams.append('client_secret', process.env.KEYCLOAK_CLIENT_SECRET || '');
  tokenParams.append('grant_type', 'client_credentials');

  const tokenRes = await axios.post(
    'http://localhost:8080/realms/medFlow/protocol/openid-connect/token',
    tokenParams.toString(),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
  );

  const adminToken = tokenRes.data.access_token;

  // 2️⃣ Créer l’utilisateur
  await axios.post(
    'http://localhost:8080/admin/realms/medFlow/users',
    {
      username,
      email,
      lastName,
      firstName,
      enabled: true,
      credentials: [{ type: 'password', value: password, temporary: false }],
   
     attributes: {
      dateNaissance: dateNaissance, 
    },
  },
    { headers: { Authorization: `Bearer ${adminToken}` } },
  );

  // 3️⃣ Récupérer l’ID du nouvel utilisateur
  const usersRes = await axios.get(
    `http://localhost:8080/admin/realms/medFlow/users?username=${username}`,
    { headers: { Authorization: `Bearer ${adminToken}` } },
  );
  const userId = usersRes.data[0].id;

  // 4️⃣ Récupérer le rôle par nom
  const roleRes = await axios.get(
    `http://localhost:8080/admin/realms/medFlow/roles/${role}`,
    { headers: { Authorization: `Bearer ${adminToken}` } },
  );
  const roleRepresentation = roleRes.data;

  // 5️⃣ Assigner le rôle au nouvel utilisateur
  await axios.post(
    `http://localhost:8080/admin/realms/medFlow/users/${userId}/role-mappings/realm`,
    [roleRepresentation], // tableau même si un seul rôle
    { headers: { Authorization: `Bearer ${adminToken}` } },
  );

  return `Utilisateur ${username} créé avec succès et rôle ${role} assigné`;
}


  @Query(() => String)
  hello() {
    return 'Hello World';
  }

}
