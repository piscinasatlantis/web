<?php
if(substr(basename($_SERVER['PHP_SELF']), 0, 11) == "imEmailForm") {
	include '../res/x5engine.php';
	$form = new ImForm();
	$form->setField('Nombre', @$_POST['imObjectForm_39_1'], '', false);
	$form->setField('Numero telefónico', @$_POST['imObjectForm_39_2'], '', false);
	$form->setField('Email ', @$_POST['imObjectForm_39_3'], '', false);
	$form->setField('Mensaje', @$_POST['imObjectForm_39_4'], '', false);

	$errorMessage = '';
	if(@$_POST['action'] != 'check_answer') {
		if(!isset($_POST['imJsCheck']) || $_POST['imJsCheck'] != '144C8BAF1DA5DBF744D4373AB6BF7A8D' || (isset($_POST['imSpProt']) && $_POST['imSpProt'] != ""))
			die(imPrintJsError());
		$form->mailToOwner('crisguerycatita@gmail.com', '', 'example@example.com', '', "", false);
		@header('Location: ../index.html');
		exit();
	} else {
		echo $form->checkAnswer(@$_POST['id'], @$_POST['answer']) ? 1 : 0;
	}
}

// End of file