package com.example.demo;


import java.io.*;
import java.util.ArrayList;
import java.util.List;

import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet(name = "AreaServlet", value = "/area-servlet")
public class AreaServlet extends HttpServlet {
    @Override
    public void init() {}

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        double x = Double.parseDouble(request.getParameter("x_absolute"));
        double y = Double.parseDouble(request.getParameter("y_absolute"));
        HttpSession session = request.getSession();

        List<String> rows = (List) session.getAttribute("rows");

        if (rows == null) {
            rows = new ArrayList<>();
            session.setAttribute("rows", rows);
            rows.add("<table id='output-table'></table>\n" +
                    "            <tr>\n" +
                    "                <th>x</th>\n" +
                    "                <th>y</th>\n" +
                    "                <th>Дата</th>\n" +
                    "                <th>Статус</th>\n" +
                    "            </tr>\"");
        }

        rows.add(new Dot(x,y,validate(x,y)).toString());

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        for (String row: rows) {
            out.println(row);
        }
    }

    @Override
    public void destroy() {
    }

    public String validate(double x,double y) {
        if (y <= (Math.sin(x/120)*20 + 600) && y >= (Math.sin(x/100)*50 + 200)) return "Входит в область определения";
        else return "Не входит в область определения";
    }

}




















