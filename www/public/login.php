<!DOCTYPE html>
<html>
<?php
if (!defined('ROOT')) {
    define('ROOT', dirname(__FILE__, 2));
}
// if (!defined('DATA_DIR')) {
//     define('DATA_DIR', '/var/lib/motionui');
// }
require_once(ROOT . '/controllers/Autoloader.php');
\Controllers\Autoloader::loadFromLogin();
include_once(ROOT . '/includes/head.inc.php');

$loginErrors = array();
$error = 0;

/**
 *  Tentative de connexion
 *  Vérification de username et du mot de passe
 */
if (!empty($_POST['username']) and !empty($_POST['password'])) {

    /**
     *  On continue si il n'y a pas eu d'erreur
     */
    if ($error == 0) {
        $username = \Controllers\Common::validateData($_POST['username']);
        $mylogin = new \Controllers\Login();

        /**
         *  On vérifie en base de données que le couple username/passwd est valide
         */
        try {
            $mylogin->checkUsernamePwd($username, $_POST['password']);

            /**
             *  On récupère les informations concernant l'utilisateur en base de données
             */
            $mylogin->getAll($username);

            /**
             *  On ouvre la session
             */
            session_start();

            /**
             *  On enregistre les informations concernant l'utilisateur dans les variables de session
             */
            $_SESSION['username']   = $username;
            $_SESSION['role']       = $mylogin->getRole();
            $_SESSION['first_name'] = $mylogin->getFirstName();
            $_SESSION['last_name']  = $mylogin->getLastName();
            $_SESSION['email']      = $mylogin->getEmail();
            $_SESSION['type']       = 'local';

            /**
             *  Si un cookie 'origin' existe alors celui-ci contient une URI vers laquelle on redirige l'utilisateur
             */
            if (!empty($_COOKIE['origin'])) {
                header('Location: ' . $_COOKIE['origin']);
                exit();
            }

            /**
             *  Sinon on redirige vers index.php
             */
            header('Location: index.php');
            exit();
        } catch (Exception $e) {
            $loginErrors[] = $e->getMessage();
        }
    }
} ?>
<head>
    <meta charset="utf-8">
    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="resources/styles/style.css">

    <!-- Favicon -->
    <link rel="icon" href="resources/favicon.ico" />
    <title>Login</title>
</head>

<body>
    <div id="loginDiv-container">
        <div id="loginDiv">
            <h3>AUTHENTICATION</h3>
            <br>
            <form action="login.php" method="post" autocomplete="off">
                <input class="input-large" type="text" name="username" placeholder="Username" required />
                <br>
                <input class="input-large" type="password" name="password" placeholder="Password" required />
                <br>
                <button class="btn-large-green" type="submit">Login</button>
            </form>

            <?php
            /**
             *  Display errors if any
             */
            if (!empty($loginErrors)) {
                foreach ($loginErrors as $loginError) {
                    echo '<p>' . $loginError . '</p>';
                }
            }
            ?>
        </div>
    </div>
</body>
</html>