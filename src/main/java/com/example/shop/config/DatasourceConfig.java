package com.example.shop.config;


import com.zaxxer.hikari.HikariDataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;


@Configuration
public class DatasourceConfig {
	private Logger logger = LoggerFactory.getLogger(DatasourceConfig.class);
	
    @Value("${jdbc.url}")
    private String url;
    
    @Value("${jdbc.username}")
    private String username;
    
    @Value("${jdbc.password}")
    private String password;


    @Value("${jdbc.maxPoolSize}")
    private int maxPoolSize;
    
    @Value("${jdbc.maxlifetime}")
    private long maxLifetimeMs;

    @Bean(name="localdataSource" )
    @Primary
    public DataSource dataSource(){
        HikariDataSource datasource = new HikariDataSource();
        try {  
	        datasource.setJdbcUrl(url);
            datasource.setConnectionTestQuery("select 1");
	        datasource.setUsername(username);  
	        datasource.setPassword(password);  
	        datasource.setMaximumPoolSize(maxPoolSize);
	        datasource.setMaxLifetime(maxLifetimeMs);
        } catch (Exception e) {
            logger.error("druid configuration initialization filter {}", e);
        }  
        return datasource;  
    }


}

