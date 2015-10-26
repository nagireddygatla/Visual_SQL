


var xmlhttp;



function ajaxGeneric(url, func){

	
	if (window.XMLHttpRequest)
		
	{
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
		
	}
	else
	{
		// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
			xmlhttp.onreadystatechange= func;
			xmlhttp.open("GET",url,false);
			xmlhttp.send(null);
		
}

function Tablenames()
	{
	
	//var uName =  document.getElementById("id").value;
	//var pWord=  document.getElementById("pwd").value;
	//var dbName =  document.getElementById("db").value;
	
		//var url_temp1 = "get_db.jsp?time="+new Date().getTime()+"&uName="+uName+"&pWord="+pWord+"&dbName="+dbName;
	var url_temp1 = "get_db.jsp?time="+new Date().getTime();
		
		ajaxGeneric(url_temp1,function()
	{
	
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
{
	
			document.getElementById("Drop_Down").innerHTML=xmlhttp.responseText; 		
  		//document.getElementById(result_display).innerHTML="print_emp.jsp";
}
	});

	}

function getTables()
{
   


//alert(document.getElementByID("Get_Results").style.visibility);

var tablename = document.getElementById("drops").value;

//document.getElementById("tableResults").innerHTML = "";

var tim = 	new Date().getTime();
var id = "A"+tim;

var element = document.createElement('div');
element.id = id;
document.body.appendChild(element);

//document.getElementById("tables").innerHTML='<div id='+id +'></div>';

//alert(document.getElementById("tables").innerHTML);

var url_temp2 = "get_tables.jsp?tablename="+tablename+"&tableId="+id+"&time="+new Date().getTime();


ajaxGeneric(url_temp2,function()
	
{
	
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
{
		if(tablename != "Select Tables"){
		//alert(id);
			document.getElementById(id).innerHTML=xmlhttp.responseText; 	
			document.getElementById("cond").style.visibility = "visible";
			document.getElementById("condBox").style.visibility = "visible";
			document.getElementById("Get_Results").style.visibility = "visible";
		//document.getElementById(result_display).innerHTML="print_emp.jsp";
		}
		else{
			
			alert("Please select a Table from the drop down");
			//document.getElementById(id).innerHTML='<p>No Table is selected!</p>';
		}
		
	

}
	}
);

}


function getResults()
	{
	
	
	var tables = document.getElementsByTagName("table");
	//alert(tables[0]);
	var tblnms = 0;
	var tableName = null;
	var numColumns = 0;
	var totColmns = null;
	var colmnsadd = null;
	var seccolmnsadd = null;
	var numtabs = null;
	var fincolmns = null;
	var eachtbl=0;
	var iter = 0;
	var chck = 0;
	var tbliter = 0;
	var allp_colmns = new Array();
	var allp_iter = 0;
	var condcolfin = null;
	var condcolfin1 = null;
	var exsts = 0;
	var bexsts = 0;
	var tbl1 = null;
	var tbl2 = null;
	var gvncondn = null;
	var conditny = null;
	//var bondit = null;
	var finalwhere = null;
	var tblpre1 = null;
	var prcond = null;
	var prwhrcond = null;
	var finobycond = null;
	var tbloby1 = null;
	var  finobyimp = null;
	var tblgby1 = null;
	var fingbycond = null;
	var fingbyimp = null;
	
	var tblagr1 = null;
	var finagrcond = null;
	var finagrimp = null;
	
	var tbldist1 = null;
	var findistcond = null;
	var findistimp = null;
	
	var tblneg1 = null;
	var finnegcond = null;
	var finnegimp = null;
	
	//var condnss2 = null;
	//var id = tables[0];
	//var numProj = 0;condio
	//var colmns = null;
	//var colmns1 = null;
	//var query = null;
	var url_temp3 = null;
	//var dataType;
	//var colHeaders = new Array();
	//var actColmns = 0;
	
	//get the tables first on which you want to operate
	//finally after this for loop I get tables to be considered in numtabs variables
	var tblList = 0;
	var tabSuffix = 0;
	for(tblList;tblList<tables.length; tblList++)
	
	{
		
		//alert("num of tables:"+tables.length);
		var tblId = tables[tblList];
		var n = tblId.rows.length;
		//alert("num of rows in each tbls:"+n);
		for (var r = 1; r < n; r++)
			{
			
			numColumns = tblId.rows[r].cells.length;
			
			//alert("num of colmns in each row:"+numColumns);
			
			
			//finding table names
			for (var c = 0; c < numColumns; c++)
			{
				tableName = tblId.rows[0].cells[0].innerHTML;
				var txt = tblId.rows[r].cells[c].firstChild.value;
				
				//alert("text in each cell:"+txt);
				var txtcaps = txt.toUpperCase();
				//if(txtcaps == "P." || txtcaps.substring(0,2).indexOf("P.") != -1 || ((txt.substring(0,3).indexOf("P._")!=-1) && (txt.length > 3)))
				
				if(txtcaps == "P." || ((txt.substring(0,3).indexOf("P._")!=-1) && (txt.length > 3)) || ((txt.substring(0,1).indexOf("_")!=-1) && (txt.length >= 2)) || txtcaps == "MIN"
					|| txtcaps == "MAX" || txtcaps == "SUM" || txtcaps == "AVG" || txtcaps == "COUNT" || txtcaps == "UNQ")
				
					{
					tbliter++;
					tabSuffix++;
				
						}
				
				}
			
			// extension code to finding table names
			//alert(tbliter);
			if(tbliter>=1)
				
			{
		//alert("table to be considered:"+tableName);
		tblnms = tblnms+1;
			if(tblnms == 1)
		{
			numtabs = tableName + " as "+tableName+"_"+tabSuffix;
		}
		else
			{
			numtabs =   numtabs + "," + tableName + " as "+tableName+"_"+tabSuffix;
			}
			
			}
			
			//finding if print * condition is met or not
			var prntall = tblId.rows[r].cells[0].firstChild.value;
			//alert("First row text:"+prntall);
			var prntalcaps = prntall.toUpperCase();
			if(prntalcaps.substring(0,2).indexOf("P.") != -1)
			{
				
				eachtbl = eachtbl+1;
				
				//alert("into print all if loop");
				
				}
			
			if(eachtbl >= tables.length){
				totColmns = "*";
			}
		
		
			
		
		//collecting string of columns if first column has P.
	if(prntalcaps.substring(0,2).indexOf("P.") != -1)
		{
		
		if(totColmns!= "*")
		{
		for(var l = 1; l<numColumns; l++){
				
				
					
					//var a = tblId.rows[0].cells[1].innerHTML;
					var b = tblId.rows[0].cells[l].innerHTML;
					//var p = tblId.rows[r].cells[c].firstChild.value;
					//var q = p.toUpperCase();
						iter++;
						if(iter == 1)
						{
				colmnsadd =  tableName+"_"+tabSuffix+"." + b.substring(0,b.indexOf('('));
						}
						else{
				colmnsadd = colmnsadd + "," + tableName+"_"+tabSuffix+"." + b.substring(0,b.indexOf('('));
						}
					
				}
		}
		
		}
	
	
	//printing columns other than print all i.e. first column P.
	if(prntalcaps.substring(0,2).indexOf("P.") == -1){
		
		for(var ql = 1; ql<numColumns; ql++){
			var txtboxs = tblId.rows[r].cells[ql].firstChild.value;
			var cptxt = txtboxs.toUpperCase();
			
			
			
			if((cptxt.substring(0,2).indexOf("P.")!=-1 && cptxt.length == 2) || ((cptxt.substring(0,3).indexOf("P._")!=-1) && (cptxt.length > 3))){
			//var a = tblId.rows[0].cells[1].innerHTML;
				//alert(cptxt.length);
			var actColpain = tblId.rows[0].cells[ql].innerHTML;
			chck++;
			if(chck==1){
				seccolmnsadd = tableName+"_"+tabSuffix+"." + actColpain.substring(0,actColpain.indexOf('('));
				
			}
			else
				{
				
				seccolmnsadd = seccolmnsadd+","+ tableName+"_"+tabSuffix+"." + actColpain.substring(0,actColpain.indexOf('('));
				}
			
			//alert("sec colmns:"+seccolmnsadd);	
			}
	}
	}
	
	
	if(colmnsadd == null){
		fincolmns = seccolmnsadd;
			
		}
	//alert("colmnsadd"+colmnsadd);
	//alert("seccolmnsadd"+seccolmnsadd);
	
	if(seccolmnsadd == null){
		fincolmns = colmnsadd;
	}
	
	if(colmnsadd != null && seccolmnsadd != null){
		
		fincolmns = seccolmnsadd +","+ colmnsadd;
	}
	
	//alert("this is fincolmns:"+fincolmns);
	
	//finding columns for printing and where condition i.e. p._xyz or _xyz
	
	for (var p_col = 1; p_col<numColumns;p_col++){
		var find_P = tblId.rows[r].cells[p_col].firstChild.value;
		//alert("into finding p._xtz:"+find_P);
		var find_pcol = tblId.rows[0].cells[p_col].innerHTML;
		var pol_pcol = find_pcol.substring(0,find_pcol.indexOf('('));
		var p_caps = find_P.toUpperCase();
		//alert("colheader:"+find_pcol);
		//alert("colheader:"+pol_pcol);
	if((p_caps.substring(0,3).indexOf("P._") != -1 && p_caps.length>3) || find_P.substring(0,1).indexOf("_") != -1 && find_P.length>1)
		{
		//alert("into P-loop:"+p_caps);
		////alert(tableName+","+pol_pcol+"."+p_caps);
		//alert(p_caps);
		allp_colmns[allp_iter] = tableName+"_"+tabSuffix+"."+pol_pcol+","+p_caps;	
		allp_iter++;
		
		}
	
	}

			
	//read conditional box and operate
	var condval = null;
	condval = document.getElementById("condBox").value;
	//alert(condval);
	
if(condval != "" )
	{
	var acond = null;
	var bcond = null;
	
	//alert("hi");
	//alert(condval.index('='));
	//alert("conditional value:"+condval);
	if(condval.indexOf('=') != -1){
	 acond = condval.substring(0,condval.indexOf('='));
	 bcond = condval.substring(condval.indexOf('=')+1, condval.length);
	gvncondn = condval.substring(condval.indexOf('='),condval.indexOf('=')+1);
	}
	
	if(condval.indexOf('>') != -1){
		 acond = condval.substring(0,condval.indexOf('>'));
		bcond = condval.substring(condval.indexOf('>')+1, condval.length);
		gvncondn = condval.substring(condval.indexOf('>'),condval.indexOf('>')+1);
		}
	
	if(condval.indexOf('<') != -1){
		acond = condval.substring(0,condval.indexOf('<'));
		bcond = condval.substring(condval.indexOf('<')+1, condval.length);
		gvncondn = condval.substring(condval.indexOf('<'),condval.indexOf('<')+1);
		}
	if(condval.indexOf('>=') != -1){
		 acond = condval.substring(0,condval.indexOf('>='));
		 bcond = condval.substring(condval.indexOf('>=')+2, condval.length);
		gvncondn = condval.substring(condval.indexOf('>='),condval.indexOf('>=')+2);
		}
	if(condval.indexOf('<=') != -1){
		 acond = condval.substring(0,condval.indexOf('<='));
		 bcond = condval.substring(condval.indexOf('<=')+2, condval.length);
		gvncondn = condval.substring(condval.indexOf('<='),condval.indexOf('<=')+2);
		}
	
	if(condval.indexOf('<>') != -1){
		 acond = condval.substring(0,condval.indexOf('<>'));
		 bcond = condval.substring(condval.indexOf('<>')+2, condval.length);
		gvncondn = condval.substring(condval.indexOf('<>'),condval.indexOf('<>')+2);
		}
	
	//alert(gvncondn);
	for(var condit = 1; condit<numColumns;condit++){
		var edhoval = tblId.rows[r].cells[condit].firstChild.value;
		//alert(edhoval);
		if(edhoval == acond){
			//alert(edhoval);
			var condcol = tblId.rows[0].cells[condit].innerHTML;
			tbl1 = tableName+"_"+tabSuffix;
			//alert(tbl1+condcol);
			//var condcolcp = condcol.toUpperCase();
			condcolfin = condcol.substring(0,condcol.indexOf('('));
			exsts++;
		}
		//("this is what it contains:"+condcolfin);
		//alert(exsts);
		
		if(edhoval == bcond){
			alert(edhoval);
			tbl2 = tableName+"_"+tabSuffix;
			var condcol1 = null;
			condcol1 = tblId.rows[0].cells[condit].innerHTML;
			//var condcolcp1 = condcol.toUpperCase();
			condcolfin1 = condcol1.substring(0,condcol1.indexOf('('));
			bexsts++;
		}
	}
	
}//conditional box code loop!!!


//Projection code

var prconiter = 0;

for(var procond = 1; procond<numColumns;procond++){
	var reg = new RegExp('^[0-9]+$');
	var reg1 = new RegExp(/^(?=.)\d*(\.\d{1,9})?$/);
	var condcons = tblId.rows[r].cells[procond].firstChild.value;
	
	//alert(tblId.rows[0].cells[procond].innerHTML+":"+reg1.test(condcons));
	
	if(reg.test(condcons) == true || (condcons.substring(0,1)=="'" &&  condcons.substring(condcons.length-1,condcons.length)=="'") || reg1.test(condcons) == true)
	{
		
		if((condcons.substring(0,2) != "'%" || condcons.substring(condcons.length-2,condcons.length) != "%'")){
	
		//alert("into projection");
		//alert(condcons);
		var prconcol = tblId.rows[0].cells[procond].innerHTML;
		tblpre1 = tableName+"_"+tabSuffix;
		//alert(tbl1+condcol);
		//var condcolcp = condcol.toUpperCase();
		prconfin = prconcol.substring(0,prconcol.indexOf('('));
		prcond = tblpre1 + "." + prconfin + "=" + condcons;
		
		prconiter++;
		if(prconiter==1){
			
			prwhrcond = prcond;
		}
		else
			{
			
			prwhrcond = prwhrcond + " and " + prcond;
			}
	}
	}

}

//alert(prwhrcond);


	//order by asc and desc
		var obyiter = 0;
	
		for(var obycol = 1; obycol<numColumns;obycol++)
			{
				
			var obycond = tblId.rows[r].cells[obycol].firstChild.value;	
			obycond = obycond.toUpperCase();
			if(obycond == "ASC" || obycond == "DESC")
				{
				tbloby1 = tableName+"_"+tabSuffix;
				var obycoval = tblId.rows[0].cells[obycol].innerHTML;
				finobycond = tbloby1 + "." + obycoval.substring(0,obycoval.indexOf('(')) + " " + obycond + " ";
					
					obyiter++;
					if(obyiter == 1){
					
						finobyimp = " ORDER BY " + finobycond;
						
					}
					
					else
						{
						
						finobyimp = finobyimp + "," + finobycond;
						
						}
					
				}
			
			}

	
	//alert(finobyimp);
	
	
		//group by 
		
		var gbyiter = 0;
		
		for(var gbycol = 1;gbycol < numColumns; gbycol++)
			{
			
			
			var gbycond = tblId.rows[r].cells[gbycol].firstChild.value;
			gbycond = gbycond.toUpperCase();
			
			
			if(gbycond == "GBY"){
				
				//alert("into group by");
				tblgby1 = tableName+"_"+tabSuffix;
				//alert(tblgby1);
				var gbycoval = tblId.rows[0].cells[gbycol].innerHTML;
				//alert(gbycoval);
				fingbycond = tblgby1 + "." + gbycoval.substring(0,gbycoval.indexOf('('));
				alert(fingbycond);
					gbyiter++;
					
					if(gbyiter == 1){
						
						fingbyimp = " GROUP BY " + fingbycond;
						
					}
					
					else
						{
						
						fingbyimp = fingbyimp + "," + fingbycond;
						
						}
					
				
			}
			
			}
		
		//alert(fingbyimp);
		
		
		//sum, min, max, count, avg
		
		var aggriter = 0;
		
		for(var agrcol = 1; agrcol < numColumns; agrcol++)
			{
			
			var agrcond = tblId.rows[r].cells[agrcol].firstChild.value;
			agrcond = agrcond.toUpperCase();
			
			
			if(agrcond == "MIN" || agrcond == "MAX" || agrcond == "SUM" || agrcond == "AVG" || agrcond == "COUNT")
			
			{
				
				tblagr1 = tableName+"_"+tabSuffix;
				//alert(tblgby1);
				var agrcoval = tblId.rows[0].cells[agrcol].innerHTML;
				//alert(gbycoval);
				finagrcond = agrcond + "(" +tblagr1 + "." + agrcoval.substring(0,agrcoval.indexOf('(')) + ")";
				alert(finagrcond);
				aggriter++;
				
				if(aggriter == 1){
					
					finagrimp = finagrcond;
				}
				
				else
					{
					finagrimp = finagrimp + "," + finagrcond;
					}
			}
			
			
			
			}
		
		if(finagrimp!=null)
		{
		if(fincolmns != null)
			{
			fincolmns = fincolmns + "," + finagrimp;
			
			}
		else
			{
			
			fincolmns = finagrimp;
			
			}
		}//end of aggregates
		
		
		//alert(finagrimp);
		//alert("these are fin colmns"+fincolmns);
		
		//Get distinct values of a column
		
		var distiter = 0;
		
		for(var distcol = 1; distcol < numColumns; distcol++)
			{
			
			var distcond = tblId.rows[r].cells[distcol].firstChild.value;
			distcond = distcond.toUpperCase();
			//alert(distcond);
			if(distcond == "UNQ")
				{
				
				
				tbldist1 = tableName+"_"+tabSuffix;
				//alert(tblgby1);
				var distcoval = tblId.rows[0].cells[distcol].innerHTML;
				//alert(gbycoval);
				findistcond = tbldist1 + "." + distcoval.substring(0,distcoval.indexOf('('));
			
				distiter++;
				
				if(distiter == 1)
					{
					findistimp = " DISTINCT " + findistcond;
					
					}
				else{
					
					findistimp = findistimp + "," + findistcond;
				}
				
				}
			
			
			}
		
		if(findistimp!=null)
		{
		if(fincolmns != null)
			{
			fincolmns = fincolmns + "," + findistimp;
			
			}
		else
			{
			
			fincolmns = findistimp;
			
			}
		}
		
		//END OF DISTINCT/UNIQUE CODE
	
	//alert(findistimp);
	
	//Negation feature - NOT LIKE
	
	var negiter = 0;
	for(var negcol = 1; negcol < numColumns; negcol++)
		
		{
		var negcond1 = null;
		negcond1 = tblId.rows[r].cells[negcol].firstChild.value;
		negcond1 = negcond1.toUpperCase();
		var negcond2 = null;
		negcond2 = tblId.rows[r].cells[0].firstChild.value;
		//alert(negcond1.substring(0,2).index("'%") != -1 && negcond1.substring(negcond1.length-2,negcond1.length).index("%'")!=-1);
		if(negcond2 == "~" && (negcond1.substring(0,2) == "'%" && negcond1.substring(negcond1.length-2,negcond1.length) == "%'")){
			
			tblneg1 = tableName+"_"+tabSuffix;
			//alert(tblgby1);
			var negcoval = tblId.rows[0].cells[negcol].innerHTML;
			//alert(gbycoval);
			finnegcond = tblneg1 + "." + negcoval.substring(0,negcoval.indexOf('(')) + " NOT LIKE " + negcond1;
			
			negiter++;
			
			if(negiter == 1){
				
				finnegimp = finnegcond;
			}
			else{
				
				finnegimp = finnegimp+ " AND " + finnegcond;
			}
		}
		
		
		}
	//alert("this is the final condn"+finnegimp);
	
		}//rows
		
	}//tblID
	
	//extra code for cond box
	
	if(exsts == 1 && bexsts == 1)
	{
		conditny = tbl1+"."+condcolfin+gvncondn+tbl2+"."+condcolfin1;
		//bondit = tbl1+"."+condcolfin+gvncondn+tbl2+"."+condcolfin1;
		
	}
	//alert(conditny);
	
	
	//extra code for p._x and _x, this code is seperated from table id loop, be careful
	var allp_lop = null;
	var inallp = null;
	var seccoltxt = null;
	var colntext = null;
	var whrcond1 = null;
	var whrcond2 = null;
	var whriter = 0;
	var finwhrcond = null;
	var condnss = null;
	
	var p_colmlengt = allp_colmns.length;
	
	for(var seviter = 0; seviter<p_colmlengt-1; seviter++)
		{
		allp_lop = allp_colmns[seviter];
		//alert("array values"+allp_colmns[seviter]);
		colntext = allp_lop.substring(allp_lop.indexOf(',')+1,allp_lop.length);
		//alert("next"+colntext);
		
		for(var seciter = seviter+1; seciter<p_colmlengt; seciter++){
			
			inallp = allp_colmns[seciter];
			seccoltxt = inallp.substring(inallp.indexOf(',')+1,inallp.length);
			if(colntext == seccoltxt){
				
			whrcond1 = allp_lop.substring(0,allp_lop.indexOf(','));
			whrcond2 = inallp.substring(0,inallp.indexOf(','));
			condnss = whrcond1+ " = " + whrcond2;
			
			//alert("condiion:"+condnss);
			//alert("condition2:"+whrcond2);
			//alert("length:"+whrcond2.length);
			} 
			
		}
		
		whriter++;
		
		if(whriter==1){
			if(condnss != null){
			finwhrcond = condnss;
			//alert("a further:"+finwhrcond);
			}
		}
		else
		{
			if(finwhrcond!=null){
				finwhrcond = finwhrcond + " and " + condnss;
			}
		}
	
}

	if(prwhrcond != null)
		{
		finalwhere = prwhrcond; 
		
		}
	
		if(conditny != null)
			{
			if(finalwhere == null)
				{
			
			finalwhere = conditny;
				}
			else{
				
				finalwhere = finalwhere + " and " + conditny;
			}
			}
	
		if(finwhrcond != null)
			{
			
			if(finalwhere == null)
			{
		
		finalwhere = finwhrcond;
			}
		else{
			
			finalwhere = finalwhere + " and " + finwhrcond;
		}
			
			}
		
		if(finnegimp != null)
				{
			
			if(finalwhere == null)
			{
		
		finalwhere = finnegimp;
			}
		else{
			
			finalwhere = finalwhere + " and " + finnegimp;
		}
				}
		
		
	
	if(finalwhere != null)
		{
		
		finalwhere = " where " + finalwhere;
		}
	else{
		
		finalwhere = "no where condn";
	}
		
		
	//alert(finalwhere);
	
	
	
	if(totColmns != "*"){
		totColmns = fincolmns;
	}
	
	alert("total colmns"+totColmns);
	//alert("where condn:"+finalwhere);
	alert(numtabs);
	query = "select "+totColmns+" from "+numtabs;
	var queryfinl = null;
	if(finalwhere != "no where condn"){
		queryfinl = query + finalwhere; 
	}
	else
		{
		queryfinl = query;
		
		}
	var actColmns = 0;
	if(totColmns!=null){
		
		actColmns = 1;
	}
	
	if(fingbyimp!=null){
		
		queryfinl = queryfinl + fingbyimp;
	}
	
	if(finobyimp != null){
		
		queryfinl = queryfinl + finobyimp;
	}

	
	
	alert("Query:"+queryfinl);
	//url_temp3 =  "tableResults.jsp?query="+queryfinl+"&tableName="+tableName+"&numColumns="+numColumns+"&colHeaders="+colHeaders+"&actColmns="+actColmns+"&time="+new Date().getTime();
	url_temp3 =  encodeURI("tableResults.jsp?query="+queryfinl+"&actColmns="+actColmns+"&time="+new Date().getTime());
	//url_temp3 =  "tableResults.jsp?time="+new Date().getTime()+"&query="+queryfinl;
	//alert(url_temp3);
	var resid = new Date().getTime();
	var element = document.createElement('div');
	element.id = resid;
	document.body.appendChild(element);
	ajaxGeneric(url_temp3,function()
			{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
				
					document.getElementById(resid).innerHTML=xmlhttp.responseText;

		}
			else
			{
				document.getElementById(resid).innerHTML=xmlhttp.responseText = '<p>"Please enter proper inputs in the Table to see results"</p>';
			
			}
			});
	}

