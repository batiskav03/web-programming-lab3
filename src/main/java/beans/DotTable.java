package beans;

import com.example.servlets.Dot;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class DotTable implements Serializable {
    private List<Dot> list = new ArrayList<>();

    public String getList() {
        return this.toString();
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
    }

}
