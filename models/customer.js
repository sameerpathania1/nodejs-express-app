const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
   isGold: {
      type: Boolean,
      default: false
   },
   name: {
      type: String,
      require: true,
      minlength: 5,
      maxlength: 50
   },
   phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
   }
}))

validateCustomer = (data) => {
   const schema = {
      name: Joi.string().min(5).max(50).required(),
      phone: Joi.string().min(5).max(50).required(),
      isGold: Joi.boolean()
   }
   return Joi.validate(data, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;