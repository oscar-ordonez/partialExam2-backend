var joi = require('joi');
var boom = require('boom');
var user = require('../schemas/user');
var SHA3 = require("crypto-js/sha3");

exports.login = {
    auth: false,
    validate: {
      payload: {
        username: joi.string().required(),
        password: joi.string().min(1).max(20).required()
      }
    },
    handler: function(request, reply) {
      var password = String(SHA3(request.payload.password));
      user.find({username: request.payload.username, password: password}, function(err, user){
          console.log(user);
          console.log(err)
          if(!err){
            if(user.length > 0){
              request.auth.session.set(user[0]);
              return reply({username: user[0].username, scope: user[0].scope, password: user[0].password, phone: user[0].phone, name: user[0].name, email: user[0].email});
            }
            return reply(boom.unauthorized('Wrong email or password'));
          }
          return reply(boom.notAcceptable('Error Executing Query'));
      });
    }
};
exports.logout = {
    auth: {
      mode:'required',
      strategy:'session'
    },
    handler: function(request, reply) {
      request.auth.session.clear();
      return reply('Logout Successful!');
    }
  };
