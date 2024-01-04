<?php

$mycamera = new \Controllers\Camera();

/**
 *  Check that specified camera Id is valid
 */
if (empty($_GET['id'])) {
    return;
}
if (!is_numeric($_GET['id'])) {
    return;
}
if (!$mycamera->existId($_GET['id'])) {
    return;
}

/**
 *  Get camera configuration
 */
$configuration = $mycamera->getConfiguration($_GET['id']);
$url = $configuration['Url'];
$username = $configuration['Username'];
$password = $configuration['Password'];

/**
 *  Define context options
 */
$context = [
    'http' => [
        'timeout' => 2,
        'method' => 'GET'
    ]
];

/**
 *  Append username and password if not empty
 *  Convert to base64
 */
if (!empty($username) and !empty($password)) {
    $context['http']['header'] = 'Authorization: Basic ' . base64_encode($username . ':' . $password);
}

/**
 *  Set default socket timeout to 2 seconds
 *  Will apply to readfile
 */
stream_context_set_default($context);

/**
 *  Clear memory
 */
unset($mycamera, $context, $configuration, $username, $password);

ob_end_flush();

/**
 *  Read distant file (stream)
 */
readfile($url, false);
