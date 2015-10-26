<%@page import="java.awt.geom.CubicCurve2D"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"  pageEncoding="ISO-8859-1" import="java.util.*"%>
<%@ page import="java.sql.*, javax.sql.*, java.io.*, javax.naming.*" %>
<%
Connection con = null;
String dbName = null;
String uName = null;
String pWord = null;

if(request.getParameter("dbName")!=""){
dbName = request.getParameter("dbName");
}
if(request.getParameter("userid")!=""){
	uName = request.getParameter("userid ");
}

if(request.getParameter("pswrd")!=""){
	pWord = request.getParameter("pswrd");
}



try{
	

	
	Class.forName("com.mysql.jdbc.Driver").newInstance();

	con= DriverManager.getConnection("jdbc:mysql://localhost:3306/"+dbName,uName,pWord);
	//System.out.println(con);
	request.getSession().setAttribute("userid", uName);
	request.getSession().setAttribute("pwd", pWord);
	request.getSession().setAttribute("dbname", dbName);
	String redirectURL = "Home.jsp"; 
	response.sendRedirect("Home.html"); 
}
catch(Exception e)
{
	response.sendRedirect("Failed.jsp");

}

%>

