import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UserList } from '../classes/user-list';
import { User } from '../classes/user';


export const userConnected = new UserList();


export const clientConnect = (client: Socket) => {
    const user = new User( client.id );
    userConnected.add(user);
};

export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {        
        userConnected.deleteUser(client.id);
    });
}

// Escuchar message
export const message = (client: Socket, io: socketIO.Server) => {
    client.on('message', (payload:any) => {
        console.log(payload);

        io.emit('new-message', payload);


    });
}


// Configurar Usuario
export const configUser = (client: Socket, io: socketIO.Server) => {
    client.on('configuration-user', (payload: {name:string},callback: Function) => {

        userConnected.updateName(client.id, payload.name);

        callback({
          ok: true,
          message: `Usuario ${payload.name}, configurado correctamente`
        })

        // io.emit('configuration-user', payload);


    });
}