import {
	createContext,
	useContext,
	useMemo,
	useState,
	useCallback,
} from "react";

type AuthProviderProps = {
	children: React.ReactNode;
};

interface User {
	username: string;
	email: string;
}

type AuthProviderState = {
	isAuth: boolean;
	User: User;
	handleAuth: (auth: User) => void;
	handleLogout: () => void;
};

const initialState = {
	isAuth: false,
	User: JSON.parse(localStorage.getItem("user") || "false") || {
		username: "",
		email: "",
	},
	handleAuth: () => null,
	handleLogout: () => null,
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children, ...props }: AuthProviderProps) {
	const [user, setUser] = useState<User>(
		JSON.parse(localStorage.getItem("user") || "false") || {
			username: "",
			email: "",
		}
	);

	const isAuth = Boolean(user.email && user.email);

	const handleLogout = useCallback(() => {
		localStorage.removeItem("user");
		setUser({
			username: "",
			email: "",
		});
	}, []);

	const handleAuth = useCallback((auth: User) => {
		setUser(auth);
		localStorage.setItem("user", JSON.stringify(auth));
	}, []);

	const value = useMemo(
		() => ({
			User: user,
			handleAuth,
			isAuth,
			handleLogout,
		}),
		[isAuth, setUser, user]
	);

	return (
		<AuthProviderContext.Provider {...props} value={value}>
			{children}
		</AuthProviderContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthProviderContext);

	if (context === undefined)
		throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};
