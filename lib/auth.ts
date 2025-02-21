import axios from "./axios";

/**
 * Fetches the user's permissions from the `/me` endpoint.
 * @param token - The user's authentication token.
 * @returns An array of permissions.
 */
export const fetchUserPermissions = async (token: string) => {
  try {
    const response = await axios.get("users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data && response.data.data.permissions) {
      return response.data.data.permissions as string[];
    } else {
      throw new Error("No permissions found in response");
    }
  } catch (error) {
    console.error("Failed to fetch user permissions:", error);
    return [];
  }
};

/**
 * Transforms an array of permissions into a key-value object.
 * @param permissions - An array of permissions.
 * @returns An object where each permission is a key with a value of `true`.
 */
export const transformPermissions = (permissions: string[]) => {
  return permissions.reduce((acc, permission) => {
    acc[permission] = true;
    return acc;
  }, {} as Record<string, boolean>);
};

/**
 * Fetches the user's permissions and transforms them into a key-value object.
 * @param token - The user's authentication token.
 * @returns An object where each permission is a key with a value of `true`.
 */
export const fetchAndTransformPermissions = async (token: string) => {
  const permissions = await fetchUserPermissions(token);

  return transformPermissions(permissions);
};
