<?php
include("../res/x5engine.php");
$nameList = array("7al","kzm","t3j","hz2","2tj","jxw","kmh","ssf","ggk","2um");
$charList = array("W","P","W","H","J","L","3","W","2","R");
$cpt = new X5Captcha($nameList, $charList);
//Check Captcha
if ($_GET["action"] == "check")
	echo $cpt->check($_GET["code"], $_GET["ans"]);
//Show Captcha chars
else if ($_GET["action"] == "show")
	echo $cpt->show($_GET['code']);
// End of file x5captcha.php
