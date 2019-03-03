<?php

    namespace site_import_namespace;

    echo '<h3>Data</h3>';
	echo '<h4>Fill the form below to match appropriate attributes with the data.</h4>';
	echo '<table class="form-table">';
	echo '<tr><td><label for="si-type">Type</label></td><td><select name="post-type" id="si-type">';
	foreach($post_types as $type)echo '<option value="'.$type.'">'.$type.'</option>';
	echo '</select></td></tr>';
	echo '<tr><td><label for="si-title">Title</label></td><td><input type="text" value="" name="title" id="si-title"  class="select"></td></tr>';
	echo '<tr><td><label for="si-content">Content</label></td><td><textarea name="content" id="si-content"  class="select"></textarea></td></tr>';
	echo '<tr><td><label for="si-date">Date</label></td><td><input type="text" value="" name="date" id="si-date"  class="select"></td></tr>';
	echo '</table>';

?>