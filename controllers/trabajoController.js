var trabajo = require('../schemas/trabajo');
var boom = require('boom');

exports.createTrabajo = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin']
  },
  handler: function(request, reply) {
    console.log(request.payload);
    var newTrabajo = new trabajo({
      titulo : request.payload.titulo,
      descripcion : request.payload.descripcion,
      cargo : request.payload.cargo,
      informacion : request.payload.informacion,
      salario : request.payload.salario,
      archivado : request.payload.archivado
    });
    newTrabajo.save(function (err) {
      console.log(err);
      if(err){
        return reply(boom.notAcceptable('Username must be unique: ' + err));
      }else{
        return reply('ok');
      };
    });
  }
};

exports.getTrabajos = {
  handler: function(request, reply){
    var trabajos = user.find({});
    reply(trabajos);
  }
}

exports.updateTrabajo = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin']
  },
  handler: function(request, reply){
    trabajo.update({_id:request.params.trabajoId},
      { titulo : request.payload.titulo,
        descripcion : request.payload.descripcion,
        cargo : request.payload.cargo,
        informacion : request.payload.informacion,
        salario : request.payload.salario,
        archivado : request.payload.archivado
      }).exec();
    reply("ok");
  }
}

exports.getTrabajo = {
  handler: function(request, reply){
    var trabajos = trabajo.find({_id:request.params.trabajoId});
    reply(trabajos);
  }
}
