import { Schema, model, Document, Types } from "mongoose";

interface ITestResult extends Document{
    _id: Types.ObjectId,
    userId:string,
    numberWrongCharacters: number,
    numberCorrectCharacters: number,
    numberWrongWords: number,
    numberCorrectWords: number,
    datetime: Date
}

const TestResultSchema:Schema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    numberWrongCharacters:{
        type: Number,
        required: true,
    },
    numberCorrectCharacters:{
        type: Number,
        required: true,
    },
    numberWrongWords:{
        type: Number,
        required: true,
    },
    numberCorrectWords:{
        type: Number,
        required: true,
    },
    datetime: {
        type: Date,
        required: true,
    }
});

TestResultSchema.index({userId:1,datetime:-1});

const TestResult = model<ITestResult>('TestResult',TestResultSchema);
export default TestResult;