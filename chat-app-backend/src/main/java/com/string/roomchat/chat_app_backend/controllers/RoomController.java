package com.string.roomchat.chat_app_backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.string.roomchat.chat_app_backend.entities.Message;
import com.string.roomchat.chat_app_backend.entities.Room;
import com.string.roomchat.chat_app_backend.repositories.RoomRepository;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/v1/rooms") // user will interact with this API through this url
@CrossOrigin("http://localhost:5173 ")
public class RoomController {

    private RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }
    
    // create room using roomid
    @PostMapping //post request
    // @RequestBody means we will be passing the roomId from user entered string from request body itself
    // Instead of directly having return type as Room, we define return type as Response Entity bcz then we have have multiple response type
    public ResponseEntity<?> createRoom(@RequestBody String roomId) {
        if(roomRepository.findByRoomId(roomId) != null) {
            // room is already present
            return ResponseEntity.badRequest().body("Room Already Exists");
        }
        else {
            // create new room
            Room room = new Room();
            room.setRoomId(roomId);
            // save the room in db
            Room savedRoom = roomRepository.save(room);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedRoom);
        }
    }


    //get room used to join the room
    @GetMapping("/{roomId}")
    public ResponseEntity<?> joinRoom(@PathVariable String roomId) {
        Room room = roomRepository.findByRoomId(roomId);
        
        if(room == null) {
            return ResponseEntity.badRequest().body("Room Not Found");
        }
        else {
            return ResponseEntity.ok(room);
        }
    }


    //get messages of room
    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable String roomId, @RequestParam(value = "page", defaultValue = "0", required = false) int page, @RequestParam(value = "size", defaultValue = "20", required = false) int size) {
        
        Room room = roomRepository.findByRoomId(roomId);
        if(room == null) {
            ResponseEntity.badRequest().build();
        }
        
        List<Message> messages = room.getMessages();
        
        int start = Math.max(0, messages.size()-(page+1)*size);
        int end = Math.min(messages.size(), start+size);        
        List<Message> paginatedMessages = messages.subList(start, end);

        return ResponseEntity.ok(paginatedMessages);
        
    }
    

}
