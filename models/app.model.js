const mongoose = require('mongoose')
const bool_val = [true,false];
const status_enum = ["Active","Inactive"];

const AppSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    contact: { type: String, required: true},
    isDeleted: { type:Boolean, default: false, enum: bool_val },
    status: {type: String, default: "Active", enum: status_enum }
},{
    timestamps: true
})

module.exports = mongoose.model('user_model',AppSchema);