package com.string.roomchat.chat_app_backend.entities;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "rooms") //reference to mongodb's collection we have, provide name if collection has diff name from classname
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    private String id; //mongodb's unique identifier
    private String roomId; //user will specify this roomid, so that user can share it easily

    private List<Message> messages = new ArrayList<>();

}
