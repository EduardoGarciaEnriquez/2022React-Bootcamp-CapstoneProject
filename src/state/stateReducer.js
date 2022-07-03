const stateReducer = (state, action) => {
    switch (action.type) {
        case "GET_BANNERS_REQUEST":
            return {
                ...state,
                bannerContent: action.payload,
                fetching: true,
                error: false,
                succces: false
            };
        case "GET_BANNERS_SUCESS":
            return {
                ...state,
                bannerContent: action.payload,
                fetching: false,
                error: false,
                succces: true
            };
        case "GET_BANNERS_FAILURE":
            return {
                ...state,
                bannerContent: action.payload,
                fetching: false,
                error: true,
                succces: false,
            };
        // case "SET_CURRENT_EMPLOYEE":
        //     return {
        //         ...state,
        //         currentEmployee: action.payload
        //     };
        // case "ADD_EMPLOYEE":
        //     return {
        //         ...state,
        //         employees: state.employees.concat(action.payload)
        //     };

        // case "RESET_EMPLOYEES":
        //     return {
        //         ...state,
        //         employees: [],
        //         currentEmployee: {}
        //     };
        default:
            return state;
    }
};

export default stateReducer;
