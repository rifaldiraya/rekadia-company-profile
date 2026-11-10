import { API_MOCK_MODE } from "@/services/api-config";
import { isApiError } from "@/services/api-error";

/**
 * Runs the live request, or the mock when mocking is forced. In "fallback" mode (the
 * development default) the mock is used only when the backend is unreachable or the
 * endpoint does not exist yet, so the site works before the .NET API is deployed.
 */
export async function withMockFallback<T>(live: () => Promise<T>, mock: () => Promise<T>): Promise<T> {
  if (API_MOCK_MODE === "always") return mock();
  try {
    return await live();
  } catch (error) {
    const endpointMissing = isApiError(error) && (error.isUnreachable || error.status === 404);
    if (API_MOCK_MODE === "fallback" && endpointMissing) {
      console.warn("[api] Backend unavailable, using mock response.", error);
      return mock();
    }
    throw error;
  }
}
