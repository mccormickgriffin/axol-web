export const environment = {
  production: false,
  apiUrl: 'http://localhost:3001/api/v1',
  apiDomain: 'localhost:3001',
  redirectUri: 'http://localhost:4200/callback',
  clientId: '',
  scopes:
    'playlist-modify-public playlist-modify-private ' +
    'playlist-read-private user-library-modify ' +
    'playlist-read-collaborative user-library-read',
};
