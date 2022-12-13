package com.example.servlets;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(name="WriteDBServlet", value = "/write_db")
public class WriteDBServlet extends HttpServlet {
    private DataBaseController db;

    @Override
    public void init() {
        db = new DataBaseController();
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        double x = Double.parseDouble(request.getParameter("x_absolute"));
        double y = Double.parseDouble(request.getParameter("y_absolute"));
        db.insertDot(x,y);

    }
}
