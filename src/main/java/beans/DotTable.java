package beans;

import com.example.servlets.Dot;
import jakarta.annotation.ManagedBean;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@Named
@SessionScoped
public class DotTable implements Serializable {
    private List<Dot> list = new ArrayList<>();
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
    }

}
