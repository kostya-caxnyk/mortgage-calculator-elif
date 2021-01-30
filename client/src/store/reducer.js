import {bankConstants} from './constants';

const bankReducer = (state = {}, action) =>
{
    switch (action.type)
    {
        case bankConstants.SET_LOADING_STATUS:
            return {
                ...state,
                loading: action.payload
            };
        case bankConstants.SET_ERROR:
            return {
                loading: false,
                error: action.payload
            };
        case bankConstants.GET_ALL_BANKS_SUCCESS:
            return {
                loading: false,
                items: action.payload
            };
        case bankConstants.DELETE_BANK_SUCCESS:
            if (state.items)
            {
                const newItems = state.items.filter(bank => bank._id !== action.payload);
                return {
                    loading: false,
                    items: newItems
                };
            }
            else
            {
                return {
                    ...state,
                    loading: false
                };
            }
        case bankConstants.CREATE_BANK_SUCCESS:
            return state.items ? {loading: false, items: [action.payload, ...state.items]} : {...state, loading: false};
        case bankConstants.UPDATE_BANK_SUCCESS:
            if (state.items)
            {
                const updatedBank = action.payload;
                const newItems = state.items.map(bank => bank._id === updatedBank._id ? updatedBank : bank);
                return {
                    loading: false,
                    items: newItems
                };
            }
            else
            {
                return {
                    ...state,
                    loading: false
                };
            }
        default:
            return state;
    }
};

export default bankReducer;