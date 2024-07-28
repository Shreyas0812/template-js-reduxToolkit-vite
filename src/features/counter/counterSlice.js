import { createAppSlice } from "../../app/createAppSlice";

const initialState = {
  value: 0,
  status: "idle",
};

export const counterSlice = createAppSlice({
  name: "counter",
  initialState,
  reducers: (create) => ({
    increment: create.reducer((state) => {
      state.value += 1;
    }),
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: create.reducer((state, action) => {
      state.value += action.payload;
    }),
    incrementAsync: create.asyncThunk(
      async (amount) => {
        const respone = await fetchCount(amount);
        return respone.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.value += action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectCount: (state) => state.value,
    selectStatus: (state) => state.status,
  },
});

export const { increment, decrement, incrementByAmount, incrementAsync } =
  counterSlice.actions;

export const { selectCount, selectStatus } = counterSlice.selectors;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());

  if (currentValue % 2 === 1 || currentValue % 2 === -1) {
    dispatch(incrementByAmount(amount));
  }
};
