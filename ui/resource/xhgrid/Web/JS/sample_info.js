// The base directory
var baseurl = "./Samples/",

	// Basic Type
	default_types_1 = [
		{
			"n":"Grid Appearance / Data Setting", "c":[
				{"n":"Layout and Data Settings", "u":"LayoutData"},
				{"n":"Dynamic Layout Setting (URL / String)", "u":"Dynamic_Change"},
				{"n":"Data Setting (String - JSON, XML, CSV, TSV)", "u":"Set_Data_String"},
				{"n":"Data Setting (URL - JSON, XML, CSV, TSV)", "u":"Set_Data_URL"},
				{"n":"Lazy Loading", "u":"LazyLoading"},
				{"n":"Data Control + Field Data Control", "u":"Data_Collection_Control"},
				{"n":"XML Data Control", "u":"JavaScript_XMLParser"}
			]
		},{
			"n":"Control Grid Property", "c":[
				{"n":"Adjust Grid Property", "u":"DataGrid_Properties"},
				{"n":"Adjust Column Property", "u":"DataGridColumn_Properties"},
				{"n":"Add Property with JavaScript Function Call", "u":"Span_Function"},
				{"n":"Customize Header / Cell Tooltips", "u":"DataGrid_DataTipJsFunction"},
				{"n":"Customize Label", "u":"Column_LabelJsFunction"}
			]
		},{
			"n":"Control Grid Style", "c":[
				{"n":"Adjust Grid Style", "u":"DataGrid_Styles"},
				{"n":"Set Style by Style Name", "u":"Style_StyleName"},
				{"n":"Row / Cell Property (Style, Background Color, Lock, Format, Height)", "u":"Span_RowCellAttr"},
				{"n":"Customize Style", "u":"Column_StyleJsFunction"},
				{"n":"Previous Versions (3.1 or below) Style", "u":"SetConfig_Style3"}
			]
		},{
			"n":"Control Grid Event", "c":[
				{"n":"GridRoot Event", "u":"GridRoot_Event"},
				{"n":"DataGrid Event", "u":"DataGrid_Event"},
				{"n":"Other Events", "u":"Event_Etc"}
			]
		},{
			"n":"Grid View Features", "c":[
				{"n":"Column Sorting", "u":"Column_Sorting_JSON"},
				{"n":"Column Move (Lock), Freeze, Hide", "u":"Column_ShiftLockShow"},
				{"n":"Context Menu", "u":"ContextMenu_Create"},
				{"n":"Paging (setDataURLEx)", "u":"Data_Paging"},
				{"n":"Paging (PagingCollection)", "u":"Data_PagingCollection"},
				{"n":"Live Scrolling", "u":"LiveScrolling"},
				{"n":"Number Formatter", "u":"Formatter_NumberFormatter"},
				{"n":"Date Formatter", "u":"Formatter_DateFormatter"},
				{"n":"Percent Formatter", "u":"Formatter_PercentFormatter"},
				{"n":"Mask Formatter", "u":"Formatter_NumberMaskFormatter"},
				{"n":"Currency Formatter", "u":"Formatter_CurrencyFormatter"}
			]
		},{
			"n":"Edit (Input, Update, Delete, Etc.)", "c":[
				{"n":"Edit with JavaScript (XML)", "u":"Editing_Javascript_XML"},
				{"n":"Edit with JavaScript (Object)", "u":"Editing_Javascript_Object"},
				{"n":"Edit with Popup (windows.open)", "u":"Editing_Popup"},
				{"n":"Edit in Grid", "u":"Editing_DataGrid"},
				{"n":"Input Length Limit", "u":"Editing_MaxChars"},
				{"n":"Using Editor", "u":"Editing_Editor"},
				{"n":"Using ComboBox", "u":"Editing_ComboCode"},
				{"n":"Using Dynamic ComboBox", "u":"Editing_Dynamic_ComboCode"},
				{"n":"ComboBox Selection List", "u":"Editing_ItemRendererDataProviderField"},
				{"n":"Using Editable ComboBox", "u":"Editing_ExComboBox"},
				{"n":"Using TextArea", "u":"Editing_TextArea"},
				{"n":"Using Autocomplete TextInput", "u":"Editing_Autocomplete"},
				{"n":"Default CheckBox Value", "u":"Editing_TrueValue_FalseValue"},
				{"n":"Excel Keyboard Mode", "u":"Editing_EditingKeyMode"},
				{"n":"Hierarchical Editing", "u":"Editing_Hierarchy_JSON"},
				{"n":"Undo, Redo", "u":"Editing_UndoRedo_JSON"},
				{"n":"Control Editability", "u":"Editing_ItemEditBeginningJsFunction"},
				{"n":"Check Edit", "u":"Editing_ItemEditEndJsFunction"},
				{"n":"Event on Edit Complete", "u":"Editing_ItemEditCompletet_Event"},
				{"n":"Event on Change", "u":"Editing_ItemDataChanged_Event"},
				{"n":"Edit and Save to Server", "u":"Editing_SubmitToServer"},
				{"n":"Editor Property", "u":"Editing_EditorProperties"},
				{"n":"Control Editor Instance", "u":"Editing_ItemFocusInJsFunction"},
				{"n":"Edit-Error Handling Property", "u":"Editing_EndEditOnBlur"},
				{"n":"Input / Update / Delete Display Column", "u":"Editing_DataGridRowStateColumn"},
				{"n":"Show Editable Icon", "u":"Editing_ShowEditableIcon"}
			]
		},{
			"n":"Renderer (Cell Display Object)", "c":[
				{"n":"HTML + Link + HtmlHeader", "u":"Renderer_Html"},
				{"n":"HTML Display Using Function", "u":"Renderer_Html_LabelJsFunction"},
				{"n":"Image in Column", "u":"Renderer_Image"},
				{"n":"ItemRendererDataProvider", "u":"Renderer_DataProvider"},
				{"n":"Icon Batch / Select Apply", "u":"Renderer_Icon_Column"},
				{"n":"Customize Icon", "u":"Renderer_IconLabelFunction"},
				{"n":"Index No.", "u":"Renderer_IndexNo"},
				{"n":"CheckBoxItem", "u":"Renderer_CheckBox"},
				{"n":"CheckBoxHeader", "u":"Renderer_CheckBoxHeader"},
				{"n":"Editable HTML", "u":"Renderer_HtmlEditable"},
				{"n":"ComboBoxItem / Header", "u":"Renderer_ComboBox"},
				{"n":"TextAreaItem", "u":"Renderer_TextArea"},
				{"n":"SparkLine", "u":"Renderer_SparkLine"},
				{"n":"SparkColumn", "u":"Renderer_SparkColumn"},
				{"n":"SparkWinLoss", "u":"Renderer_SparkWinLoss"}
			]
		},{
			"n":"Excel", "c":[
				{"n":"Excel Import", "u":"Excel_Import"},
				{"n":"Excel Import Option", "u":"Excel_Import_Option"},
				{"n":"Excel Import parseFunction", "u":"Excel_Import_ParseFunction"},
				{"n":"Excel CSV Import", "u":"Excel_CSV_Import"},
				{"n":"Excel Export", "u":"Excel_Export"},
				{"n":"Excel Export with Title, Footer", "u":"Excel_Export_TitleFooter"},
				{"n":"Excel Export with Specific Column", "u":"Excel_Export_Columns"},
				{"n":"Excel Export with Asynchronous Mode", "u":"Excel_Export_Async"},
				{"n":"Excel Export with Prgress Bar", "u":"Excel_Export_Async_Progress"},
				{"n":"Excel Export Upload", "u":"Excel_Export_Upload"},
				{"n":"Excel Export CSV", "u":"Excel_Export_Csv"},
				{"n":"Excel Multi Export", "u":"Excel_Export_Multi"}
			]
		},{
			"n":"Selection Control", "c":[
				{"n":"Single Line / Multiple Lines / Single Cell / Multiple Cells", "u":"Select_SingleMultiRowCell"},
				{"n":"Select Row / Cell with Mouse", "u":"DragSelectable_MultiCellsRows"},
				{"n":"Selection History Copy", "u":"Clipboard_Copy"},
				{"n":"Selection History Paste", "u":"Clipboard_Paste"},
				{"n":"Selection History Paste ParseFunction", "u":"Clipboard_PasteParseFunction"},
				{"n":"Select with CheckBox / Change Radio Button", "u":"Selector_CheckBoxRadioItem"},
				{"n":"Set CheckBox Selection", "u":"Selector_CheckBoxItem_Set"},
				{"n":"Control CheckBox Enabled", "u":"Selector_CheckBoxItem_SecondLabelFunction"},
				{"n":"CheckBox Integration", "u":"Selector_SelectionMode"},
				{"n":"Selector Event", "u":"Selector_ChangeEvent"},
				{"n":"Delete Selected Rows", "u":"Selector_RemoveSelection"}
			]
		},{
			"n":"Hierarchy and Grouping", "c":[
				{"n":"Show Hierarchical XML Data", "u":"Hierarchy_XML_Data"},
				{"n":"Show Hierarchical JSON Data (Include Cell Property)", "u":"SpanHierarchy_JSON_Data"},
				{"n":"Grouping Function (Sum)", "u":"GroupingAndSummary_Data"},
				{"n":"Grouping Function (Include Cell Property)", "u":"SpanGrouping_Data"},
				{"n":"Grouping Panel", "u":"DataGridGroupingPanel"},
				{"n":"Hierarchy using SQL connect by", "u":"Level_To_Hierarchy_JSON_Data"}
			]
		},{
			"n":"Merge and Sum Cells", "c":[
				{"n":"Field Merge / Subtotal / Total", "u":"Summary_Total"},
				{"n":"Change Summary Label", "u":"Summary_LabelJsFunction"},
				{"n":"Control Aggregate Record", "u":"SummaryRow_Control"}
			]
		},{
			"n":"Footer", "c":[
				{"n":"Footer Property", "u":"Footer_Properties"},
				{"n":"Footer labelJsFunction", "u":"Footer_LabelJsFunction"},
				{"n":"Footer Style", "u":"Footer_Styles"}
			]
		},{
			"n":"Filtering and Searching", "c":[
				{"n":"Filtering", "u":"Filtering_Data"},
				{"n":"Column Filtering", "u":"Column_Filterable"},
				{"n":"Column Filter Function", "u":"Column_FilterFunction"},
				{"n":"Search", "u":"Searching_Data"},
				{"n":"Column Search", "u":"Searching_Column_Data"}
			]
		},{
			"n":"Pivot", "c":[
				{"n":"PivotDataGrid", "u":"PivotDataGrid"},
				{"n":"Multi-Dimension Pivot", "u":"PivotDataGrid_MultiDimensions"},
				{"n":"Pivot Query", "u":"PivotDataGrid_Dynamic"}
			]
		},{
			"n":"Other Features", "c":[
				{"n":"Multi-languages Support", "u":"Locale"},
				{"n":"Accessibility", "u":"Accessibility"},
				{"n":"Many Columns", "u":"Many_Columns"},
				{"n":"Message on Grid", "u":"Display_Message"},
				{"n":"Show / Hide Loading Bar", "u":"LoadingBar"},
				{"n":"Show / Hide Progress Bar", "u":"ProgressBar"}
			]
		}
	],

	// default_types_2
	default_types_2 = [
		{
		// Data View Function
			"n":"Data View Function", "c":[
				// n - name
				// u - url
				{"n":"Display Check Information in Footer ", "u":"Sample_Inquiry_CheckInfoInFooter"},
//				{"n":"Excel Export only Selected Data", "u":"0"},
				{"n":"Load Sorted Data in Grid", "u":"Sample_Inquiry_LoadOnSorted"},
				{"n":"Multiple Filtering", "u":"Sample_Inquiry_Multi_Filtering"},
				{"n":"Customize Icon", "u":"Sample_Inquiry_IconJsFunction"},
				{"n":"Star Icon", "u":"Sample_Inquiry_Icon_Star"},
				{"n":"Automatic Grid Height Adjustment", "u":"Sample_Inquiry_AutoHeight"},
//				{"n":"Comparable Output on Two Grids", "u":"0"},
				{"n":"Two Grid Interlocking Filtering", "u":"Sample_Inquiry_SubGrid_Filtering"},
				{"n":"Right-click Menu (Insert Icon, Hide Column, Freeze Row)", "u":"Sample_Inquiry_RightClick_Menu"},
				{"n":"Excel Download as Hidden Grid", "u":"Sample_Inquiry_ExcelExport_HiddenGrid"}
			]
		},{
		// Input/Update/Delete Function
			"n":"Input / Update / Delete Function", "c":[
				{"n":"Edit with Keyboard", "u":"Sample_Editing_Keyboard"},
				{"n":"Editable only New Row", "u":"Sample_Editing_Editable_NewRow"},
				{"n":"Edit with Layer Popup", "u":"Sample_Editing_Layer_PopUp"},
				{"n":"Selective Copy and Delete with CheckBox", "u":"Sample_Editing_CheckBox_AddDeleteRow"},
				{"n":"Bulk Data Change", "u":"Sample_Editing_CheckedValue"},
				{"n":"Move Row Up / Down", "u":"Sample_Editing_Move_Row"},
		//		{"n":"Rollback Rows (Update / Delete Marks)", "u":"Sample_Editing_UnDo_RemovedRow"},
				{"n":"Two Grid Interlocking Edit", "u":"Sample_Editing_Grid_Data_Transfer"}
			]
		},{
		// Data Processing
			"n":"Data Processing", "c":[
				{"n":"Merge Rows and Columns", "u":"Sample_Data_SpanEachColumns"},
				{"n":"Paging after Loading Full Data", "u":"Sample_Data_PaginAfterLoadComplete"},
				{"n":"Filtering in Paging", "u":"Sample_Data_FilteringInPaging"},
				{"n":"SQL connect by", "u":"Sample_Data_SQL_ConnectBy"},
				{"n":"Large Data and Live Scrolling", "u":"Sample_Data_BigData_LiveScrolling"},
				{"n":"Change Summary Row", "u":"SummaryRow_Control_MinMax"}
			]
		},{
		// Using External Module
			"n":"Using External Module", "c":[
				{"n":"jQuery Tab", "u":"Sample_External_jQuery_Tab"},
				{"n":"jQuery Resizable", "u":"Sample_External_jQuery_Resizable"},
				{"n":"jQuery Layer Popup", "u":"Sample_External_jQuery_LayerPopup"}
			]
		}

	],

	// The image path
	images = [{
			"n":"Set CheckBox Selection", "u":"checkbox", "w":"Selection Control"
		},{
			"n":"Set Context Menu", "u":"context", "w":"View Related Features"
		},{
			"n":"Excel Import", "u":"excel", "w":"Excel"
		},{
			"n":"Multi-languages Support", "u":"lang", "w":"Other Features"
		},{
			"n":"그룹 컬럼 생성", "u":"group", "w":"그리드 기본기능"
		},{
			"n":"Using Editor", "u":"date", "w":"Edit (Input, Update, Delete, Etc.)"
		},{
			"n":"SparkLine", "u":"spark", "w":"Renderer (Cell Display Object)"
		},{
			"n":"Show Hierarchical XML Data", "u":"hirarch", "w":"Hierarchy and Grouping"
		},{
			"n":"Input/Update/Delete Display Column", "u":"rowstate", "w":"Edit (Input, Update, Delete, Etc.)"
		},{
			"n":"Icon Batch / Select Apply", "u":"icon", "w":"Renderer (Cell Display Object)"
		},{
			"n":"Field Merge and Field Subtotal and Total", "u":"sumsub", "w":"Merge and Sum Cells"
		},{
			"n":"Footer Styles", "u":"sum", "w":"Footer"
		}
],

