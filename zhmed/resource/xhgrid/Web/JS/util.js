var active_tab_li,
	textAreaMaxHeight = 600;

// 
var demoEvent = function(role, target, type, handler) {
	var event;

	if (role == "add") {
		event = "addEventListener";
		if (!window[event]) {
			event = "attachEvent";
			type = "on" + type;
		}
	} else {
		event = "removeEventListener";
		if (!window[event]) {
			event = "detachEvent";
			type = "on" + type;
		}
	}
	if (window[event])
		target[event](type, handler);
};

// 
function sourceValue() {
	var a = document.getElementsByTagName("script");
	var b;
	for (var i = 0, n = a.length; i < n; i++) {
		b = a[i];
		if (b.nodeType === 1 && b.nodeName.toLowerCase() === "script" && b.text !== "") {
			var c = document.createElement("div");
			c.style.zIndex = 2;
			c.style.position = "absolute";
			c.style.background = "#FFF";
			c.style.border = "1px solid #aaaaaa";
			c.style.left = (document.body.offsetWidth - 600) * 0.5 + "px";
			c.style.top = "80px";
			c.style.width = "600px";
			c.style.height = "420px";
			c.style.font = "11px 'Arial'";
			var d = document.createElement("div");
			var e = document.createElement("button");
			e.style.position = "absolute";
			e.style.font = "11px 'Arial'";
			e.style.top = "0px";
			e.style.width = "60px";
			e.style.right = "0px";
			e.onclick = function() {
				document.body.removeChild(c);
				c.removeChild(e);
				c.removeChild(d);
				c = null;
				d = null;
				e = null;
			};
			e.innerHTML = "Close";
			d.style.position = "relative";
			d.style.overflow = "scroll";
			d.style.top = "24px";
			d.style.left = "0px";
			d.style.width = "600px";
			d.style.height = "396px";
			d.innerHTML = "<pre id='preview' style='max-width: 100%; *width:800px; height: 600px; border: 1px solid black; overflow: scroll; -ms-overflow-x: scroll; overflow-x: scroll; font-family: monospace; tab-size: 3; -moz-tab-size: 3; -o-tab-size: 3; -webkit-tab-size: 3;'>" + b.text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(/\n/g, "<br>") + "</pre>";
			var sValue = "<pre id='preview' style='max-width: 100%; *width:800px; height: 600px; border: 1px solid black; overflow: scroll; -ms-overflow-x: scroll; overflow-x: scroll; font-family: monospace; tab-size: 3; -moz-tab-size: 3; -o-tab-size: 3; -webkit-tab-size: 3;'>" + b.text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(/\n/g, "<br>") + "</pre>";
			var sv;
			// SyntaxHighLighter에서
			if (d.innerText) {
				sv = b.text;//d.innerText;
			} else if (d.innerText == undefined && d.textContent) {
				sv = b.text;// d.textContent;
			}
			var strArray = sv.split('//----------------------- The end of configuration -----------------------');
			strArray[0] += '//----------------------- The end of configuration -----------------------';
			return strArray[0];
		}
	}
};

// 
function frameloadHandler(){
	var src = window.location.href,
		url,str,i,n,gridDataStr, source;

	//
	n = checkUrl(src);

	url = src;
	str = url.split("/");
	for (i = 0; i < str.length; i++) {
		if (str[i].indexOf(".html") > 0) {
			url = str[i];
		}
	}
	url = url.split(".")[0];

	//
	if (window.layoutStr) {
		layoutTabStr = inputTab(layoutStr);
	}
	if (window.gridData) {
		if (url.indexOf("Big_Data") >= 0) {
			gridDataStr = "It cannot be represented because the data size is too large.";
		} else if (url == "Column_Sorting_XML" || url == "Span_Data" || url == "Data_Paging" || url == "Excel_Export_Async" || url == "XML_String" || url == "ItemFieldAt") {
			gridDataStr = inputTab(gridData);
		} else if (url == "JSON_String" || url == "CSV_String" || url == "TSV_String" || url == "Set_Data_String") {
			gridDataStr = gridData;
		} else
			gridDataStr = objectToString(gridData);
	}
	// 
	source = sourceValue(); //objectToString(iframe.contentWindow.source);

	//n
	//1 = Layout
	//2 = gridData
	//3 = both
	if (n == 1) {
		layoutTabStr = "You can check it in the function, setLayoutURLEx(), from the HTML Source tab.";
	} else if (n == 2) {
		gridDataStr = "You can check it in the function, setDataURLEx(), from the HTML Source tab.";
	} else if (n == 3) {
		layoutTabStr = "You can check it in the function, setDataURLEx(), from the HTML Source tab.";
		gridDataStr = "You can check it in the function, setDataURLEx(), from the HTML Source tab.";
	} else if (n == 4) {
	}
	if (!layoutTabStr)
		layoutTabStr = "";
	if (!gridDataStr)
		gridDataStr = "";

	addElementEvent();
	textAreaSetValue(layoutTabStr, gridDataStr ,n, source);
}

