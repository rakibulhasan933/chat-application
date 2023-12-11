import { Server } from "socket.io"

class SocketServices {
	private oi: Server;
	constructor() {
		console.log("socket oi init");
		this.oi = new Server({
			cors: {
				allowedHeaders: ["*"],
				origin: "*"
			}
		});
	}
	public initListeners() {
		console.log("socket Init");
		this.oi.on("connect", (socket) => {
			console.log(`New Socket Connected`, socket.id);
			socket.on("event:message", async ({ message }: { message: string }) => {
				console.log("new Message Rec", message);
			})
		})
	}
	get io() {
		return this.oi;
	}
}

export default SocketServices;