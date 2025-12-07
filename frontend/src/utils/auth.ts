export async function getValidToken() {
  const expiresAt = Number(localStorage.getItem("expires_in"));
  const refreshToken = localStorage.getItem("refresh_token");

  // No refresh token → must login
  if (!refreshToken) {
    return null;
  }

  // Token still valid
  if (Date.now() < expiresAt - 5000) {
    return localStorage.getItem("access_token");
  }

  try {
    const response = await fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
                    mutation RefreshToken($refreshToken: String!) {
                        refreshToken(refreshToken: $refreshToken) {
                            access_token
                            refresh_token
                            expires_in
                        }
                    }
                `,
        variables: { refreshToken },
      }),
    });

    const result = await response.json();

    // ❌ Refresh failed (expired refresh token)
    if (result.errors) {
      redirectToLogin();
      return null;
    }

    const data = result.data.refreshToken;

    // Save new tokens
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem(
      "expires_in",
      (Date.now() + data.expires_in * 1000).toString()
    );

    return data.access_token;
  } catch (err) {
    redirectToLogin();
    return null;
  }
}

function redirectToLogin() {
  localStorage.clear();
  window.location.href = "/login";
}
