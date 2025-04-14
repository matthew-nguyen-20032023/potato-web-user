import { useEffect } from "react";
import { AppError } from "@/types.ts";
import { getProfileAPI } from "@/api/user.ts";
import { FaRegCircleUser } from "react-icons/fa6";
import { showMessageError } from "@/alerts/alert.ts";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "@/features/auth/authSlice.ts";
import { selectCurrentUser } from "@/features/auth/authSelector.ts";
import { removeAccessToken, removeRefreshToken } from "@/utils/storage.ts";

export default function UserMenu() {
  const dispatch = useDispatch();
  const profile = useSelector(selectCurrentUser);

  const logout = () => {
    removeAccessToken();
    removeRefreshToken();
    window.location.reload();
  };

  const handleGetUserProfile = async () => {
    try {
      const data = await getProfileAPI();
      dispatch(loginSuccess({ user: data.data }));
    } catch (error) {
      showMessageError(error as AppError);
    }
  };

  useEffect(() => {
    handleGetUserProfile();
  }, []);

  return (
    <>
      <button
        id="dropdownUserAvatarButton"
        data-dropdown-toggle="dropdownAvatar"
        data-dropdown-trigger="hover"
        className="flex text-sm"
        type="button"
      >
        <span className="sr-only">Open user menu</span>

        {profile?.profile_img_url && (
          <img
            className="w-11 h-11 rounded-full"
            src={profile?.profile_img_url}
            alt="user photo"
          />
        )}
        {!profile?.profile_img_url && (
          <FaRegCircleUser className="size-[2.4vh]" />
        )}
      </button>
      <div
        id="dropdownAvatar"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-white-700 dark:divide-white-600"
      >
        <div className="px-4 py-3 text-sm dark:text-black">
          <div>Hi {profile?.name}!</div>
          <div className="font-medium truncate">{profile?.email}</div>
        </div>
        <ul
          className="py-2 text-sm text-white-700 dark:text-white-200"
          aria-labelledby="dropdownUserAvatarButton"
        >
          <li>
            <a href="#" className="block px-4 py-2">
              Edit Profile
            </a>
          </li>
        </ul>
        <div className="py-2">
          <a
            href="#"
            className="block px-4 py-2 text-sm"
            onClick={() => {
              logout();
            }}
          >
            Log out
          </a>
        </div>
      </div>
    </>
  );
}
