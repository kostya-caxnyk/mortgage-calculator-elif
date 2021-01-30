import React from 'react';
import {useDispatch} from "react-redux";

import Button from "@material-ui/core/Button";
import CreateBankForm from "../../components/BankForm";
import {createBank} from "../../store/actions";

const CreateBankPage = () =>
{
    const dispatch = useDispatch();
    const [isFormOpen, setOpenForm] = React.useState(false);

    const handleOpenForm = () =>
    {
        setOpenForm(true);
    };

    const handleCloseForm = () =>
    {
        setOpenForm(false);
    };

    const handleAddBank = (data) =>
    {
        dispatch(createBank(data)).then(() => setOpenForm(false));
    };

    return (
        <div>
            <Button color={'primary'} variant={'contained'} onClick={handleOpenForm}>Create bank</Button>
            <CreateBankForm open={isFormOpen} handleClose={handleCloseForm} handleFormSubmit={handleAddBank}
                      label={"Create"}/>
        </div>
    );
};

export default CreateBankPage;
