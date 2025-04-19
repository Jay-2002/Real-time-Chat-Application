package com.string.roomchat.chat_app_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker // intermediatary which routes messages to server 
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    
    // we need to configure message broker
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {

        // this enables a simple in memory messsage broker
        // messages coming from server will be published to endpoint /topic
        // client will subscribe to this endpoint having prefix /topic 
        config.enableSimpleBroker("/topic");

        // the controller on the server side will handle messages coming to this endpoint prefix
        // basically client will send messages at /app/..., server side anonymous controller will handle them
        // client has to send to say "/v3/chat" this is actually coonverted to "/app/v3/chat"
        config.setApplicationDestinationPrefixes("/app");

    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // client will establish connection at this endpoint
        // the url and port number can change while making frontend
        // if client side doesn't support this websocket, then sockjs provides us with safe fallback
        registry.addEndpoint("/chat").setAllowedOrigins("http://localhost:5173").withSockJS();
    }

}
