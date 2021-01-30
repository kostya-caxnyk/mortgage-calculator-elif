import React from 'react';

import Table from "@material-ui/core/Table";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const TableWithMortgage = React.memo(({bank, loan, payment, totalPayment}) =>
{
    const data = [];
    let calcLoan = +loan;
    for (let i = 0; i < bank.loanTerm; i++)
    {
        const interestPayment = (bank.rate / 1200) * calcLoan;
        const loanBalance = calcLoan - +totalPayment + interestPayment;
        data.push({
            month: i + 1,
            totalPayment,
            interestPayment,
            loanBalance,
            equity: +payment + (+totalPayment * (i + 1)) - data.reduce((acc, month) => acc + month.interestPayment, 0) - interestPayment
        });
        calcLoan = loanBalance;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Month</TableCell>
                        <TableCell align="right">Total payment</TableCell>
                        <TableCell align="right">Interest payment</TableCell>
                        <TableCell align="right">Loan balance</TableCell>
                        <TableCell align="right">Equity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((data, idx) => (
                        <TableRow key={idx}>
                            <TableCell component="th" scope="row">{data.month}</TableCell>
                            <TableCell align="right">{Number(data.totalPayment).toFixed(2)}$</TableCell>
                            <TableCell align="right">{data.interestPayment.toFixed(2)}$</TableCell>
                            <TableCell align="right">{data.loanBalance.toFixed(2)}$</TableCell>
                            <TableCell align="right">{data.equity.toFixed(2)}$</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

export default TableWithMortgage;
