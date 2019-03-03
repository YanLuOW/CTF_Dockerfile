<?php

	namespace site_import_namespace;

	$path = pathinfo(__FILE__, PATHINFO_DIRNAME);

	add_action('wp_ajax_url_status', 'site_import_namespace\ajax_url_status');

	function ajax_url_status(){
		$headers = @get_headers($_GET['url']);
		echo $headers ? 'ok' : 'error';
		wp_die();
	}

?>