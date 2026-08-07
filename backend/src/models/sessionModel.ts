import mongoose, { type InferSchemaType } from "mongoose";

const sessionSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    refreshTokenID: {
        type: String,
        required: true,
        uniqure: true
    },
    issuedAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    expiration: {
        type: Date,
        default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
        required: true
    }
})

export type SessionDocument = InferSchemaType<typeof sessionSchema>

const Session = mongoose.model("Session", sessionSchema)

export default Session