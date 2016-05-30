import { CommandEmitter, Command } from  'ck-crs/core';

var emitter = CommandEmitter.create('/uri',  $.hubConnection() );
kernel.bind<CommandEmitter>("CommandEmitter").toConstantValue(emitter);

export default emitter;