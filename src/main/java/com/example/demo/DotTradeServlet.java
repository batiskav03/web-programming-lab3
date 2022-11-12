package com.example.demo;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name="DotTradeServlet",value="/trade-servlet")
public class DotTradeServlet extends HttpServlet {
    private DataBaseController db = new DataBaseController();


    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        int leftLimit = Integer.parseInt(request.getParameter("leftLimit"));
        int rightLimit = Integer.parseInt(request.getParameter("rightLimit"));
        HttpSession session = request.getSession();
        Integer ent = (Integer) session.getAttribute("ent");

        if (ent == null) {
            session.setAttribute("ent",ent);
            ent = 0;

        }
        ent = ent.intValue() + 1;
        session.setAttribute("ent",ent);





        PrintWriter out = response.getWriter();
        out.println(db.getDots(ent,leftLimit,rightLimit));

    }

}
