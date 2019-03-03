<?php
    namespace site_import_namespace;
?>

<h2 id="si-menu" class="nav-tab-wrapper woo-nav-tab-wrapper">
    <a href="#home" class="nav-tab">Site Import</a>
    <a href="#link" class="nav-tab">Link</a>
	<a href="#items" class="nav-tab">Items</a>
    <a href="#data" class="nav-tab">Data</a>
    <a href="#import" class="nav-tab">Preview & Import</a>
</h2>

<?php

    global $path;
    $path = pathinfo(__FILE__, PATHINFO_DIRNAME);
	$dir = '/'.str_replace('\\', '/', substr($path, strpos($path, 'wp-content')));

	echo '<script type="text/javascript">dir = "'.$dir.'";</script>';

	include $path.'/variables.php';

    echo '<div id="si">';

        echo '<div id="tab-home">';
            include $path.'/home.php';
        echo '</div>';

        echo '<div id="tab-link">';
            include $path.'/link.php';
        echo '</div>';

        echo '<div id="tab-items">';
            include $path.'/items.php';
        echo '</div>';

        echo '<div id="tab-data">';
            include $path.'/data.php';
            include $path.'/taxonomies.php';
            include $path.'/media.php';
            include $path.'/custom.php';
			include $path.'/templates.php';
        echo '</div>';

        echo '<div id="tab-import">';
            include $path.'/preview.php';            
        echo '</div>';

    echo '</div>';

?>