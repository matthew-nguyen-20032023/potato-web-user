import { UserProfile } from "mewmew-api-type";

export const selectCurrentUser = (state: { auth: { user: UserProfile } }) =>
  state.auth.user;
