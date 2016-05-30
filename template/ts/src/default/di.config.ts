import kernel from '../kernel';
{{#crs}}
import { CommandEmitter, Command } from  'ck-crs/core';

/**
 * Ck.Crs Configuration
 */

var emitter = CommandEmitter.create('/uri',  $.hubConnection() );
kernel.bind<CommandEmitter>("CommandEmitter").toConstantValue(emitter);

{{/crs}}