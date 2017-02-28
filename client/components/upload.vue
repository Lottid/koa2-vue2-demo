<template>
  	<div class="upload">
		<form action="/api/uploadAction" method="post" enctype="multipart/form-data">
	        <input type="file" name="file" multiple>
	        <input type="submit" value="Upload">
	    </form>
  	</div>
</template>

<script>
	export default {
		name: 'upload'
	}
</script>

<style>

</style>
