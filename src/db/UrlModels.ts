import mongoose, { Schema } from 'mongoose';

const modelUrl = new Schema({
    unique: {
        type: String,
        unique: true,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    clicked: {
        type: Number,
        default: 0,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    ipaddress: {
        type: String,
        required: true,
    },
});

const UrlModels = mongoose.models.Url || mongoose.model('Url', modelUrl);

export default UrlModels;
