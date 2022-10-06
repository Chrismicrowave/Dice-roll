<?php
	define('UPLOAD_DIR', 'test/images/');
	$img = $_POST['imgBase64'];
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	// $file = UPLOAD_DIR . uniqid() . '.png';
  $file = UPLOAD_DIR .guess. '.png';

	$success = file_put_contents($file, $data);
	//send request to ocr

	print $success ? $file : 'Unable to save the file.';
?>
