package com.string.roomchat.chat_app_backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.string.roomchat.chat_app_backend.entities.Room;

public interface RoomRepository extends MongoRepository<Room,String> {
    
    //function to get room using roomid
    Room findByRoomId(String roomId);

}
