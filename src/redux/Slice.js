import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: [],
  currentUserId: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const exists = state.user.find(u => u.id === action.payload.id);
      if (!exists) {
        state.user.push({
          ...action.payload,
          activity: {
            Easy: {
              totalScore: 0,
              totalGame: 0,
            },
            Medium: {
              totalScore: 0,
              totalGame: 0,
            },
            Hard: {
              totalScore: 0,
              totalGame: 0,
            },
          },
        });
      }
    },

    setCurrentUser: (state, action) => {
      state.currentUserId = action.payload;
    },

    addTotalScore: (state, action) => {
      const {level, score} = action.payload;
      const user = state.user.find(u => u.id === state.currentUserId);
      if (user && user.activity[level]) {
        user.activity[level].totalScore += score;
      }
    },

    addTotalGame: (state, action) => {
      const {level} = action.payload;
      const user = state.user.find(u => u.id === state.currentUserId);
      if (user && user.activity[level]) {
        user.activity[level].totalGame += 1;
      }
    },

    updateUser: (state, action) => {
      const {id, updates} = action.payload;
      const user = state.user.find(u => u.id === id);
      if (user) {
        Object.assign(user, updates);
      }
    },
  },
});

export const {
  addUser,
  setCurrentUser,
  addTotalScore,
  addTotalGame,
  updateUser,
} = slice.actions;
export default slice.reducer;
