import { removeAccessToken, removeRefreshToken } from "../utils/storage.ts";
import { useEffect, useState } from "react";
import { getProfileAPI } from "../api/user.ts";
import { UserProfile } from "../types.ts";

export default function UserMenu() {
  const logout = () => {
    removeAccessToken();
    removeRefreshToken();
    window.location.reload();
  };
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    getProfileAPI().then((response) => {
      setProfile(response.data);
    });
  }, []);

  return (
    <>
      <button
        id="dropdownUserAvatarButton"
        data-dropdown-toggle="dropdownAvatar"
        className="flex text-sm bg-white rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-white-600"
        type="button"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-11 h-11 rounded-full"
          src={profile?.profile_img_url}
          alt="user photo"
        />
      </button>
      <div
        id="dropdownAvatar"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-white-700 dark:divide-white-600"
      >
        <div className="px-4 py-3 text-sm text-white-900 dark:text-black">
          <div>Hi {profile?.name}!</div>
          <div className="font-medium truncate">{profile?.email}</div>
        </div>
        <ul
          className="py-2 text-sm text-white-700 dark:text-white-200"
          aria-labelledby="dropdownUserAvatarButton"
        >
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-white-100 dark:hover:bg-white-600 dark:hover:text-white"
            >
              History
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-white-100 dark:hover:bg-white-600 dark:hover:text-white"
            >
              Edit Profile
            </a>
          </li>
        </ul>
        <div className="py-2">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-white-700 hover:bg-white-100 dark:hover:bg-white-600 dark:text-white-200 dark:hover:text-white"
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
