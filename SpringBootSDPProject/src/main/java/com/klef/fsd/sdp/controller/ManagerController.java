package com.klef.fsd.sdp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.klef.fsd.sdp.dto.EventDTO;
import com.klef.fsd.sdp.model.BookEvent;
import com.klef.fsd.sdp.model.Event;
import com.klef.fsd.sdp.model.Manager;
import com.klef.fsd.sdp.service.ManagerService;

@RestController
@RequestMapping("/manager")
@CrossOrigin(origins = "http://localhost:7070")
public class ManagerController 
{
   @Autowired
   private ManagerService managerService;
	   
   @PostMapping("/checkmanagerlogin")
   public ResponseEntity<?> checkmanagerlogin(@RequestBody Manager manager) 
   {
       try 
       {
           Manager m = managerService.checkmanagerlogin(manager.getUsername(), manager.getPassword());

           if (m!=null) 
           {
               return ResponseEntity.ok(m); // if login is successful
           } 
           else 
           {
               return ResponseEntity.status(401).body("Invalid Username or Password"); // if login is fail
           }
       } 
       catch (Exception e) 
       {
           return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
       }
   }



    @PostMapping("/addevent")
    public ResponseEntity<String> addevent(@RequestBody EventDTO dto) {
        try {
            // Fetch manager safely
            Manager manager = managerService.getManagerById(dto.getManagerId());

            Event event = new Event();
            event.setCategory(dto.getCategory());
            event.setTitle(dto.getTitle());
            event.setDescription(dto.getDescription());
            event.setCapacity(dto.getCapacity());
            event.setCost(dto.getCost());
            event.setManager(manager);

            String output = managerService.addevent(event);
            return ResponseEntity.ok(output);

        } catch (RuntimeException re) {
            return ResponseEntity.status(400).body(re.getMessage()); // manager not found
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to Add Event: " + e.getMessage());
        }
    }
    @GetMapping("/vieweventsbymanager/{id}")
public ResponseEntity<List<Event>> getEventsByManager(@PathVariable int id) {
    List<Event> events = eventService.getEventsByManagerId(id);
    return ResponseEntity.ok(events);
}





   @GetMapping("/viewbookingsbymanager/{managerId}")
   public ResponseEntity<List<BookEvent>> viewBookingsByManager(@PathVariable int managerId) 
   { 
       List<BookEvent> events = managerService.getbookingsbyManager(managerId);
       return ResponseEntity.ok(events);
   }

   @GetMapping("/updatebookingstatus")
   public ResponseEntity<String> updateBookingStatus(@RequestParam int id,@RequestParam String status) 
   { 
       try
       {
    	   String output = managerService.updatebookingstatus(id, status);
    	   return ResponseEntity.ok(output);
       }
       catch (Exception e) 
       {
    	   System.out.println(e.getMessage());
    	   return ResponseEntity.status(500).body("Error:" + e.getMessage());
	   }
   }


   
}