//
function checkUrl(src){
	//
	var url = src,
		str = url.split("/");
	for (i = 0; i < str.length; i++) {
		if (str[i].indexOf(".html") > 0) {
			url = str[i];
		}
	}
	url = url.split(".")[0];

	var n = 0;
	//Layout Disable
	if (url =="Embeding_URL_Array" ||
		url =="Layout_URL") {
		n = 1;
	}	//Data Disable
	else if (url == "Excel_Export" ||
		url == "Excel_Export_TitleFooter" ||
		url == "Excel_Export_Columns" ||
		url == "Excel_Export_Async" ||
		url == "Excel_Export_Upload" ||
		url == "Excel_Export_Async_Progress" ||
		url == "Summary_MergeField" ||
		url == "Summary_All_Total" ||
		url == "TwoGrid_Create" ||
		url == "TwoGrid_Control" ||
		url == "Set_Data_URL" ||
		url == "Data_Paging" ||
		url == "XML_URL" ||
		url == "XML_URL_Data" ||
		url == "JSON_URL" ||
		url == "JSON_URL_Data" ||
		url == "JavaScript_XMLParser" ||
		url == "Editing_Javascript_XML" ||
		url == "Hierarchy_XML_Data" ||
		url == "Big_Data"||
		url == "CSV_Big_Data"||
		url == "Sample_Data_BigData_LiveScrolling"||
		url == "Locale" ||
		url == "Many_Columns" ||
		url == "Sample_Inquiry_ExcelExport_HiddenGrid") {
		n = 2;
	}	//Layout & Data Disable
	else if (url == "Embeding_URL_URL"||
		url == "LazyLoading" ||
		url == "LazyLoading_XML") {
		n = 3;
	}	// 
	else if (url == "Span_Data" ||
		url == "Column_Sorting_XML" ||
		url == "XML_String") {
		n = 4;
	}	// 
	else if (url == "Span_Function" ||
			url =="Span_RowAttr" ||
			url =="Span_CellAttr") {
		n = 5;
	}
	return n;
}

