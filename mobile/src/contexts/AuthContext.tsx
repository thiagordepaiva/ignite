import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, stUser] = useState<UserProps>({} as UserProps);
  const [isUserLoading, setUserLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "641410227646-r64oo99vnqirmjheplv2nrlk69oolm9q.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["profile", "email"],
  });

  async function signIn() {
    try {
      setUserLoading(true);

      await promptAsync();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setUserLoading(false);
    }
  }

  async function signInWithGoogle(acess_token: string) {
    console.log("Token de Autenticaão ===>", acess_token);
  }

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
