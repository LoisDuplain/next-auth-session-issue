import { AccessToken } from "@/types/common";
import { Session } from "next-auth"
import { toast } from "sonner";

export function getTokenFromSession(session: Session | null | undefined): AccessToken {
  return session?.user?.access_token;
}
export function fetchWithToken(input: NodeJS.fetch.RequestInfo, token: AccessToken, init?: RequestInit) {
  if (typeof input === "string" && input.startsWith("/")) {
    input = process.env.NEXT_PUBLIC_COMMON_API_URL + input;
  }

  if (init) {
    init = {
      ...init,
      headers: {
        ...init.headers,
        Authorization: `Bearer ${token}`
      },
      cache: "no-cache"
    }
  }

  return fetch(input, init);
}


export function toastError(err: any, message?: string) {
  if (typeof window !== "undefined") {
    toast.error(message ?? "Une erreur s'est produite", {
      description: err.message,
      important: true
    });
  }
  return err;
}