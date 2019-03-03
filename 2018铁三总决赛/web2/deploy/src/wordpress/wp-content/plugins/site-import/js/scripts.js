if(window.location.href.indexOf('site_import')!=-1)(function($){
	    
	// ---------------------------------------------------------------------------------------------------- SELECT
	
	$.fn.findOrFilter = function(selector) {
    	return this.filter(selector).add(this.find(selector));
	};
	
	function highlight(e){
		if(sElement){
			sElement.style.outline = '';
			sElement.style.boxShadow = '';
		}
		this.style.outline = '2px solid #d00';
		this.style.boxShadow = '0 0 20px #222';
		sElement = this;
	}

	function nthChild(element){
		nth = 0;
		previous = element;
		while(previous){
			previous = previous.previousElementSibling;
			nth++;
		}
		return nth;
	}
	
	function xpath(element){
		selector = '';
		while(element && element.tagName.toLowerCase()!='html')
		if(element.id && false){
			selector = '#' + element.id + (selector ? '/' + selector : '');
			break;
		}else{
			selector = element.tagName.toLowerCase() + '[' + nthChild(element) + ']' + (selector ? '/' + selector : '');	
			element = element.parentNode;
		}
		return selector;
	}
	
	function x2css(selector){
		return selector.replace(/\{|\}/g,'').replace(/\//g,'>').replace(/\[(\d+)\]/g,':nth-child($1)');	
	}
	
	function selectElement(sLink, sClick, sText, sSelector){
		sElement = null;
		sLink = sLink.indexOf('http')==-1? 'http://'+sLink : sLink;
		sSelector = sSelector || '*';
		sWindow = window.open(dir+'/page.php?url='+encodeURIComponent(sLink), 'select', 'width='+screen.width+', height='+screen.height);
		sTooltipCSS = {position:'fixed', width:'300px', height:'auto', padding:'10px', background:'#d00', color:'#fff', textAlign:'center', zIndex:9e9};
		$(sWindow).on('load', function(){
			if(sText){
				sBody = $(sWindow.document).contents().find('body');
				sTooltip = $('<div></div>').addClass('site-import-tooltip').appendTo(sBody).css(sTooltipCSS).text(sText);
				$(sWindow.document).mousemove(function(e){sTooltip.css({left:e.clientX+5+'px', top:e.clientY-sTooltip[0].offsetHeight-5+'px'});});
			}
			$(sWindow.document).contents().find(sSelector).mouseenter(highlight).click(function(e){
				e.stopPropagation();
				e.preventDefault();
				sClick(sElement);
				sWindow.close();
			});
		});
	}
	
	// ---------------------------------------------------------------------------------------------------- TABS
	
	function initTabs(){
        $('.nav-tab').addClass('locked').click(function(e){    
			if(this.className.indexOf('locked')==-1)openTab(this.getAttribute('href').slice(1));
			e.preventDefault();
        });
		unlockTab('home');
		unlockTab('link');
		openTab('home');
    }
	
	function lockTab(name){
		$('#si-menu a[href="#'+name+'"]').addClass('locked');
	}
	
	function unlockTab(name){
		$('#si-menu a[href="#'+name+'"]').removeClass('locked');
	}
	
	function openTab(name){
		$('.nav-tab').removeClass('nav-tab-active');
        $('#si-menu a[href="#'+name+'"]').addClass('nav-tab-active');
        $('[id^="tab-"]').hide();
        $('#tab-'+name).show();
	}
	
	// ---------------------------------------------------------------------------------------------------- LINK
	
	function initLink(){
		$('#si-link-check').click(checkLink);
	}
	
	function getLinkInput(){
		return $('#si-link')[0];
	}
	
	function getLink(){
		value = getLinkInput().value;
		return value.indexOf('http')==-1 ? 'http://'+value : value;
	}
	
	function checkLink(e){
		if(this.value=='OK'){
			button = this;
			link = getLink();
			$.get(ajaxurl, {action:'url_status', url: link}, function(data){
				if(data=='ok'){
					getLinkInput().setAttribute('disabled','disabled');
					unlockTab('items');
					openTab('items');
					$('#si-link-check').val('Remove');
				}else{
					alert("Link '"+link+"' is incorrect");	
				}
			});
		}else{
			lockTab('items');
			lockTab('data');
			lockTab('import');
			getLinkInput().removeAttribute('disabled');
			this.value = 'OK';
		}
	}
	
	// ---------------------------------------------------------------------------------------------------- ITEMS
	
	items = [];
	itemWindows = [];
	
	function initItems(){
		$('#si-item').after($('<input type="button" value="...">').click(selectItem));
		$('#si-items-check').click(checkItems);
	}
	
	function getItemInput(){
		return $('#si-item')[0];
	}
	
	function getItem(){
		return getItemInput().value;
	}
	
	function getItemLinkInput(){
		return $('#si-item-link')[0];
	}
	
	function getItemLink(){
		return getItemLinkInput().value;
	}
	
	function selectItem(e){
		link = getLink();
		selectElement(link, function(element){
			getItemInput().value = '{'+xpath(element).replace(/\[\d+\]/g,'')+'}';
			getItemLinkInput().value = element.href;
		}, 'Select link to one item','a');
	}
	
	function checkItems(){
		if(getItemLink()){
			getItemInput().setAttribute('disabled','disabled');
			unlockTab('data');
			unlockTab('import');
			openTab('data');
		}else{
			alert('Select proper item');
		}
	}
	
	// ---------------------------------------------------------------------------------------------------- PAGINATION
	
	function initPagination(){
		$('#si-pagination').after($('<input type="button" value="...">').click(selectPagination));
	}

	function getPaginationInput(){
		return $('#si-pagination')[0];
	}
	
	function getPagination(){
		return getPaginationInput().value;
	}
		
	function selectPagination(e){
		link = getLink();
		selectElement(link, function(element){
			getPaginationInput().value = '{'+xpath(element)+'}';
		}, 'Select whole pagination');
	}
	
	// ---------------------------------------------------------------------------------------------------- DATA
	
	function initData(){
		$('.select').after($('<input type="button" value="...">').click(selectData));
		$('#si-type').change(updateTaxonomies);
	}
	
	function getTypeInput(){
		return $('#si-type')[0];
	}
	
	function getType(){
		return getTypeInput().value;
	}
	
	function getTitleInput(){
		return $('#si-title')[0];
	}
	
	function getTitle(){
		return getTitleInput().value;	
	}
	
	function getContentInput(){
		return $('#si-content')[0];
	}
	
	function getContent(){
		return getContentInput().value;
	}
	
	function getDateInput(){
		return $('#si-date')[0];	
	}
	
	function getDate(){
		return getDateInput().value;	
	}
	
	function selectData(e){
		input = $(this).prev()[0];
		text = $(this).parent().prev().find('label').text() || 'data';
		link = getItemLink();
		selectElement(link, function(element){
			input.value = '{'+xpath(element)+'}';
		}, 'Select '+text);
	}
	
	function parseData(text, content, type){
		parser = {
			string: function(text){return text;},
			int: function(text){num = text.match(/\d[\d\s\,]*/); return num ? num[0].replace(/[\s\,]+/g,'') : '0';},
			float: function(text){num = text.match(/\d[\d\s\,]*(\.\d[\d\s]*)?/); return num ? num[0].replace(/[\s\,]+/g,'') : '0.0';}	
		};
		parser = parser[type] || parser.string;
		return text.replace(/\{([\w\-\#\[\]\/]+)\}/g, function(match, selector){
			selector = x2css(selector);
			return parser(content.find(selector).text());
		});
	}
	
	// ---------------------------------------------------------------------------------------------------- TAXONOMIES
	
	function initTaxonomies(){
		updateTaxonomies();
	}
	
	function getTaxonomiesInputs(){
		return $('input[id^="si-taxonomy"]').filter(function(){
			return this.parentNode.parentNode.style.display!='none';
		});
	}
	
	function getTaxonomies(){
		
	}
	
	function updateTaxonomies(){
		$('*[id^="si-taxonomy"]').each(function(){
			types = this.getAttribute('types').split(/\,/g);
			if($.inArray(getType(), types)!=-1)$(this).parent().parent().show();
			else $(this).parent().parent().hide();
		})
	}
	
	// ---------------------------------------------------------------------------------------------------- DATA
	
	function getData(){
		return {
			link: getLink(),
			item: getItem(),
			pagination: getPagination(),
			type: getType(),
			title: getTitle(),
			content: getContent(),
			date: getDate(),
			taxonomies: getTaxonomiesInputs().map(function(){return {name:this.name, value:this.value};}).toArray()
		};
	}
	
	function getContentData(content){
		return {
			n: ++itemN,
			type: getType(),
			title: parseData(getTitle(), content, 'string'),
			content: parseData(getContent(), content, 'string'),
			date: parseData(getDate(), content, 'string'),
			taxonomies: getTaxonomiesInputs().map(function(){return {name:this.name, value:parseData(this.value, content, 'string')};}).toArray()
		};
	}
	
	// ---------------------------------------------------------------------------------------------------- OPEN WINDOW
	
	function openPage(link, callback){
		pageNumber++;

		if(linkWindow){
			paginationSelector = x2css($('#si-pagination').val().replace(/\{|\}/g,''));
			link = linkContent.find(paginationSelector).find('a[href]:contains('+pageNumber+')')[0];
			link = link ? link.href : '';
			linkWindow.close();
		}

		if(!link)return;
		
		linkWindow = window.open(dir+'/page.php?url='+encodeURIComponent(link), 'page_'+pageNumber, 'width=300, height=300, left='+(mx-150)+', top='+(my-150));
		$(linkWindow).on('load', function(){
			linkContent = $(linkWindow.document).contents();
			itemLinks = linkContent.find(x2css(getItem()));
			for(var i=0,I=getSameTime(); i<I; ++i)openItem(link, callback, mx+Math.cos(i/I*Math.PI*2)*300-50, my+Math.sin(i/I*Math.PI*2)*300-50);
		});
	}

	function openItem(link, callback, x, y){
		if(itemLinks.length==0){
			if(itemWindows.length==0)openPage(link, callback);
			return;
		}
		
		if(itemNumber+1>getNumber()){
			if(linkWindow)linkWindow.close();
			return;
		}
		
		itemNumber++;
		itemWindow = window.open(dir+'/page.php?url='+encodeURIComponent(itemLinks[0]), 'item_'+itemNumber, 'width=100, height=100, left='+x+', top='+y);
		
		$(itemWindow).on('load', function(e){
			itemContent = $(this.document).contents();
			data = getContentData(itemContent);
			callback(data);
			itemWindows.splice($.inArray(this, itemWindows), 1);
			this.close();
			openItem(link, callback, this.screenX, this.screenY);
		});
		
		itemWindows[itemWindows.length] = itemWindow;
		itemLinks.splice(0, 1);
	}
	
	function openLink(link, callback){
		linkWindow = 0;
		linkContent = 0;

		itemN = 0;
		itemNumber = 0;
		itemLinks = [];
		itemWindows = [];
		
		pageNumber = 0;
	
		openItem(link, callback);
	}
	
	function closeLink(){
		for(var i=0,I=itemWindows.length; i<I; ++i)if(itemWindows[i] && itemWindows[i].close)itemWindows[i].close();
		if(linkWindow && itemWindow.close)linkWindow.close();	
	}
	
	// ---------------------------------------------------------------------------------------------------- PREVIEW
	
	function initPreview(){
		$('#si-preview').click(preview);
		$('#si-cancel').click(closePreview).hide();
		$('#preview-table').hide();
	}
	
	function openPreview(){
		$('#si-preview, #si-import').hide()
		$('#si-cancel').show();
	}
	
	function closePreview(){
		closeLink();
		$('#si-preview, #si-import').show();
		$('#si-cancel').hide();	
	}
	
	mx = screen.width/2;
	my = screen.height/2;
	
	function getNumber(){
		return $('#si-preview-number')[0].value || 9e9;	
	}
	
	function getSameTime(){
		return $('#si-preview-sametime')[0].value;	
	}
	
	function preview(){
		previewHeader();
		openLink(getLink(), previewRow);
		openPreview();
	}
	
	function previewHeader(){
		previewTable = $('#preview-table').empty().show();
		tr = $('<tr></tr>').appendTo(previewTable);
		$('<th>No</th>').appendTo(tr);
		$('<th>Title</th>').appendTo(tr);
		$('<th>Content</th>').appendTo(tr);
		$('<th>Date</th>').appendTo(tr);

		getTaxonomiesInputs().each(function(){
			$('<th></th>').text(this.getAttribute('label')).appendTo(tr);
		});
	}
	
	function previewRow(data){
		tr = $('<tr></tr>').appendTo(previewTable);
		no = $('<td></td>').text(data.n).appendTo(tr);
		title = $('<td></td>').text(data.title).appendTo(tr);
		content = $('<td></td>').text(data.content).appendTo(tr);
		date = $('<td></td>').text(data.date).appendTo(tr);
		for(var i=0,I=data.taxonomies.length; i<I; ++i)$('<td></td>').text(data.taxonomies[i].value).appendTo(tr);
	}
	
	// ---------------------------------------------------------------------------------------------------- IMPORT
	
	function initImport(){
		$('#si-import').click(importing);
	}
	
	function importing(){
		importHeader();
		openLink(getLink(), importRow);
		openPreview();
	}
	
	function importHeader(){
		previewTable = $('#preview-table').empty().show();
		tr = $('<tr></tr>').appendTo(previewTable);
		$('<th>No</th>').css('width','100px').appendTo(tr);
		$('<th>Title</th>').appendTo(tr);
		$('<th>Status</th>').appendTo(tr);
	}
	
	function importRow(data){
		func = function(txt){
			id = parseInt(txt);
			if(id){
				arguments.callee.link.attr('href','/?p='+id);
				arguments.callee.status.text('success');		
			}else{
				arguments.callee.status.text('error');		
			}
		};
		func.tr = $('<tr></tr>').appendTo(previewTable);
		func.no = $('<td></td>').text(data.n).appendTo(func.tr);
		func.title = $('<td></td>').appendTo(func.tr);
		func.link = $('<a></a>').text(data.title).appendTo(func.title);
		func.status = $('<td></td>').text('...').appendTo(func.tr);
		data.action = 'import_data';
		$.post(ajaxurl, data, func);
	}
	
	// ---------------------------------------------------------------------------------------------------- INIT
	
    $(function(){
		initTabs();
		initLink();
		initItems();
		initPagination();
		initData();
		initTaxonomies();
		initPreview();
		initImport();
    });
	
})(jQuery);