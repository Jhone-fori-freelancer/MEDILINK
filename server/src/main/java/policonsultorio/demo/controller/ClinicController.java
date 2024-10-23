package policonsultorio.demo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import policonsultorio.demo.dto.clinic.ResponseClinic;
import policonsultorio.demo.repository.ClinicRepository;
import policonsultorio.demo.service.ClinicService;

import java.util.Map;

@RestController
@RequestMapping("/clinic")
@CrossOrigin("*")
public class ClinicController {

    @Autowired
    private ClinicService clinicService;

    @PostMapping(produces = "application/json")
    public ResponseEntity<?> createClinic(@RequestBody @Valid ResponseClinic responseClinic){
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(clinicService.register(responseClinic));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));

        }
    }
}
