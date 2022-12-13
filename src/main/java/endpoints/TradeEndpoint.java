package endpoints;


import com.example.servlets.DataBaseController;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;

import jakarta.websocket.server.ServerEndpoint;

import java.io.IOException;


@ServerEndpoint("/trade")
public class TradeEndpoint {

    private DataBaseController db;
    private Session session;
    private int countEntries;

    @OnOpen
    public void onOpen(Session session) {
        this.session = session;
        this.countEntries = 1;
        this.db = new DataBaseController();
        System.out.println("new User");
    }


    @OnMessage
    public void doMessage(String msg) throws IOException {

        String[] arr = msg.split(";");
        int leftLimit = Integer.parseInt(arr[0]);
        int rightLimit = Integer.parseInt(arr[1]);
        countEntries++;

        session.getBasicRemote().sendText(db.getDots(countEntries,leftLimit,rightLimit));
    }

}
