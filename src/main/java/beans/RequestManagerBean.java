package beans;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;

import java.io.Serializable;
import java.util.List;

@Named("requestBean")
@RequestScoped
public class RequestManagerBean implements Serializable {

    private int x;
    private int y;
    @Inject
    private DotTable dotTable;

    public RequestManagerBean() {}



    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }
    public void setX(int x) {
        this.x = x;
    }
    public void setY(int y){
        this.y = y;
    }
    public List<Dot> getDotTable() {

        return dotTable.getList();
    }
    public List<Dot> getDotTableRequest() {
        dotTable.addDot(new Dot(x,y,validate(x,y)));
        return dotTable.getList();
    }

    public String validate(int x,int y) {
        if (y <= (Math.sin(x/120)*20 + 600) && y >= (Math.sin(x/100)*50 + 200)) return "Входит в область определения";
        else return "Не входит в область определения";
    }




}
