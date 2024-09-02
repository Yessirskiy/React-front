import React, {createContext, useContext, useMemo, useState} from "react";
import { useAuth } from "./useAuth";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const { user, setUser } = useAuth();
    const [profile, setProfileRaw] = useState(user);

    const setProfile = async (value) => {
        setUser(value);
        setProfileRaw(value);
    };

    const value = useMemo(() => ({
        profile,
        setProfile,
    }), [profile]);
    return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfile = () => {
    return useContext(ProfileContext);
};