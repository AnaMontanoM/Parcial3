import React from "react";
import io from "socket.io-client";

class ChatRoom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			newMessage: "",
		};

		// Conectarse al servidor de Socket.IO
		this.socket = io("http://localhost:4000");
	}

	componentDidMount() {
		// Escuchar el evento 'message' y agregar los mensajes al estado
		this.socket.on("message", (message) => {
			this.setState((prevState) => ({
				messages: [...prevState.messages, message],
			}));
		});
	}

	componentWillUnmount() {
		// Desconectarse del servidor de Socket.IO al quitar el componente
		this.socket.disconnect();
	}

	handleMessageChange = (event) => {
		this.setState({ newMessage: event.target.value });
	};

	handleMessageSubmit = (event) => {
		event.preventDefault();
		if (this.state.newMessage !== "") {
			// Enviar el mensaje al servidor de Socket.IO
			this.socket.emit("message", this.state.newMessage);
			this.setState({ newMessage: "" });
		}
	};

	render() {
		return (
			<div>
				<div className="chat-messages">
					{this.state.messages.map((message, index) => (
						<div key={index}>{message}</div>
					))}
				</div>
				<form onSubmit={this.handleMessageSubmit}>
					<input
						type="text"
						value={this.state.newMessage}
						onChange={this.handleMessageChange}
					/>
					<button type="submit">Enviar</button>
				</form>
			</div>
		);
	}
}

export default ChatRoom;
