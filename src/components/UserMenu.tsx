import { UserProfile } from "@/types.ts";
import { useEffect, useState } from "react";
import { getProfileAPI } from "@/api/user.ts";
import { FaRegCircleUser } from "react-icons/fa6";
import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
} from "@/utils/storage.ts";
import { showMessageError } from "@/alerts/alert.ts";
import { refreshTokenAPI } from "@/api/auth.ts";

export default function UserMenu() {
  const logout = () => {
    removeAccessToken();
    removeRefreshToken();
    window.location.reload();
  };
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const handleGetUserProfile = async (isNewToken = false) => {
    try {
      const data = await getProfileAPI();
      setProfile(data.data);
    } catch (error) {
      if (isNewToken) {
        showMessageError(error);
        removeAccessToken();
      } else {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          try {
            const data = await refreshTokenAPI(refreshToken);
            setAccessToken(data.data.access_token);
            await handleGetUserProfile(true);
          } catch (error) {
            showMessageError(error);
            removeAccessToken();
            removeRefreshToken();
          }
        }
      }
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
        {!profile?.profile_img_url && <FaRegCircleUser size={28} />}
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
