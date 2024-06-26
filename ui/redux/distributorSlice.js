import { createSlice } from '@reduxjs/toolkit';

const distributorSlice = createSlice({
  name: 'distributor',
  initialState: {
    selectedDistributor: null,
  },
  reducers: {
    setSelectedDistributor: (state, action) => {
      state.selectedDistributor = action.payload;
    },
  },
});

export const { setSelectedDistributor } = distributorSlice.actions;
export default distributorSlice.reducer;