import type {
  SendOtpDTO,
  signUpResponse,
  SuccessLogin,
  UserLoginDTO,
  UserOtpLoginDTO,
  UserSignDTO,
  UserType,
  userUpdateDto,
} from "~/types/UserTypes";
import { useNotification } from "./useNotification";
import { useAuthUser } from "~/stores/user";
import type {
  ILoginProcess,
  LoginCredentials,
  LoginStates,
} from "~/types/LoginTypes";

// "Expecto Patronum!" - Protecting our authentication system with secure cookies
export const useAuthService = () => {
  const backUrlCookie: Ref<string> = useCookie("backUrlCookie", {
    sameSite: "lax",
    secure: true,
    maxAge: 31536000,
  });

  // "The Dark Mark" - Storing the CSRF token, but beware of security threats!
  const csrfToken: Ref<string> = useCookie("csrf_token", {
    sameSite: "lax",
    secure: false,
    maxAge: 31536000,
  });

  // "The Marauder's Map" - Holding the user's Authorization Token
  const AuthorizationCookies: Ref<string | null> = useCookie("Authorization", {
    sameSite: "lax",
    secure: false,
    maxAge: 31536000,
  });

  const { $customFetch } = useNuxtApp();
  const { fireNotification } = useNotification();

  class AuthService {
    // "Hogwarts Sorting Ceremony" - Determining if the user is logged in
    async getUser(): Promise<{ loggedIn: boolean; error: any }> {
      const userStore = useAuthUser();

      const res: { loggedIn: boolean; error: any } = {
        loggedIn: false,
        error: {},
      };

      try {
        // "Accio User Data!" - Fetching the user details from the backend
        const data = await $customFetch<UserType>("/auth/me", {
          method: "GET",
        });

        userStore.addUser(data);
        res.loggedIn = true;

        return res;
      } catch (error: any) {
        // "Avada Kedavra!" - Authentication failed, removing user session
        res.error = error;
        res.loggedIn = false;
        return res;
      }
    }

    // "Alohomora!" - Unlocking the doors to the magical world of authentication
    async loginWithPass(
      credentials: UserLoginDTO
    ): Promise<SuccessLogin | null | undefined> {
      try {
        return await $customFetch<SuccessLogin | null | undefined>(
          "/auth/login",
          {
            method: "POST",
            body: credentials,
          }
        );
      } catch (error: any) {
        fireNotification("red", error.message);
      }
    }

    // "Owl Post Delivery" - Sending an OTP to the user
    async sendOtp(
      credentials: SendOtpDTO
    ): Promise<SuccessLogin | null | undefined> {
      return await $customFetch<SuccessLogin | null | undefined>("/auth/otp", {
        method: "POST",
        body: credentials,
      });
    }

    // "The Goblet of Fire" - Authenticating the user with an OTP
    async loginWithOtp(
      credentials: UserOtpLoginDTO
    ): Promise<SuccessLogin | null | undefined> {
      return await $customFetch<SuccessLogin | null | undefined>(
        "/verify-otp",
        {
          method: "POST",
          body: credentials,
        }
      );
    }

    // "The Philosopher’s Stone" - Creating a new account and entering the wizard world
    async signUp(
      credentials: UserSignDTO
    ): Promise<signUpResponse | null | undefined> {
      try {
        const res = await $customFetch<signUpResponse | null | undefined>(
          "/users",
          { method: "POST", body: credentials }
        );

        return res;
      } catch (error: any) {
        fireNotification("red", error.response._data.message);
        console.error(error);
      }
    }

    async forgetPassword(
      credentials: SendOtpDTO
    ): Promise<SuccessLogin | null | undefined> {
      return await $customFetch<SuccessLogin | null | undefined>(
        "/forgot-password",
        {
          method: "POST",
          body: credentials,
        }
      );
    }
    // "The Time-Turner" - Resetting the user's password
    async resetPassword(
      credentials: UserOtpLoginDTO
    ): Promise<SuccessLogin | null | undefined> {
      return await $customFetch<SuccessLogin | null | undefined>(
        "/reset-password",
        {
          method: "POST",
          body: credentials,
        }
      );
    }

    // "Portkey Activation" - Handling the login journey with cookies and redirects
    loginProcess(method: Function): ILoginProcess {
      const authCookie: Ref<string> = useCookie("Authorization", {
        maxAge: 31536000,
      });

      const states = useState<LoginStates>("states");
      const state: Ref<string> = useState("state");
      const router = useRouter();
      const route = useRoute();
      const loading = ref(false);
      const emailState = useState<string>("email");

      // "Floo Network Connection" - Handling the login process
      async function login(credentials: LoginCredentials): Promise<void> {
        loading.value = true;
        try {
          const data = await method(credentials);
          console.log(data);

          authCookie.value = `bearer ${data?.accessToken}`;
          // console.log(authCookie.value);

          await new Promise((resolve) => setTimeout(resolve, 1000));
          console.log("s");

          const userData = await useAuthService().getUser();
          console.log(userData);

          if (userData.loggedIn) {
            router.push((route.query.redirect as string) ?? "/");
          } else if (data.error.value) {
            fireNotification("red", "Dark magic detected! Invalid token.");
          }
        } catch (error: any) {
          console.log(error.response._data.message);
          fireNotification("red", error.response._data.message);
        } finally {
          loading.value = false;
        }
      }

      return {
        authCookie,
        states,
        state,
        loading,
        emailState,
        fireNotification,
        login,
      };
    }

    async updateUserInfo(data: userUpdateDto) {
      const res = await $customFetch<{ message: string; user: UserType }>(
        "/profile",
        {
          method: "PUT",
          body: { ...data },
        }
      );
      const userStore = useAuthUser();
      userStore.addUser(res.user);
      return res;
    }

    async verifyPhone(phone: string) {
      const res = await $customFetch("/verifyPhone", {
        method: "POST",
        body: { phone },
      });
      return res;
    }

    async getProfile() {
      return await $customFetch("/users/profile", { method: "GET" });
    }

    async changePassword(payload: {
      oldPassword: string;
      newPassword: string;
    }) {
      return await $customFetch("/users/change-password", {
        method: "POST",
        body: payload,
      });
    }
  }

  return new AuthService();
};
