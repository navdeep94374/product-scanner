import {
  useContext,
  createContext,
  type PropsWithChildren,
  ReactNode,
  useState,
} from "react";

interface AuthInfo {
  email: string | null;
  name: string | null;
  token: string | null;
}

const authContext = createContext<{
  authInfo: AuthInfo;
  setAuthInfo: React.Dispatch<React.SetStateAction<AuthInfo>>;
}>({
  authInfo: {
    email: null,
    name: null,
    token: null,
  },
  setAuthInfo: () => {},
});

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    email: null,
    name: null,
    token: null,
  });
  return (
    <authContext.Provider value={{ authInfo, setAuthInfo }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
