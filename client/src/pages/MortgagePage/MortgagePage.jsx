import React, {useState} from 'react';
import {useSelector} from "react-redux";

import './MortgagePage.css';

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Table from "../../components/Table";

const MortgagePage = () =>
{
    const banks = useSelector(state => state.items);
    const [selectedBank, setSelectedBank] = useState('');
    const [inputData, setInputData] = useState({loan: '', payment: ''});

    const handleChangeBank = (e) =>
    {
        setSelectedBank(e.target.value);
    };

    const handleChangeInputValue = (e) =>
    {
        setInputData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
        setSelectedBank('')
    };

    const isAllDataEntered = inputData.payment && inputData.loan && selectedBank && banks;
    const result = React.useMemo(() =>
    {
        if (!isAllDataEntered)
        {
            return '';
        }
        const selectedBankData = banks.find(({_id}) => selectedBank === _id);
        const interestRate = selectedBankData.rate / 1200;
        const interestRateForMonths = (1 + interestRate) ** selectedBankData.loanTerm;
        return ((inputData.loan * interestRate * interestRateForMonths) / (interestRateForMonths - 1)).toFixed(3);
    }, [isAllDataEntered, inputData.loan, selectedBank, banks]);

    if (!banks)
    {
        return null;
    }
    const selectedBankData = banks.find(({_id}) => selectedBank === _id);
    return (
        <section className={"wrapper"}>
            <main className={"inner"}>
                <div style={{width: 300}}>
                    <TextField
                        margin="dense"
                        name="loan"
                        label="Initial loan in $"
                        type="number"
                        value={inputData.loan}
                        onChange={handleChangeInputValue}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="payment"
                        label="Down payment in $"
                        type="number"
                        value={inputData.payment}
                        onChange={handleChangeInputValue}
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel htmlFor="age-native-simple">Bank</InputLabel>
                        <Select
                            native
                            value={selectedBank}
                            onChange={handleChangeBank}
                            inputProps={{id: 'age-native-simple'}}
                        >
                            <option aria-label="None" value=""/>
                            {banks.map(bank =>
                            {
                                if (bank.maxLoan < inputData.loan || (bank.downPayment > inputData.payment && inputData.payment))
                                {
                                    return null;
                                }
                                return <option key={bank._id} value={bank._id}>{bank.name}</option>;
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div className={"result"}>
                    {selectedBank && <>
                        <Typography style={{fontSize: 25}}>Info about bank: </Typography>
                        <Typography>
                            Interest rate: {selectedBankData.rate}%
                        </Typography>
                        <Typography>
                            Maximum loan: {selectedBankData.maxLoan}$
                        </Typography>
                        <Typography>
                            Minimum down payment: {selectedBankData.downPayment}$
                        </Typography>
                        <Typography>
                            Loan term: {selectedBankData.loanTerm} month
                        </Typography>
                    </>}
                    <Typography style={{fontSize: 25}}>Payment plan for your mortgage:</Typography>
                    <p className={"resultLabel"}>{result}$</p>
                </div>
            </main>
            {isAllDataEntered &&
            <Table bank={selectedBankData} loan={inputData.loan} payment={inputData.payment} totalPayment={result}/>}
        </section>
    );
};

export default MortgagePage;
