<?php
header("content-type:text/html,charset='utf8'");
$page = $_POST['page'] ? $_POST['page'] :1;
$limit = $_POST['limit'] ? $_POST['limit']:10;
$count = 0; //总条数
$pages = 0; //总页数
$skip = 0; //跳过的条数

$link=mysqli_connect("localhost","root","root");
if(!$link){
    echo "服务器忙，请重试";
    exit;
}
mysqli_set_charset($link,"utf8");
mysqli_select_db($link,"nz");
$sql = "SELECT COUNT(*) FROM students";
$res=mysqli_query($link,$sql);
$row = mysqli_fetch_assoc($res);
$count = $row['COUNT(*)'];
// echo $count;
$pages = ceil($count / $limit);
$page = max(1, $page);
$page = min($page, $pages);
$skip = ($page -1) * $limit;
$msg =array(
    "page" => $page, 
    "count" => $count, 
    "pages" => $pages, 
    "limit" => $limit, 
    "skip" => $skip,
    "userlist" => array()
);
$sql2 = "SELECT * FROM students LIMIT {$skip}, {$limit}";
$res2 = mysqli_query($link, $sql2);
while($row2 = mysqli_fetch_assoc($res2)){
    array_push($msg['userlist'], $row2);
}
echo json_encode($msg);
mysqli_close($link);

?>