//extra code add delete rows and delete table

function vanish(delid){	
	
	var a = delid;
	var b = delid.length;
	var c = a.substring(0,b-1);
	var d = document.getElementById(c);
	var x = d.parentNode;
	x.removeChild(d);
	
	
}

function addRow(buttonid)
{

	
	var btn = buttonid;
	
	var tblngth = buttonid.length;
	
	var tbrefp = btn.substring(0,tblngth-1);
	var tbref = tbrefp + "A";
	var tblisd = document.getElementById(tbref);
	var row = tblisd.insertRow(-1);
	
	var noColumns = tblisd.rows[0].cells.length;
	
	for(var cls = 0; cls< noColumns; cls++){
		
		var cell1 = row.insertCell(cls);
		cell1.innerHTML = '<input type="text" value = "">';
		
		
	}
	
}



function deleteRow(btnid)
{
var delbtn = btnid;
//alert(delbtn);
var delbtnlngth = delbtn.length;



var tbrefpdel = delbtn.substring(0,delbtnlngth-1);
var tbrefdel = tbrefpdel + "A";
var tblisd = document.getElementById(tbrefdel);
var tblrwlngth = tblisd.rows.length;
if(tblrwlngth>2){
	tblisd.deleteRow(tblrwlngth-1);
}
else
	{
	
	alert("Cannot delete row if there is only one row");
	}


}