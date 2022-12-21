import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { computed, type Ref } from "vue";
import { ResponseError } from "@/generated";

export default function useErrorMessage(error: Ref<unknown>, statusMapper?: Partial<Record<StatusCodes, string>>) {
  return computed(() => {
    if (error.value instanceof ResponseError) {
      const status = error.value.response.status as StatusCodes;
      return statusMapper?.[status] || getReasonPhrase(status);
    } else if (error.value instanceof Error) {
      return error.value.message;
    } else if (error.value) {
      return "Unknown error.";
    } else {
      return null;
    }
  });
}
