import axios from "axios";
import {bankConstants} from "./constants";

const setLoading = (payload) => ({
    type: bankConstants.SET_LOADING_STATUS,
    payload
});

const setError = (payload) => ({
    type: bankConstants.SET_ERROR,
    payload
});

export const getAllBanks = () => async (dispatch) =>
{
    try
    {
        dispatch(setLoading(true));
        const {data} = await axios.get('/banks');
        dispatch(success(data.data));
    } catch (e)
    {
        dispatch(setError(e));
    }

    function success(payload)
    {
        return {
            type: bankConstants.GET_ALL_BANKS_SUCCESS,
            payload
        };
    }
};

export const deleteBank = (id) => async (dispatch) =>
{
    try
    {
        dispatch(setLoading(true));
        await axios.delete('/banks/' + id);
        dispatch(success(id));
        const userBanks = JSON.parse(localStorage.getItem('banks'));
        if (userBanks)
        {
            localStorage.setItem('banks', JSON.stringify(userBanks.filter(_id => _id !== id)));
        }
    } catch (e)
    {
        setError(e);
    }

    function success(payload)
    {
        return {
            type: bankConstants.DELETE_BANK_SUCCESS,
            payload
        };
    }
};

export const createBank = (bankData) => async (dispatch) =>
{
    return new Promise(async (res, rej) =>
    {
        try
        {
            dispatch(setLoading(true));
            const {data: {data}} = await axios.post('/banks', bankData);
            const userBanks = JSON.parse(localStorage.getItem('banks'));
            if (userBanks)
            {
                localStorage.setItem('banks', JSON.stringify([data._id, ...userBanks]));
            }
            else
            {
                localStorage.setItem('banks', JSON.stringify([data._id]));
            }
            dispatch(success(data));
            res();
        } catch (e)
        {
            setError(e);
        }
    });

    function success(payload)
    {
        return {
            type: bankConstants.CREATE_BANK_SUCCESS,
            payload
        };
    }
};

export const updateBank = (bankData) => async (dispatch) =>
{
    return new Promise(async (res, rej) =>
    {
        try
        {
            dispatch(setLoading(true));
            const {data} = await axios.put('/banks', bankData);
            dispatch(success(data.data));
            res();
        } catch (e)
        {
            setError(e);
        }
    });

    function success(payload)
    {
        return {
            type: bankConstants.UPDATE_BANK_SUCCESS,
            payload
        };
    }
};