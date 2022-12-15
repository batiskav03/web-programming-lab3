package beans;

import database.DataBaseController;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@Named
@SessionScoped
public class DotTable implements Serializable {
    private List<Dot> list = new ArrayList<>();
    private DataBaseController db = new DataBaseController();
    public List<Dot> getList() {
        return this.list;
    }

    public void setList(List<Dot> list) {
        this.list = list;
    }

    public String toString() {
        String output = "";
        for (Dot dot : list) {
             output += dot.toString();
        }
        return output;
    }

    public void addDot(Dot dot) {
        this.list.add(0, dot);
        db.insertDot(dot.getX(), dot.getY());
    }

}
