import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: "team",
  initialState: {
    heroes: [],
  },
  reducers: {
    addHero: (state, action) => {
      state.heroes.unshift(action.payload);
    },
    deleteHero: (state, action) => {
      return {
        ...state,
        heroes: state.heroes.filter((hero) => hero.id !== action.payload.id)
      };
    },
  },
});

export const { addHero, deleteHero } = teamSlice.actions;
export default teamSlice.reducer;