// 
function textAreaSetValue(layout, data, n, source) {
	var tlayout = _$("updaterTareaLayout"),
		tdata = _$("updaterTareaData"),
		tsource = _$("updaterTareaSource"),
		tadiv = _$("updaterTarea"),
		updiv = _$("updater"),
		layoutHeight,
		dataHeight,
		sourceHeight,
		tabHeight;

	//
	tlayout.style.display = "block";
	tdata.style.display = "block";
	tsource.style.display = "block";
	tlayout.style.height = "0px";
	tdata.style.height = "0px";
	tsource.style.height = "0px";

	// 
	tlayout.value = layout;
	// 
	tdata.value = data;
	// 
	if (tsource.nodeName == "DIV") {
		//var oldSource = document.getElementById("updaterTareaSource");
		//var oldParent  = document.getElementById("updaterTarea");
		tsource.parentNode.removeChild(tsource);
		//oldParent.removeChild(tsource);
		var newSource = document.createElement("pre");
		tadiv.appendChild(newSource);
		//newSource.style.height = "0px";
		newSource.style.display = "block";
		newSource.id = "updaterTareaSource";
		newSource.name = "updaterTareaSource";
		newSource.className = "brush:js toolbar:false";
		newSource.innerText = source;
		newSource.textContent = source;
		//
		sourceHeight = newSource.scrollHeight;
		newSource.style.display = "none";
	} else {
		tsource.innerText = source;
		tsource.textContent = source;
		//
		sourceHeight = tsource.scrollHeight;
	}

	//
	layoutHeight = tlayout.scrollHeight;
	dataHeight = tdata.scrollHeight;

	//
	//tlayout.style.overflow = "auto";
	//tdata.style.overflow = "auto";

	//
	if (layoutHeight > textAreaMaxHeight) {
		layoutHeight = textAreaMaxHeight;
	}

	if (dataHeight > textAreaMaxHeight) {
		dataHeight = textAreaMaxHeight;
	}

	if (sourceHeight > textAreaMaxHeight) {
		sourceHeight = textAreaMaxHeight;
	}

	//
	if (active_tab_li.id =="updaterTabUlLayout") {
		tdata.style.display = "none";
		tsource.style.display = "none";
		tabHeight = layoutHeight;
	} else if (active_tab_li.id =="updaterTabUlData") {
		tlayout.style.display = "none";
		tsource.style.display = "none";
		tabHeight = dataHeight;
	} else if (active_tab_li.id =="updaterTabUlSource") {
		tlayout.style.display = "none";
		tdata.style.display = "none";

		// 
		SyntaxHighlighter.config.bloggerMode = true;
		SyntaxHighlighter.highlight();
		SyntaxHighlighter.all();

		tabHeight = "600px"; //sourceHeight;
	}

	//
	activeUpdateBtn(n);

	// 
	tlayout.style.height = layoutHeight + "px";
	// 
	tdata.style.height = dataHeight + "px";
	// 
	tsource.style.height = sourceHeight + "px";

	//
	tadiv.style.height = tabHeight + 34 +"px";
	//
	updiv.style.height = tabHeight + 71 + "px";
}

// 
function inputTab(layout) {
	var i, n,
		str,
		retStr = "",
		tabCount = 0,
		strArr = layout.split("<");

	for (i = 0, n = strArr.length; i < n; i++) {
		str = strArr[i];

		if (str === "")
			continue;

		// 
		str = "<" + str;
		str = str.replace(/^\s+|\s+$/g, '');

		// 
		if (str.indexOf("<!--") === 0) {
			retStr += (str + "\n");
			continue;
		}

		// 
		if (str.indexOf("</") > -1)
			tabCount--;

		// 
		retStr += (addTabTag(tabCount) + str + "\n");

		// 
		if (str.indexOf("/>") < 0 && str.indexOf("</") < 0)
			tabCount++;
	}
	return retStr;
}

//
function activeUpdateBtn(n) {
	var updateBtn = _$("btn_update"),
		tdata = _$("updaterTareaData"),
		tsource = _$("updaterTareaSource"),
		tlayout = _$("updaterTareaLayout");

	tlayout.readOnly = false;
	tdata.readOnly = false;
	updateBtn.style.display = "block";
	if (active_tab_li.id === "updaterTabUlLayout" && (n == 1 || n == 3 || n == 5)) {
		updateBtn.style.display = "none";
		tlayout.readOnly = true;
	}

	if (active_tab_li.id === "updaterTabUlData" && (n == 2 || n == 3 || n == 4) || n == 5){
		updateBtn.style.display = "none";
		tdata.readOnly = true;
	}

	if (active_tab_li.id === "updaterTabUlSource") {
		updateBtn.style.display = "none";
		tsource.readOnly = true;
	}
}

// 
function addTabTag(count){
	var tabStr = "";
	for (var i = 0, n = count; i < n; i++)
		tabStr += "    ";
	return tabStr;
}

// 
function objectToString(obj) {
	var data,
		retStr = "";
	for (var i = 0, n = obj.length; i < n; i++) {
		data = obj[i];
		retStr += "{";
		for (var o in data) {
			retStr += "\"" + o + "\":";
			if (typeof data[o] === "string")
				retStr += "\"" + data[o] + "\"";
			else
				retStr += data[o];
			retStr += ", ";
		}
		retStr = retStr.substring(0, retStr.length - 2) + "}";
		if (i != obj.length - 1)
			retStr += ",\n";
	}
	return retStr;
}

