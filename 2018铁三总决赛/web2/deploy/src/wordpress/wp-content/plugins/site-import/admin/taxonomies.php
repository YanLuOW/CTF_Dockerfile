<?php

    namespace site_import_namespace;

	echo '<h3>Taxonomies</h3>';

	echo '<h4>Define what taxonomies you want to set.</h4>';
	echo '<table class="form-table">';

	foreach(get_taxonomies(array(), 'objects') as $taxonomy){
		echo '<tr>';
		echo '	<td><label for="si-taxonomy-'.$taxonomy->name.'">'.$taxonomy->label.'</label></td>';
		echo '	<td><input type="text" value="" id="si-taxonomy-'.$taxonomy->name.'" name="'.$taxonomy->name.'" label="'.$taxonomy->label.'" class="select" types="'.implode(',',$taxonomy->object_type).'"></td>';
		echo '</tr>';
	}

	echo '</table>';

?>