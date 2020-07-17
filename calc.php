<?php
/*
 * Не разобрался с исходной формулой рассчёта, изменил на свой взгляд.
 * Ежемесячная капитализация вклада, которая зависит от дней в месяце и году.
 */
$time_plus = $_POST['calc-time'];

$time_start = new DateTime($_POST['calc-date']);// старт вклада
$time_start_1 = new DateTime($_POST['calc-date']);
$time_end = $time_start_1->modify('+'.$time_plus.' year'); //конец вклада
//$interval = $time_start->diff($time_end);

$summn = $_POST['calc-sum'];
$summ_prev = 0;
$summadd = ($_POST['calc-plus'])?$_POST['calc-plus']:0;
$percent = 10;
$counter = 0; //ввёл счётчмк, чтобы бы не было пополнения счёта в первый же месяц. Не изящное решение, конечно, но рабочее;)

while ($time_start < $time_end) {
    $year = (date("L", date("t", mktime(0, 0, 0, 1, 0, $time_start->format('Y'))))==0)?365:366; //дней в году
    $days = date("t", mktime(0, 0, 0, $time_start->format('m'), 0, $time_start->format('Y'))); //дней в месяце
    $capit = (1+($percent*$days)/(100*$year));
    $balans = ($counter==0)?($summn + $summ_prev):($summn + $summ_prev + $summadd);
    $summn = $balans*$capit;
    $sum_prev = $summn;
    $time_start->modify('+1 month');
    $counter++;
}

echo floor($summn);

