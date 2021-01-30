import mongoose from 'mongoose';

const {model, Schema} = mongoose;

const BankSchema = new Schema(
    {
        name: {
            type: Schema.Types.String,
            required: true
        },
        rate: {
            type: Schema.Types.Number,
            required: true
        },
        maxLoan: {
            type: Schema.Types.Number,
            required: true
        },
        downPayment: {
            type: Schema.Types.Number,
            required: true
        },
        loanTerm: {
            type: Schema.Types.Number,
            required: true
        }
    }, {
        timestamps: true
    }
);

export default model('Bank', BankSchema);