// 
function stringToObject(str) {
	var o,
		item,
		strArr,
		data = [];

	str = (str + ",").replace(/{|"|\r|\n/g,"");
	strArr = str.split("},");
	for (var i = 0, n = strArr.length; i < n; i++) {
		str = strArr[i];
		if (str == "")
			continue;
		str = str.split(", ");
		o = {};
		for (var j = 0, m = str.length; j < m; j++) {
			item = str[j].split(":");
			if (item.length > 2) {
				var headItem = item[0]+":";
				var bodyStr = str[j].replace(headItem, "");
				o[item[0]] = bodyStr;
			} else {
				o[item[0]] = item[1];
			}
		}
		data.push(o);
	}
	return data;
}


// 
function changeCss(target, className) {
	var i, n,
		j, m,
		cssText,
		rules;

	// 
	cssText = _forLocalChromeCss[className.substring(1, className.length)];

	if (cssText.indexOf("{") > -1)
		cssText = cssText.substring(cssText.indexOf("{") + 1, cssText.indexOf("}"));
	cssText = cssText.split(";");

	for (i = 0, n = cssText.length; i < n; i++) {
		if (cssText[i] == "" || cssText[i] == " ")
			continue;
		rules = cssText[i].split(":");
		target.style[removeHyphen(rules[0])] = rules[1];//.substring(1, rules[1].length);
	}
}

//
function removeHyphen(str) {
	var i, n, retStr = "";
	str = str.toLowerCase();
	str = str.replace(/\"| /g,"");
	str = str.split("-");
	retStr = str[0];
	for (i = 1, n = str.length; i < n; i++) {
		retStr += str[i].substring(0, 1).toUpperCase() + str[i].substring(1, str[i].length);
	}
	return retStr;
}

function addElementEvent() {
	var i,e,
		layout = _$("updaterTabUlLayout"),
		data = _$("updaterTabUlData"),
		source = _$("updaterTabUlSource"),
		home = _$("home"),
		tsource = _$("updaterTareaSource"),
		tdata = _$("updaterTareaData"),
		tlayout = _$("updaterTareaLayout"),
		update = _$("btn_update"),
		type_title = _$("type_title"),
		prop_title = _$("prop_title");

	// 
	set(_$("updaterTareaData"), "display", "none");
	// 
	set(_$("updaterTareaSource"), "display", "none");

	// 
	changeCss(layout, ".active_li");
	// 
	active_tab_li = layout;

	demoEvent("add", layout, "click", tabClickHandler);
	demoEvent("add", data, "click", tabClickHandler);
	demoEvent("add", source, "click", tabClickHandler);
	demoEvent("add", update, "click",updateClickHandler);

	// 
	demoEvent("add", tlayout, "keydown", textAreaKeyHandler);
	demoEvent("add", tlayout, "keyup", textAreaKeyHandler);
	
	// 
	demoEvent("add", tdata, "keydown", textAreaKeyHandler);
	demoEvent("add", tdata, "keyup", textAreaKeyHandler);
}

// layout, data tab click handler
function tabClickHandler(e) {
	var datadisplay = "none",
		layoutdisplay = "none",
		sourcedisplay = "none",
		tsource = _$("updaterTareaSource"),
		tdata = _$("updaterTareaData"),
		tlayout = _$("updaterTareaLayout"),
		tadiv = _$("updaterTarea"),
		updiv = _$("updater"),
		tsyn = _$("syntax"),
		toutput = _$("output"),
		target = e.target || e.srcElement,
		tabHeight,n;

	n = checkUrl(window.location.href);
	if (active_tab_li === target)
		return;

	changeCss(target, ".active_li");
	changeCss(active_tab_li, ".non_active_li");

	//
	if (_$("updaterTabUlLayout") === target) {
		layoutdisplay = "block";
		set(tsource, "display", "none");
		tabHeight = tlayout.style.height;

	} else if (_$("updaterTabUlData") === target) {
		datadisplay = "block";
		set(tsource, "display", "none");
		tabHeight = tdata.style.height;
	} else {
		sourcedisplay = "block";
		//set(tsyn, "overflow-x", "scroll");
/*		set(toutput, "height", "600px");
		set(tsyn, "display", "block");
		set(tsyn, "height", "600px");
		set(tsyn, "white-space"," pre-wrap");       // CSS 3
		set(tsyn, "white-space", "-moz-pre-wrap");  // Mozilla, since 1999
		set(tsyn, "white-space", "-pre-wrap");      // Opera 4-6
		set(tsyn, "white-space", "-o-pre-wrap");    // Opera 7
		set(tsyn, "word-wrap", "break-word");
*/
		SyntaxHighlighter.config.bloggerMode = true;
		SyntaxHighlighter.highlight();
		SyntaxHighlighter.all();
		//highlight();
		if (tsource.nodeName === "DIV" || tsource.nodeName === "PRE") {
			set(tsource, "height", "600px");
		}
		tabHeight = tsource.style.height;
	}

	tabHeight = Number(tabHeight.replace(/px/, ''));
	//
	tadiv.style.height = tabHeight + 34 +"px";
	//
	updiv.style.height = tabHeight + 34 + 37 + "px";
	set(tlayout, "display", layoutdisplay);
	set(tdata, "display", datadisplay);
	set(tsource, "display", sourcedisplay);

	active_tab_li = target;
	//
	activeUpdateBtn(n);

	SyntaxHighlighter.all();

	if (tsource.nodeName === "DIV" || tsource.nodeName === "PRE") {
		set(tsource, "height", "600px");
	}
}

//updateButtonClick Handler
function updateClickHandler(e){
	window.scroll(0, 0);
	var tlayout = _$("updaterTareaLayout"),
		tdata = _$("updaterTareaData"),
		tsource = _$("updaterTareaSource"),
		grid = document.getElementById("grid1");
	if (tarea_layout_dirty && tarea_data_dirty) {
		grid.setLayout(tlayout.value);
		if (window.convertToHierarchy)
			grid.setData(convertToHierarchy("Level", "children", stringToObject(tdata.value)));
		else
			grid.setData(stringToObject(tdata.value));
	} else if (active_tab_li.id =="updaterTabUlLayout") {
		grid.setLayout(tlayout.value);
	} else {
		if (window.convertToHierarchy)
			grid.setData(convertToHierarchy("Level", "children", stringToObject(tdata.value)));
		else
			grid.setData(stringToObject(tdata.value));
	}
	//초기화
	tarea_layout_dirty = tarea_data_dirty = false;

}

var tarea_layout_dirty = false,
	tarea_data_dirty = false;


// 
function textAreaKeyHandler(event){
	var tarea = event.target || event.srcElement,
		keyCode = event.keyCode,
		tareaHeight = 0,
		tadiv = _$("updaterTarea"),
		updiv = _$("updater"),
		resize = false,
		headText,
		tailText,
		space = "    ",
		sindex;

	switch(event.type){
		case "keydown":
			if (keyCode == 9) {
				if (!tarea.selectionStart)
					alert("The TAB key is not supported in IE 7, 8.");
				sindex = tarea.selectionStart;
				headText = tarea.value.substring(0, sindex);
				tailText = tarea.value.substring(sindex, tarea.value.length);
				tarea.value = headText + space + tailText;
				tarea.selectionStart = tarea.selectionEnd = sindex + space.length;
				if (event.preventDefault)
					event.preventDefault();
			} else if (keyCode == 13 || keyCode == 46 || keyCode == 8)
				resize = true;
			break;
		case "keyup":
			if (keyCode == 8)
				resize = true;
			break;
		default:
			break;
	}

	// 
	if (resize) {
		tarea.style.height = "1px";
		tareaHeight = tarea.scrollHeight;
		if (keyCode == 13)
			tareaHeight += 16;
		if (tareaHeight > textAreaMaxHeight){
			tareaHeight = textAreaMaxHeight;
		}
		tarea.style.height = tareaHeight + "px";
		//
		tadiv.style.height = tareaHeight + 34 +"px";
		//
		updiv.style.height = tareaHeight + 34 + 37 + "px";
	}

	//if(keyCode == 13 || keyCode == 46 || keyCode == 8)
	//	window.scroll(0, tarea.scrollHeight);

	if (tarea === _$("updaterTareaLayout"))
		tarea_layout_dirty = true;
	else if (tarea === _$("updaterTareaData"))
		tarea_data_dirty = true;

	if (keyCode == 9)
		return false;
}

//
function _$(id){
	return document.getElementById(id);
}

function _C(elem) {
	return document.createElement(elem);
}

function set(e, p, v, px){
	e.style[p] = v + (px ? "px" : "");
}

function get(e,p){
	var v = e.style[p];
	if (typeof v === "string" && v.indexOf("px") > 0) {
		v = Number(v.replace(/px/, ''));
	}
	return v;
}

//overview image click handler
function overviewImgClick(e){
	var i,j,tname,turl,item,c,li,
		target = e.target || e.srcElement,
		type = default_types_1,
		premium;

	turl = target.u;

	//
	for (i = 0; i < type.length; i++) {
		tname = type[i].n;
		if (tname === turl) {
			item = type[i];
			break;
		}
	}
	if (!item)
		return;

	// 
	item.imgName = target.childNodes[0].innerHTML;

	item.over = true;
	activeMainLi(item, false);
}

function activeMainLi(item, f){
	for (var j = 0; j < item.c.length; j++) {
		if (item.c[j].n === item.imgName) {
			window.location.href = "../" + item.c[j].u + ".html";
			return;
		}
	}
	window.location.href = "../" + item.c[0].u + ".html";
}

// 
var _forLocalChromeCss = {
	active_menu : "background-color:#a9cd31;color:#ffffff",
	non_active_menu : "background-color:#a9cd31;color:#454545",
	active_li : "border-bottom:none;background-color:#f7f7f7",
	non_active_li : "border-bottom:solid 1px #e2e2e2;background-color:#ffffff",
	active_main_li : "color:#454545;text-decoration:underline",
	non_active_main_li  : "color:#888888;text-decoration:none",
	active_sub_li : "color:#ffffff;background-color:#888888",
	non_active_sub_li : "color:#888888;background-color:#ffffff",
	active_main_menu_border : "border-right-style:solid;border-right-width:1px;border-right-color:#ebebeb",
	non_main_menu_border : "border-right-style:none",
	sample_name_eng : "font-family:arial;font-size:28px",
	sample_name_han : "font-family:Malgun Gothic;font-size:23px;letter-spacing:-1px",
	active_tutorial_child : "display:block;overflow:hidden;font-family: arial,Malgun Gothic;font-size:12px",
	none_tutorial_child : "height:0px;overflow:hidden;font-family: arial,Malgun Gothic;font-size:12px",
	active_tutorial_div : "border-right:solid 1px #ebebeb",
	non_tutorial_div : "border:none"
}

//
function checkChrome(){
	var u = navigator.userAgent,
		isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	var rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|widget):$/;
	var rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/;
	// Document location
	var ajaxLocation;

	// Document location segments
	var ajaxLocParts;

	// #8138, IE may throw an exception when accessing
	// a field from window.location if document.domain has been set
	try {
		ajaxLocation = location.href;
	} catch( e ) {
		// Use the href attribute of an A element
		// since IE will modify it given document.location
		ajaxLocation = document.createElement( "a" );
		ajaxLocation.href = "";
		ajaxLocation = ajaxLocation.href;
	}

	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

	// 
	var isLocal = rlocalProtocol.test( ajaxLocParts[ 1 ] );

	if (!isSafari && testCSS("WebkitTransform") && isLocal) {
		var d = _$("deemd"),
			alert = _$("deemd_alert"),
			content = _$("deemd_content"),
			title = _$("deemd_title"),
			close = _$("deemd_close"),
			str="";

		str = "If you open this sample from your local disk in the Chrome browser, the grid is not rendered properly.<br>Please read new-user.txt for further information.";
		content.innerHTML = str;
		d.style.display = "block";
		alert.style.display = "block";
		demoEvent("add",close,"click",closeDeemd);
	}
}

function closeDeemd(){
	var d = _$("deemd"),
		alert = _$("deemd_alert"),
		close = _$("deemd_close");

	demoEvent("remove",close,"click",closeDeemd);
	d.style.display = "none";
	alert.style.display = "none";
}

function testCSS(prop){
	return prop in document.documentElement.style;
}

window.onload = function() {
	frameloadHandler();
}