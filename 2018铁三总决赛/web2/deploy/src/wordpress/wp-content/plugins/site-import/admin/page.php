<?php

    namespace site_import_namespace;

	$page = $_GET['url'];
	$url = parse_url($page);
	$url['path'] = pathinfo(isset($url['path'])?$url['path']:'');
	if(!isset($url['path']['dirname']) || $url['path']['dirname']=='\\')$url['path']['dirname'] = '/';
	//if($url['path']['dirname'][strlen($url['path']['dirname'])-1]!='/')$url['path']['dirname'] .= '/';

	function change_link($text){
		global $url;
		$pre = $text[1];
		$tag = $text[2];
		$name = $text[3];
		$value = $text[4];
		if(strpos($value, 'http')===false){
			if($value[0] == '/')$value = substr($value, 1);
			//return $pre.$name.'="'.($url['scheme'].'://'.$url['host'].$url['path']['dirname'].$value['dirname'].'/'.$value['basename']).'"';	
			return $pre.$name.'="'.($url['scheme'].'://'.$url['host'].'/'.$value).'"';	
		}else{
			return $pre.$name.'="'.$value.'"';
		}
	}

	function change_link_2($text){
		global $url;
		$pre = $text[1];
		$tag = $text[2];
		$name = $text[3];
		$value = $text[4];
		if(strpos($value, 'http')===false){
			$value = pathinfo($value);
			if($value['dirname']=='.')$value['dirname'] = '';
			//return $pre.$name.'="?link='.urlencode($url['scheme'].'://'.$url['host'].$url['path']['dirname'].$value['dirname'].'/'.$value['basename']).'"';
			return $pre.$name.'="?link='.urlencode($url['scheme'].'://'.$url['host'].$value['dirname'].'/'.$value['basename']).'"';
		}else{
			return $pre.$name.'="?link='.urlencode($value).'"';
		}
	}
	
	$context = stream_context_create(array('http' => array('max_redirects' => 101)));
	$content = file_get_contents($page, false, $context);
	$content = preg_replace_callback("/(\<(img|link|a) [^\>]*?)(href|src)\=\"([^\"]+?)\"/", 'site_import_namespace\change_link', $content);

	echo $content;

?>