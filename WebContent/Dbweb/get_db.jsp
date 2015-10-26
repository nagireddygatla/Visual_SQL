<%@page import="java.awt.geom.CubicCurve2D"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"  pageEncoding="ISO-8859-1" import="java.util.*"%>
<%@ page import="java.sql.*, javax.sql.*, java.io.*, javax.naming.*" %>
<%

Connection con = null;
try{
	
	String dbName = (String)request.getSession().getAttribute("dbname");
	String uName = (String)request.getSession().getAttribute("userid");
	String pWord = (String)request.getSession().getAttribute("pwd");
	//System.out.println(dbName);
	//System.out.println(uName);
	//System.out.println(pWord);
	
	Class.forName("com.mysql.jdbc.Driver").newInstance();
	con= DriverManager.getConnection("jdbc:mysql://localhost:3306/"+dbName, uName,pWord);
//con= DriverManager.getConnection("jdbc:mysql://tinman.cs.gsu.edu:3306/companyDB", "ngatla1", "1db23");
//con= DriverManager.getConnection("jdbc:mysql://tinman.cs.gsu.edu:3306/companydb", "ngatla1", "1db23");
	
	
	
}
catch(Exception e)
{

System.out.print(e);
e.printStackTrace();

}
ResultSet rs = null;

try

{
DatabaseMetaData md = con.getMetaData();
rs = md.getTables(null, null, "%", null);

%>
  <select id = "drops">
  <option>Select Tables</option>
<% 
while (rs.next()) {
  String dropVals = rs.getString(3);
  %>
  <option><%=dropVals%></option>
  <% 
  
}
%>
</select>
<% 
}
catch (SQLException e) {
    e.printStackTrace();
}
%>
<%
		 rs.close();
		 con.close();
		%>