package com.example.demo;


import java.util.Date;

public class Dot {
    private final double x,y;
    private final Date date = new Date();
    private final String result;

    public Dot(double x, double y, String result) {
        this.x = x;
        this.y = y;
        this.result = result;
    }

    @Override
    public String toString() {
        return "<tr>" +
                "<td>" + x + "</td>" +
                "<td>" + y + "</td>" +
                "<td>" + date + "</td>" +
                "<td>" + result + "</td>" +
                "</tr>";
    }
}
