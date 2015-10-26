<%@page import="java.awt.geom.CubicCurve2D"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"  pageEncoding="ISO-8859-1" import="java.util.*"%>
<%@ page import="java.sql.*, javax.sql.*, java.io.*, javax.naming.*" %>
<%

Connection con = null;
String tableId = request.getParameter("tableId");
String tableId1 = tableId + "A";
String tableId2 = tableId + "B";
String tableId3 = tableId + "C";
String tableId4 = tableId + "D";

String dbName = (String)request.getSession().getAttribute("dbname");
String uName = (String)request.getSession().getAttribute("userid");
String pWord = (String)request.getSession().getAttribute("pwd");
try{

Class.forName("com.mysql.jdbc.Driver");
con= DriverManager.getConnection("jdbc:mysql://localhost:3306/"+dbName,uName,pWord);
//con= DriverManager.getConnection("jdbc:mysql://tinman.cs.gsu.edu:3306/companydb", "ngatla1", "1db23");

}
catch(Exception e)
{
System.out.print(e);
e.printStackTrace();

}
ResultSet aResultset = null;
try{
	

	Statement st=con.createStatement();
	String tablename = request.getParameter("tablename");
	//String tableId = request.getParameter("tableId");
	aResultset = st.executeQuery("select COLUMN_NAME, DATA_TYPE from INFORMATION_SCHEMA.COLUMNS IC where TABLE_NAME = '"+tablename+"' and table_schema='companydb'");

	
%>
<style>
table,th,td {
	border: 1px solid black;
	border-collapse: collapse;
}

th,td {
	padding: 5px;
	text-align: left;
}
</style>
<table id=<%=tableId1%>>

<!--  <thead id="head">-->
<tr>
	 <td><%=tablename%></td>	
<%

int i = 0;
while (aResultset.next()) {
  String column_name = aResultset.getString("COLUMN_NAME");

  String datatype = aResultset.getString("DATA_TYPE");
  String tabHeaders = column_name+"("+datatype+")";
  i++;

  %>
  
  <td><%=tabHeaders%></td>
  <% 
}
%>
	</tr>
	<!--</thead>-->
<!--	<tbody id="body">-->
	<tr>
<%
while(i>=0)
{%>
	<td><input type="text" name="tabletext" id="tabletext" value=""/></td>
	<% 
	i--;
}

}
catch (SQLException e) {
    e.printStackTrace();
}
		aResultset.close();
		 con.close();
		%>
		</tr>
		<!--</tbody>-->
</table>
<br/>
<input type="button" id=<%=tableId3%> value="Add Row"  onclick="addRow(this.id);"/>
<input type="button" id=<%=tableId4%> value="Delete Row"  onclick="deleteRow(this.id);"/>
<input type="button" id=<%=tableId2%> value="Delete Table"  onclick="vanish(this.id);"/>

