<h3>Preview & Import</h3>
<h4>Click on the button below to see the preview or import the items.</h4>

<table class="form-table">
	<tr>
		<td><label for="si-preview-number">Number of items to process</label></td>
		<td><input type="text" value="10" id="si-preview-number"><br><small>leave empty to process all the items</small></td>
	</tr>
	<tr>
		<td><label for="si-preview-sametime">Number of items processed at the same time</label></td>
		<td><input type="text" value="10" id="si-preview-sametime"><br><small>how many windows will be open</small></td>
	</tr>
	<tr>
		<td></td>
		<td>
			<input type="submit" id="si-preview" value="Preview">
			<input type="submit" id="si-import" value="Import">
			<input type="submit" id="si-cancel" value="Cancel">
		</td>
	</tr>
</table>

<table id="preview-table" class="wp-list-table widefat fixed"></table>