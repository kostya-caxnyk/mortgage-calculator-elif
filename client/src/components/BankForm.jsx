import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup.string().required('Enter bank name').min(3, 'Minimum length 3 symbols').max(15, 'Max length 15 symbols'),
    rate: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .required('Enter interest rate')
        .min(1, 'Min interest rate 1%')
        .max(99, 'Max interest rate 99%'),
    maxLoan: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .required('Enter max loan')
        .min(1, 'Min loan  1$')
        .max(999999999, 'Max loan  999 999 999$'),
    downPayment: yup.number().transform(value => (isNaN(value) ? undefined : value))
        .required('Enter minimum down payment')
        .min(0, 'Minimum down payment 0$')
        .max(99999999, 'Max down payment 99999999$'),
    loanTerm: yup
        .number()
        .transform(value => (isNaN(value) ? undefined : value))
        .required('Enter loan term')
        .min(1, 'Minimum loan term 1 month')
        .max(150, 'Max loan term 150 month')
});

export default function BankForm({open, handleClose, handleFormSubmit, label, formData = {}})
{
    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(formSchema)
    });

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{label}  bank</DialogTitle>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="name"
                        id="name"
                        label="Bank name"
                        type="text"
                        inputRef={register}
                        helperText={errors.name?.message}
                        error={!!errors.name}
                        defaultValue={formData.name}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name={'rate'}
                        id="rate"
                        label="Interest rate %"
                        type="number"
                        inputRef={register}
                        helperText={errors.rate?.message}
                        error={!!errors.rate}
                        defaultValue={formData.rate}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="maxLoan"
                        id="maxLoan"
                        label="Maximum loan in $"
                        type="number"
                        inputRef={register}
                        helperText={errors.maxLoan?.message}
                        error={!!errors.maxLoan}
                        defaultValue={formData.maxLoan}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="downPayment"
                        id="downPayment"
                        label="Minimum down payment in $"
                        type="number"
                        inputRef={register}
                        helperText={errors.downPayment?.message}
                        error={!!errors.downPayment}
                        defaultValue={formData.downPayment}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="loanTerm"
                        id="loanTerm"
                        label="Loan term in month"
                        type="number"
                        inputRef={register}
                        helperText={errors.loanTerm?.message}
                        error={!!errors.loanTerm}
                        defaultValue={formData.loanTerm}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit" color="primary" variant={'contained'}>
                        {label}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}