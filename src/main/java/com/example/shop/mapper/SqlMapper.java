package com.example.shop.mapper;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @auther ChenTao
 * @date 2021-02-23 17:52:01
 * @description
 */
@Repository
public interface SqlMapper {

    List<Map<String, String>> selectEnumData(@Param("sql") String sql);

}
