import { createContext, useState, useEffect } from "react";
import { getProfile, getAllPreferences } from "../api/user";
import useAxios from "../utils/UseAxios";

const ProfileContext = createContext();

export default ProfileContext;

export const ProfileProvider = ({children}) => {
    const api = useAxios();
    const [profileLoading, setProfileLoading] = useState(true);
    const [profile, setProfile] = useState(null);

    const getUserProfile = async () => {
        setProfileLoading(true);
        try {
            const data = await getProfile(api);
            setProfile(data);
        } catch (error) {
            setProfile(null);
        } finally {
            setProfileLoading(false);
        }
    };

    useEffect(() => {
        getUserProfile();
    }, []);

    let contextData = {
        profile: profile,
        profileLoading: profileLoading,
        setProfile: setProfile,
        getUserProfile: getUserProfile,
    }

    return (
        <ProfileContext.Provider value={contextData}>
            {children}
        </ProfileContext.Provider>
    )
}