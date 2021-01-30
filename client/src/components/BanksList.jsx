import React from 'react';

import '../pages/BanksPage/BanksPages.css';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined';
import makeStyles from "@material-ui/core/styles/makeStyles";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(() => ({
    menu: {
        backgroundColor: '#00f0f0'
    },
    moreIcon: {
        padding: 5,
        marginLeft: -15,
        marginRight: 10
    },
    accSummary: {
        alignItems: 'center'
    }
}));

export default function BanksList({banks, onEditBankFormOpen, onDeleteBank})
{
    const classes = useStyles();
    const [expandedBank, setExpandedBank] = React.useState(null);
    const [anchorElForMenu, setAnchorElForMenu] = React.useState(null);

    const handleChangeExpendedBank = (id) => (event, isExpanded) =>
    {
        setExpandedBank(isExpanded ? id : null);
    };

    const onOpenMoreInfo = (event) =>
    {
        event.preventDefault();
        event.stopPropagation();
        setAnchorElForMenu(event.currentTarget);
    };

    const handleCloseMoreInfo = (event) =>
    {
        event.stopPropagation();
        setAnchorElForMenu(null);
    };

    const handleDeleteBank = () =>
    {
        onDeleteBank(anchorElForMenu?.dataset.id);
        setAnchorElForMenu(null);
    };

    const handleOpenEditBankForm = () =>
    {
        onEditBankFormOpen(anchorElForMenu?.dataset.id);
        setAnchorElForMenu(null);
    };

    return (
        <div className={"banks"}>
            <p style={{fontSize: 13}}>For editing or deleting bank you should be its author</p>
            <p style={{fontSize: 13}}>I'm saving banks that you have created in your localStorage</p>
            {banks.map(bank =>
            {
                const userBanks = JSON.parse(localStorage.getItem('banks'));
                const isAuthor = userBanks ? userBanks.includes(bank._id) : false;
                return <Accordion key={bank._id} expanded={expandedBank === bank._id} className={"accordion"}
                                  onChange={handleChangeExpendedBank(bank._id)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>} classes={{content: classes.accSummary}}>
                        {isAuthor &&
                        <IconButton onClick={onOpenMoreInfo} className={classes.moreIcon} data-id={bank._id}>
                            <MoreIcon/>
                        </IconButton>}
                        <Typography style={{marginRight: 40}}>{bank.name}</Typography>
                        <Typography>{bank.maxLoan}$</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{display: 'block'}}>
                        <Typography>
                            Interest rate: {bank.rate}%
                        </Typography>
                        <Typography>
                            Maximum loan: {bank.maxLoan}$
                        </Typography>
                        <Typography>
                            Minimum down payment: {bank.downPayment}$
                        </Typography>
                        <Typography>
                            Loan term: {bank.loanTerm} month
                        </Typography>
                    </AccordionDetails>
                </Accordion>;
            })}
            <Menu
                anchorEl={anchorElForMenu}
                keepMounted
                open={Boolean(anchorElForMenu)}
                onClose={handleCloseMoreInfo}
                classes={{
                    paper: classes.menu
                }}
            >
                <MenuItem onClick={handleDeleteBank}>
                    <ListItemIcon>
                        <DeleteIcon/>
                    </ListItemIcon>
                    Delete bank
                </MenuItem>
                <MenuItem onClick={handleOpenEditBankForm}>
                    <ListItemIcon>
                        <EditIcon/>
                    </ListItemIcon>
                    Edit bank
                </MenuItem>
            </Menu>
        </div>
    );
}