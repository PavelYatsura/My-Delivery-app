import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storege";
import { LoginResponse } from "../interfaces/auth.interface";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../helpers/API";
import { Porfile } from "../interfaces/user.interface";
import { RootState } from "./store";

export const JWT_PERSISTENT_STATE = "userData";

export interface UserPersistentState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string;
  profile?: Porfile;
  registerErrorMessage?: string;
}

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email: params.email,
        password: params.password,
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);
export const register = createAsyncThunk(
  "user/register",
  async (params: { email: string; password: string; name: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        `${PREFIX}/auth/register`,
        {
          email: params.email,
          password: params.password,
          name: params.name,
        }
      );
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const getPorfile = createAsyncThunk<Porfile, void, { state: RootState }>(
  "user/getPorfile",
  async (_, thinkApi) => {
    const jwt = thinkApi.getState().user.jwt;
    const { data } = await axios.get<Porfile>(`${PREFIX}/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    },
    clearRegisterError: (state) => {
        state.registerErrorMessage = undefined;
      },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.access_token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
    builder.addCase(getPorfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    // register
    builder.addCase(register.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }
        state.jwt = action.payload.access_token;
      });
      builder.addCase(register.rejected, (state, action) => {
        state.registerErrorMessage = action.error.message;
      });
  },
});

export default userSlice.reducer;
export const userActon = userSlice.actions;
