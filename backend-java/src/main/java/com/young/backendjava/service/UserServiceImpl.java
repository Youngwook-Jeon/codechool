package com.young.backendjava.service;

import com.young.backendjava.domain.UserEntity;
import com.young.backendjava.repository.UserRepository;
import com.young.backendjava.shared.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
@Qualifier("userService")
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    @Override
    public UserDto createUser(UserDto userDto) {
        UserEntity userEntity = modelMapper.map(userDto, UserEntity.class);
        userEntity.setEncodedPassword("P4ssword");
        userEntity.setUserId("testid");
        UserEntity userInDb = userRepository.save(userEntity);
        return modelMapper.map(userInDb, UserDto.class);
    }
}