tutorialContent = [{
		"index":0,"content":"<pre><font color='#0000ff'>&#60;!DOCTYPE html&#62;<br>&#60;html&#62;<br>&#60;head&#62;<br>&#60;meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /&#62;<br></font></pre>","className":"active_tutorial_child"
	},{
		"index":1,"content":'<pre>'
		+'<font color="#4BBF5A">&#60;!-- KoolGrid css --&#62;</font><br>'
		+'<font color="#0000ff">&#60;link <font color="#ff0000">rel="stylesheet" type="text/css" href="../KoolGrid/Assets/Kool.css"</font>/&#62;<br><br>'
		+'<font color="#4BBF5A">&#60;!-- KoolGrid License --&#62;</font><br>'
		+'<font color="#0000ff">&#60;script <font color="#ff0000">language="javascript" type="text/javascript" src="../LicenseKey/KoolGridLicense.js"</font>&#62;<br>&#60;/script&#62;</font><br><br>'
		+'<font color="#4BBF5A">&#60;!-- KoolGrid Library --&#62;</font><br>'
		+'<font color="#0000ff">&#60;script <font color="#ff0000">language="javascript" type="text/javascript" src="../KoolGrid/JS/KoolGrid.js"</font>&#62;<br>&#60;/script&#62;</font><br><br>'
		+'</pre>'
		,"className":"none_tutorial_child","displayList":true,"displayIndex":0
		,"displayBtn":"Include CSS and JS for Grid Creation.<br>"
	},{
		"index":2,"content":'<pre><font color="#0000ff">&#60;script <font color="#ff0000">type="text/javascript"</font>></font><br>'
		+'<font color="#4BBF5A">// Sets the value of KoolOnLoadCallFunction to the name of a JS function (e.g. gridReadyHandler) that is called when the grid is ready to be created.</font><br>'
		+'<font color="#0000ff">var <font color="#792929">jsVars = "KoolOnLoadCallFunction=gridReadyHandler";</font><br><br>'
		+'<font color="#4BBF5A">// Creates a grid.<br>'
		+'// Parameters:<br>'
		+'//  1. Grid ID: You can use any name you like. <br>'
		+'//  2. DIV ID: The grid will be placed in this DIV<br>'
		+'//  3. jsVars: Variables used for creating the grid<br>'
		+'//  4. Grid width: Default value is 100%<br>'
		+'//  5. Grid height: Default value is 100%</font><br>'
		+'<font color="#792929">KoolGrid.create("grid1", "gridHolder", jsVars, "100%", "100%"); </font><br><br>'
		+'<font color="#0000ff">var <font color="#792929">gridApp, gridRoot, dataGrid, collection;</font><br><br>'
		+'<font color="#4BBF5A">// The function set as KoolOnLoadCallFunction set in jsVars passed when creating the grid.<br>'
		+'// The JavaScript function which is set to the value of KoolOnLoadCallFunction.<br>'
		+'// This function calls two functions, setLayout() and setData(), which are two main functions of KoolGrid.<br>'
		+'// Parameter - ID: The grid ID which is used as the first parameter of KoolChart.create().</font><br>'
		+'function <font color="#792929">gridReadyHandler(id) {<br>'
		+'	gridApp = document.getElementById(id);<br>'
		+'	gridRoot = gridApp.getRoot();<br><br>'
		+'	gridApp.setLayout(layoutStr);<br>'
		+'	gridApp.setData(gridData);<br><br>'
		+'	var layoutCompleteHandler = function(event) {<br>'
		+'		dataGrid = gridRoot.getDataGrid();<br>'
		+'	}<br>'
		+'	var dataCompletedHandler = function(event) {<br>'
		+'		collection = gridRoot.getCollection();<br>'
		+'	}<br><br>'
		+'	// The layoutComplete event is triggered after the grid is created.<br>'
		+'	gridRoot.addEventListener("layoutComplete", layoutCompleteHandler);<br>'
		+'	// The dataComplete event is triggered after the data is set in the grid.<br>'
		+'	gridRoot.addEventListener("dataComplete", dataCompletedHandler);<br>'
		+'}</font></font><br><br>'
		+'</pre>'
		,"className":"none_tutorial_child","displayList":true,"displayIndex":2
		,"displayBtn":"Create a script to generate the grid.<br>"
						+"Please read the annotated section."
	},{
		"index":3,"content":'<pre>'
		+'<font color="#4BBF5A">// The XML-formatted string layout</font><br>'
		+'<font color="#0000ff">var</font> <font color="#792929">layoutStr = &#39;&#60;KoolGrid>&#39;<br>'
		+'			+&#39;&#60;DataGrid  id="dg1" sortableColumns="true" headerHeight="50" rowHeight="30" draggableColumns="true" showHeaders="true" horizontalScrollPolicy="auto" variableRowHeight="false" selectionMode="singleRow" textAlign="center" verticalAlign="middle">&#39;<br>'
		+'				+&#39;&#60;columns>&#39;<br>'
		+'					+&#39;&#60;DataGridColumn id="dg1col1" dataField="Year"/>&#39;<br>'
		+'					+&#39;&#60;DataGridColumn id="dg1col2" dataField="Quarter"/>&#39;<br>'
		+'					+&#39;&#60;DataGridColumn id="dg1col3" dataField="Month"/>&#39;<br>'
		+'					+&#39;&#60;DataGridColumn id="dg1col4" dataField="Seoul" textAlign="right"/>&#39;<br>'
		+'					+&#39;&#60;DataGridColumn id="dg1col5" dataField="Pusan" textAlign="right"/>&#39;<br>'
		+'					+&#39;&#60;DataGridColumn id="dg1col6" dataField="Incheon" textAlign="right"/>&#39;<br>'
		+'					+&#39;&#60;DataGridColumn id="dg1col7" dataField="NewYork" textAlign="right"/>&#39;<br>'
		+'					+&#39;&#60;DataGridColumn id="dg1col8" dataField="LA" textAlign="right"/>&#39;<br>'
		+'				+&#39;&#60;/columns>&#39;<br>'
		+'			+&#39;&#60;/DataGrid>&#39;<br>'
		+'		+&#39;&#60;/KoolGrid>&#39;;</font><br><br>'
		+'</pre>'
		,"className":"none_tutorial_child","displayList":true,"displayIndex":3
		,"displayBtn":"Set the layout of the grid."
	},{
		"index":4,"content":'<pre>'
		+'<font color="#4BBF5A">// The JSON-formatted data<br></font>'
		+'<font color="#0000ff">var</font> <font color="#792929">gridData = [{"Year":2007, "Quarter":"1/4", "Month":1, "Seoul":109520, "Pusan":40454, "Incheon":82477, "NewYork":47424, "LA":103225, "Washington":61161, "Revenue":444260, "Percent":40},<br>'
		+'		{"Year":2007, "Quarter":"1/4", "Month":2, "Seoul":15749, "Pusan":29714, "Incheon":31393, "NewYork":45006, "LA":17945, "Washington":90148, "Revenue":229956, "Percent":20},<br>'
		+'		{"Year":2007, "Quarter":"1/4", "Month":3, "Seoul":14766, "Pusan":97314, "Incheon":103216, "NewYork":86072, "LA":52863, "Washington":93789, "Revenue":448020, "Percent":40},<br>'
		+'		{"Year":2007, "Quarter":"2/4", "Month":4, "Seoul":52352, "Pusan":56859, "Incheon":15688, "NewYork":65438, "LA":39181, "Washington":109514, "Revenue":339031, "Percent":31},<br>'
		+'		{"Year":2007, "Quarter":"2/4", "Month":5, "Seoul":100842, "Pusan":30391, "Incheon":23745, "NewYork":72742, "LA":102195, "Washington":30407, "Revenue":360322, "Percent":33},<br>'
		+'		{"Year":2007, "Quarter":"2/4", "Month":6, "Seoul":19217, "Pusan":75298, "Incheon":70807, "NewYork":36447, "LA":100805, "Washington":84934, "Revenue":387508, "Percent":36},<br>'
		+'		{"Year":2007, "Quarter":"3/4", "Month":7, "Seoul":74324, "Pusan":64947, "Incheon":101350, "NewYork":34673, "LA":24486, "Washington":57781, "Revenue":357561, "Percent":28},<br>'
		+'		{"Year":2007, "Quarter":"3/4", "Month":8, "Seoul":85932, "Pusan":95733, "Incheon":40327, "NewYork":69255, "LA":80024, "Washington":102739, "Revenue":474011, "Percent":37},<br>'
		+'		{"Year":2007, "Quarter":"3/4", "Month":9, "Seoul":101804, "Pusan":65098, "Incheon":79194, "NewYork":101669, "LA":30608, "Washington":73020, "Revenue":451393, "Percent":35},<br>'
		+'		{"Year":2007, "Quarter":"4/4", "Month":10, "Seoul":92130, "Pusan":91881, "Incheon":45166, "NewYork":65524, "LA":45348, "Washington":72708, "Revenue":412757, "Percent":36},<br>'
		+'		{"Year":2007, "Quarter":"4/4", "Month":11, "Seoul":80925, "Pusan":70537, "Incheon":25347, "NewYork":29360, "LA":76296, "Washington":42766, "Revenue":325230, "Percent":29},<br>'
		+'		{"Year":2007, "Quarter":"4/4", "Month":12, "Seoul":99008, "Pusan":30598, "Incheon":99124, "NewYork":22776, "LA":107805, "Washington":38384, "Revenue":397696, "Percent":35},<br>'
		+'		{"Year":2008, "Quarter":"1/4", "Month":1, "Seoul":68503, "Pusan":10155, "Incheon":47908, "NewYork":60857, "LA":104179, "Washington":109097, "Revenue":400699, "Percent":31},<br>'
		+'		{"Year":2008, "Quarter":"1/4", "Month":2, "Seoul":80573, "Pusan":75743, "Incheon":107750, "NewYork":76243, "LA":79265, "Washington":85345, "Revenue":504918, "Percent":40},<br>'
		+'		{"Year":2008, "Quarter":"1/4", "Month":3, "Seoul":23435, "Pusan":30538, "Incheon":86528, "NewYork":36735, "LA":96031, "Washington":96928, "Revenue":370196, "Percent":29},<br>'
		+'		{"Year":2008, "Quarter":"1/4", "Month":4, "Seoul":23435, "Pusan":30538, "Incheon":86528, "NewYork":36735, "LA":96031, "Washington":96928, "Revenue":370196, "Percent":29}];</font><br><br>'
		+'</pre>'
		,"className":"none_tutorial_child","displayList":true,"displayIndex":4
		,"displayBtn":"Set the data to be used in the grid."
	},{
		"index":5,"content":'<pre><font color="#0000ff">&#60/script></font><br><br></pre>',"className":"none_tutorial_child","displayList":true,"displayIndex":2
	},{
		"index":6,"content":"<pre><font color='#0000ff'>&#60;/head&#62;<br>&#60;body&#62;</font></pre>","className":"active_tutorial_child"
	},{
		"index":7,"content":'<pre>'
		+'	<font color="#0000ff">&#60;div><br>'
		+'		<font color="#4BBF5A">&#60;!-- The DIV in which the grid is placed --></font><br>'
		+'		&#60;div <font color="#ff0000">id="gridHolder" style="width:600px; height:400px;"</font>><br>'
		+'		&#60;/div><br>'
		+'	&#60;/div></font><br><br>'
		+'</pre>'
		,"className":"none_tutorial_child","displayList":true,"displayIndex":1
		,"displayBtn":"Set the area where the grid is displayed.<br>Set ID and size."
	},{
		"index":8,"content":'<pre>'
		+'<font color="#0000ff">&#60;/body><br>'
		+'&#60;/html></font>'
		+'</pre>'
		,"className":"active_tutorial_child"
	},{
		"index":9,"content":''
		,"className":"none_tutorial_child","displayList":true,"displayIndex":5
		,"displayBtn":""
	}
],

/*
	No additional themes to apply
	n: Name		c: Child(submenu)	u : URL
	t: Themes not to apply
		-1: All
		0 (right) ~ 6 (left)
*/

none_theme = [];