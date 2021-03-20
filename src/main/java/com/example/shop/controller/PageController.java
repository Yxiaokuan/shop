package com.example.shop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author yjk
 * @description PageController
 * @date 2021/3/15
 */
@Controller
@RequestMapping("/page")
public class PageController {

    @GetMapping("/index")
    public String index(){
        return  "manager/index";
    }
    @GetMapping("/list")
    public String hello(){
        return  "manager/list";
    }
    @GetMapping("/role")
    public String role(){

        return  "role/list";
    }
    @GetMapping("/site")
    public String site(){

        return  "site/list";
    }
}
