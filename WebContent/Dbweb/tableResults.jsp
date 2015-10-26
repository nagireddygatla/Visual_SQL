<%@page import="java.awt.geom.CubicCurve2D"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"  pageEncoding="ISO-8859-1" import="java.util.*"%>
<%@ page import="java.sql.*, javax.sql.*, java.io.*, javax.naming.*" %>
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



<%

String dispQuery=request.getParameter("query");


%>

<p>Query is:<%= dispQuery%></p>
<table>
	<thead>
		<tr>

<%

Connection con = null;
String dbName = (String)request.getSession().getAttribute("dbname");
String uName = (String)request.getSession().getAttribute("userid");
String pWord = (String)request.getSession().getAttribute("pwd");
//System.out.print(dbName+uName+pWord);
try{

Class.forName("com.mysql.jdbc.Driver");
con= DriverManager.getConnection("jdbc:mysql://localhost:3306/"+dbName+"?zeroDateTimeBehavior=convertToNull",uName,pWord);
//con= DriverManager.getConnection("jdbc:mysql://tinman.cs.gsu.edu:3306/spodila1", "spodila1", "abcde");

}

catch(Exception e){
System.out.print(e);
e.printStackTrace();
}


//Statement st=con.createStatement();
Statement st1=con.createStatement();
//String tableName=request.getParameter("tableName");

//int numColumns=Integer.parseInt(request.getParameter("numColumns"));
int actColmns =Integer.parseInt(request.getParameter("actColmns"));

//String[] colHeaders = request.getParameterValues("colHeaders");
//System.out.println(dispQuery);
ResultSet aResultset1 = st1.executeQuery(dispQuery);

ResultSetMetaData rsmd = aResultset1.getMetaData();
int columnsNumber = rsmd.getColumnCount();
String name = rsmd.getColumnName(1);

//System.out.println(colHeaders[0]);
//ResultSet aResultset2 = st.executeQuery("select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS IC where TABLE_NAME = '"+tableName+"'");
//ResultSet aResultset = st.executeQuery("select * from Employee ='"+employee+"'");
if(actColmns!=0  || dispQuery != null){
for(int i = 1; i<=columnsNumber; i++)
{
	String tabHeader = rsmd.getColumnName(i);
	%>
	<th><%=tabHeader%></th>
	<%
	
}
}
	
%>
</tr>
</thead>
<tbody>

<%
if(actColmns!=0  || dispQuery != null){
while(aResultset1.next()){
	

	%>
	<tr><%
	String tabRows = null;
	for(int col = 1; col <= columnsNumber; col++){
	
		tabRows = aResultset1.getString(col);
		
		%>
		<td><%=tabRows%></td>
		<%	
		
}
}
%>
	</tr>
	<%
}
		 aResultset1.close();
		// aResultset2.close();
		 st1.close();
		 //st.close();
		 con.close();
		%>
		
</tbody>
</table>