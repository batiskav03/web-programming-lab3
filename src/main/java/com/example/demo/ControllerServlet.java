package com.example.demo;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet(name="ControllerServlet",value="/check-servlet")
public class ControllerServlet extends HttpServlet {


    public void init() {

    }

    public void destroy() {
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String requestType = request.getParameter("request_type");
        response.setContentType("text/html");

        ServletContext context = getServletContext();
        RequestDispatcher dispatcher;


        switch (requestType) {
            case "":


            case "get_from_DB":
            case "write_into_DB":
                dispatcher = context.getRequestDispatcher("/area-servlet");
                dispatcher.forward(request, response);
                break;
            default:
                break;
        }


    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
