import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import './BanksPages.css';

import CreateBankPage from "../CreateBankPage/CreateBankPage";
import {deleteBank, updateBank} from "../../store/actions";
import BanksList from "../../components/BanksList";
import UpdateBankForm from "../../components/BankForm";

const BanksPages = () =>
{
    const dispatch = useDispatch();
    const banks = useSelector(state => state.items);
    const [editFormState, setEditFormState] = React.useState({open: false, id: null});

    const handleCloseEditForm = () =>
    {
        setEditFormState({open: false, id: null});
    };

    const handleOpenEditForm = (id) =>
    {
        setEditFormState({open: true, id});
    };

    const handleEditBank = (data) =>
    {
        dispatch(updateBank({...data, _id: editFormState.id})).then(() => setEditFormState({open: false, id: null}));
    };

    const handleDeleteBank = (id) =>
    {
        dispatch(deleteBank(id));
    };

    const bankDataForEdit = banks?.find(({_id}) => _id === editFormState.id);
    return (
        <div className={'root'}>
            {banks &&
            <BanksList banks={banks} onEditBankFormOpen={handleOpenEditForm} onDeleteBank={handleDeleteBank}/>}
            <CreateBankPage/>
            <UpdateBankForm open={editFormState.open} handleClose={handleCloseEditForm}
                            handleFormSubmit={handleEditBank}
                            label={"Update"} formData={bankDataForEdit}/>
        </div>
    );
};

export default BanksPages;
