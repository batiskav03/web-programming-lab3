package beans;


import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;

import java.util.Date;
@Named("dot")
@SessionScoped
public class Dot {
    private double x,y;
    private final Date date = new Date();

    public Date getDate() {
        return date;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    private String result;

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }



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
