import { Server } from "socket.io";

let io;


export async function GET(req) {
    if(!io){
        io= new Server()
    }
    
}