
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  first_name: string;
  middle_name: string;
  last_name: string;
  whatsapp_no:string,
  username: string;
  age:string,
  phone_no: string;
  birth_date: string;
  email: string;
  password: string;
  confirm_password: string;
  address: string;
  pincode: string;
  final_confirm_password: string,
  area:string
}

const initialState: UserState = {
  first_name: '',
  middle_name: '',
  age:'',
  last_name: '',
  username: '',
  phone_no: '',
  whatsapp_no: '',
  birth_date:'' ,
  email: '',
  password: '',
  confirm_password: '',
  final_confirm_password: '',
  area:'',
  address: '',
  pincode: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      console.log({ ...state, ...action.payload });
      return { ...state, ...action.payload };
    },
    resetUser: () => initialState,
  },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
