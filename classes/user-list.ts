import { User } from "./user";

export class UserList {
    private list: User[] = [];

    constructor(){
        
    }

    //  Agregar un Usuario
    public add(user: User) {
        this.list.push(user);
        console.log('this.list', this.list)
        return user;
    }

    //  Actualiar nombre
    public updateName( id: string, name: string ){
        for(let user of this.list){
            if(user.id === id){
                user.name = name;
                break;
            }
        }
        console.log('actualizando user');
        console.log('this.list', this.list)
    }

    // Obtener Lista de Usuarios
    public getList(){
        return this.list;
    }
    // Obtener un usuario
    public getUser(id: string){
        return this.list.find(user => user.id === id)
    }

    // Obtener usuario en sala particular
    public getUserInRoom( room: string){
        return this.list.filter( user => user.room === room );
    }

    // Borrar ususario
    public deleteUser(id: string){
        const tempUser = this.getUser(id);
        this.list = this.list.filter( user =>  user.id !== id );        
        return tempUser;
    }
    

    

}