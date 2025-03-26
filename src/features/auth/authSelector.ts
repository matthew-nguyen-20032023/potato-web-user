import { UserProfile } from "@/types.ts";

export const selectCurrentUser = (state: { auth: { user: UserProfile } }) =>
  state.auth.user;
