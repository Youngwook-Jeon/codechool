package com.young.backendjava.service;

import com.young.backendjava.domain.UserEntity;
import com.young.backendjava.exception.EmailExistsException;
import com.young.backendjava.repository.UserRepository;
import com.young.backendjava.shared.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service(value = "userService")
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserDto createUser(UserDto userDto) {
        if (userRepository.findByEmail(userDto.getEmail()) != null) {
            throw new EmailExistsException("이미 존재하는 유저입니다.");
        }
        UserEntity userEntity = modelMapper.map(userDto, UserEntity.class);
        userEntity.setEncodedPassword(passwordEncoder.encode(userDto.getPassword()));
        userEntity.setUserId(UUID.randomUUID().toString());
        UserEntity userInDb = userRepository.save(userEntity);
        return modelMapper.map(userInDb, UserDto.class);
    }

    @Override
    public UserDto getUser(String email) {
        UserEntity userEntity = findByEmail(email);
        return modelMapper.map(userEntity, UserDto.class);
    }

    private UserEntity findByEmail(String email) {
        UserEntity userEntity = userRepository.findByEmail(email);
        if (userEntity == null) {
            throw new UsernameNotFoundException(email);
        }
        return userEntity;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity userEntity = findByEmail(email);
        return new User(userEntity.getEmail(), userEntity.getEncodedPassword(), new ArrayList<>());
    }
}
