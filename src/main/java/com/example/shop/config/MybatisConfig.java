package com.example.shop.config;/*
 *FileName:  MybatisConfig
 * Author:   asus
 * Date  :   2021/3/12 15:09
 * */

import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.TransactionManagementConfigurer;

import javax.sql.DataSource;
import java.io.IOException;

@Configuration
@EnableTransactionManagement
public class MybatisConfig implements TransactionManagementConfigurer {
    @Autowired
    @Qualifier("localdataSource")
    private DataSource localdataSource;

    @Value("${mybatis.typeAliasesPackage}")
    private String typeAliasesPackage;

    @Value("${mybatis.mapperLocations}")
    private String mapperLocations;

    @Value("${mybatis.configLocation}")
    private String configLocation;







    @Bean(name = "sqlSessionFactory")
    @Primary
    public SqlSessionFactory sqlSessionFactory() {
        try {
            SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
            sessionFactoryBean.setDataSource(localdataSource);
            // 读取配置
            sessionFactoryBean.setTypeAliasesPackage(typeAliasesPackage);
            // 设置mapper.xml文件所在位置
            Resource[] resources = new PathMatchingResourcePatternResolver().getResources(mapperLocations);
            sessionFactoryBean.setMapperLocations(resources);
            // 设置mybatis-config.xml配置文件位置
            sessionFactoryBean.setConfigLocation(new DefaultResourceLoader().getResource(configLocation));


            return sessionFactoryBean.getObject();
        } catch (IOException e) {
            System.out.println("mybatis resolver dao*xml is error {}");
            return null;
        } catch (Exception e) {
            System.out.println("mybatis sqlSessionFactoryBean create error {}");
            return null;
        }
    }


    @Bean
    public SqlPrintInterceptor sqlPrintInterceptor() {
        return new SqlPrintInterceptor();
    }

    @Bean("sqlSessionTemplate")
    // 表示这个数据源是默认数据源
    @Primary
    public SqlSessionTemplate sqlSessionTemplate(@Qualifier("sqlSessionFactory") SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }

    // 事务管理

    @Bean
    @Override
    public PlatformTransactionManager annotationDrivenTransactionManager() {
        return new DataSourceTransactionManager(localdataSource);
    }

}
