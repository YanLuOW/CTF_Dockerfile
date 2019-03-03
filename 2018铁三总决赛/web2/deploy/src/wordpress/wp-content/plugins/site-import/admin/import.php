<?php

	namespace site_import_namespace;

	// functions

	error_reporting(E_ERROR);

	// ajax

	add_action('wp_ajax_import_data', 'site_import_namespace\ajax_import_data');

	function ajax_import_data(){
		// ini set
		ini_set('post_max_size', '1024M');
    	ini_set('upload_max_filesize', '1024M');
		
		// post
		$wp_error = '';
		$post_id = NULL;
		$post = array('ID' => $post_id, 'post_status' => 'publish');

		// default fields
		$post['post_type'] = $_POST['type'];
		$post['post_title'] = $_POST['title'];
		$post['post_name'] = sanitize_title($post['post_title']);
		$post['post_content'] = $_POST['content'];
		$post['post_date'] = date('Y-m-d H:i:s', $_POST['date']);

		// add post
		$post_id = wp_insert_post($post, $wp_error);
		$post['ID'] = $post_id;

		// taxonomies
		if(is_array($_POST['taxonomies']))
			foreach($_POST['taxonomies'] as $taxonomy)
				wp_set_object_terms($post_id, array($taxonomy['value']), $taxonomy['name']);

		echo $post_id;
		wp_die();
	}

?>