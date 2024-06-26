
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  phoneNumber: '',
  isAuthenticated: false,
  userType: '',
  uerData:'',
  userid:'',
 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    resetAuth: (state) => {
      state.phoneNumber = '';
      state.isAuthenticated = false;
      state.userType = '';
    },
    userId:(state,action)=>{
        state.userid=action.payload;
    }
  },
});


export const verifyOtp = (otp) => async (dispatch) => {
  try {
   
    const response = await yourBackendApi.verifyOtp(otp);

    if (response.success) {
      dispatch(setAuthenticated(true));
    } else {
     
      console.error('OTP verification failed');
    }
  } catch (error) {
    console.error('Error verifying OTP', error);
  }
};

export const { setPhoneNumber, setUserType, resetAuth, userId } = authSlice.actions;


export default authSlice.reducer;
