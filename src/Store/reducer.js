const initialState = {
  heading: "",
  content: "",
  weekNum: "",
  date: "",
  saving: false,
  data: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVING":
      return {
        ...state,
        saving: action.savingData,
      };
    case "DATA":
      return {
        ...state,
        data: [...action.noteData],
      };
    default:
      return state;
  }
};

export default reducer;
