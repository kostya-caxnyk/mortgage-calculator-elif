import BankModel from "../Models/BankModel.js";

class BankController {
    async getAll(req, res)
    {
        try
        {
            const banks = await BankModel.find({}).sort({'createdAt': -1}).lean().exec();
            res.status(200).json({data: banks});
        } catch (e)
        {
            res.status(500).json({error: 'Something went wrong...'});
        }
    }

    async createBank(req, res)
    {
        try
        {
            const {name, rate, maxLoan, downPayment, loanTerm} = req.body;
            const newBank = await new BankModel({name, rate, maxLoan, downPayment, loanTerm});
            newBank.save();
            res.status(201).json({data: newBank});
        } catch (e)
        {
            res.status(500).json({error: 'Something went wrong...'});
        }
    }

    async deleteBank(req, res)
    {
        try
        {
            const {id} = req.params;
            await BankModel.findByIdAndDelete(id);
            res.status(204).send();
        } catch (e)
        {
            res.status(500).json({error: 'Something went wrong...'});
        }
    }

    async updateBank(req, res)
    {
        try
        {
            const {name, rate, maxLoan, downPayment, loanTerm, _id} = req.body;
            const updatedBank = await BankModel.findOneAndUpdate({_id}, {
                name,
                rate,
                maxLoan,
                downPayment,
                loanTerm
            }, {new: true}).lean().exec();
            res.status(200).json({data: updatedBank});
        } catch (e)
        {
            res.status(500).json({error: 'Something went wrong...'});
        }
    }
}

export default new BankController();