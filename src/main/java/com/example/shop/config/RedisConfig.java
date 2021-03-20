package com.example.shop.config;/*
 *FileName:  RedisConfig
 * Author:   asus
 * Date  :   2021/3/6 16:54
 * */


import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@EnableConfigurationProperties({RedisProperties.class})
@Configuration
public class RedisConfig {


}
