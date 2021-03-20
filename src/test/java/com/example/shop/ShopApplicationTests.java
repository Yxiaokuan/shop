package com.example.shop;

import com.example.shop.mapper.SqlMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
class ShopApplicationTests {

	@Autowired
	private SqlMapper sqlMapper;
	/*@Resource
	private RedisMessageProduct product;

	@Test
	void contextLoads() {
		product.send();
	}*/

}
