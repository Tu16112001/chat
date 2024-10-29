const initialState = {
    profileId: null,
    // Các trạng thái khác của profile nếu cần
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SAVE_PROFILE_ID':
        return {
          ...state,
          profileId: action.payload,
        };
      // Xử lý các action khác nếu cần
      default:
        return state;
    }
  };
  
  export default profileReducer;