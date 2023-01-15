package database;

import com.google.gson.Gson;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


public class DataBaseController {
    private static String PASSWORD;
    private static String USER;
    private static String URL;


    public DataBaseController() {
        PASSWORD = System.getenv("MARIADB_JDBC_PASSWORD");
        USER = System.getenv("MARIADB_JDBC_USER");
        URL = System.getenv("MARIADB_JDBC_URL");
    }


    public ResultSet makeRequest(int count, int leftLimit, int rightLimit) {
        ResultSet result = null;
        final String SQL_COMMAND = "SELECT * FROM public.dots WHERE y <= sin(x/120)*20 + 600 AND y >= sin(x/100)*50 + 200 AND x >= ? AND x <= ? LIMIT 250 OFFSET ?";
        try {
            Connection con = DriverManager.getConnection(URL, USER, PASSWORD);
            PreparedStatement statement = con.prepareStatement(SQL_COMMAND);
            statement.setInt(1, leftLimit);
            statement.setInt(2, rightLimit);
            statement.setInt(3, count * 250);
            result = statement.executeQuery();
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }

    public String getDots(int count, int leftLimit, int rightLimit) {
        ArrayList<int[]> list = new ArrayList<>();
        ResultSet result = makeRequest(count, leftLimit, rightLimit);
        try {
            while (result.next()) {
                int[] xy = {result.getInt("x"), result.getInt("y")};
                list.add(xy);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        String jsonlist = new Gson().toJson(list);

        return jsonlist;
    }

    public void insertDot(double x, double y) {
        final String SQL_COMMAND = "INSERT INTO dots VALUES(?,?)";
        try {
            Connection con = DriverManager.getConnection(URL, USER, PASSWORD);
            PreparedStatement statement = con.prepareStatement(SQL_COMMAND);
            statement.setDouble(1, x);
            statement.setDouble(2, y);
            statement.execute();
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
