import { Configuration } from "@/generated";
import { useAuth0 } from "@auth0/auth0-vue";
import { computed, ref, watchEffect } from "vue";

export default function useApiConfig() {
  const { getAccessTokenSilently } = useAuth0();

  const accessTokenRef = ref<string | undefined>();

  watchEffect(async () => {
    try {
      accessTokenRef.value = await getAccessTokenSilently({ audience: "" });
    } catch (error: any) {
      if (error.error === "login_required") accessTokenRef.value = undefined;
      else throw error;
    }
  });

  return computed(() => {
    return new Configuration({ basePath: import.meta.env.VITE_API_URL, accessToken: accessTokenRef.value });
  });
}
