package com.string.roomchat.chat_app_backend.controllers;

import java.time.LocalDateTime;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import com.string.roomchat.chat_app_backend.entities.Message;
import com.string.roomchat.chat_app_backend.entities.Room;
import com.string.roomchat.chat_app_backend.payload.MessageRequest;
import com.string.roomchat.chat_app_backend.repositories.RoomRepository;

@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController {

    private RoomRepository roomRepository;

    public ChatController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    // in here only we will write logic for sending and receiving messages

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}") // messages would be published here
    // When a message is sent to /app//sendMessage/{roomId}, this method:
    // Receives it, Processes it & Broadcasts/Publishes the response to all subscribers of /topic/room/{roomId}.
    public Message sendMessage(@DestinationVariable String roomId, @RequestBody MessageRequest request) {
        Room room = roomRepository.findByRoomId(request.getRoomId());

        Message message = new Message();
        message.setSender(request.getSender());
        message.setContent(request.getContent());
        message.setTimestamp(LocalDateTime.now());

        if(room != null) {
            room.getMessages().add(message);
            roomRepository.save(room);
        } 
        else {
            throw new RuntimeException("Room Not Found");
        }
        
        return message;
    }

}
