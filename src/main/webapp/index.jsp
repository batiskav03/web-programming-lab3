<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
<table width="100%" >
    <tr>
        <td class="footer" colspan="3" align="center">
            Калабухов Максим Александрович
            <p>P32131</p>
            <p>Вариант 1212 (custom)</p>
        </td>

    </tr>
    <tr>
        <td id="graphicContainer" class="graphContainer">
            <canvas id="graph"></canvas>
            <p>
                <input class="xLeftlimit" type="range" min="0" max="1400" value="300" >
            </p>
            <div>
                <label class="leftLabel">Область прорисовки по X (все что левее - не прорисовываеться):</label>
            </div>
            <p>
                <input class="xRightlimit" type="range" min="0" max="1400" value="600" >
            </p>
            <div>
                <label class="rightLabel">Область прорисовки по X (все что правее - не прорисовываеться):</label>
            </div>
        </td>
        <td>
            <table class="main-table" width="100%">
                <tr>
                    <td width="50%" class="param-table">
                        <div>Выберите координату X:</div>
                        <p>
                            <input type="text" class="xnumber" id="x">
                        </p>
                    </td>
                    <td width="50%" class="param-table">
                        <div>
                            Выберите координату Y:
                            <p>
                                <input type="text" class="ynumber" id="y">
                            </p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" >
                        <input type="button" value="submit" class="submit">
                        <div class="wrong_data"></div>
                    </td>
                </tr>

            </table>
        </td>

    </tr>
    <tr>
        <td colspan="3" height="250">
            <table class="output-table">Последние результаты:</table>
        </td>
    </tr>
</table>
<script src="https://yastatic.net/jquery/3.3.1/jquery.min.js"></script>
<script  src="js/main.js"></script>
</body>
</html>