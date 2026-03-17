package com.example.demo.controller;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserInfo {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("firstname")
    private String firstName;

    @JsonProperty("lastname")
    private String lastName;

    @JsonProperty("age")
    private String age;

    public UserInfo() {
    }

    public UserInfo(Long id, String firstName, String lastName, String age) {
        this.id=id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age=age;
    }

    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }
}
