<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Lido Bet</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">

<style>

*{
    box-sizing:border-box;
}

body{
    margin:0;
    font-family:'Poppins', sans-serif;
    background: radial-gradient(circle, #0f0f0f, #000);
    color:white;
}

.phone{
    max-width:380px;
    margin:auto;
    min-height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
}

/* HEADER */

.header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:15px;
}

.logo{
    color:gold;
    font-weight:700;
    font-size:20px;
}

.top-btns a{
    text-decoration:none;
    background:gold;
    color:black;
    padding:7px 14px;
    border-radius:8px;
    margin-left:5px;
    font-size:12px;
    font-weight:600;
}

.top-btns a:hover{
    opacity:0.8;
}

/* CENTER */

.center{
    text-align:center;
    padding:20px;
}

.center h1{
    color:gold;
    font-size:34px;
    margin-bottom:10px;
}

.center img{
    width:100%;
    max-width:260px;
    margin-top:20px;
}

.join-btn{
    display:block;
    width:80%;
    margin:30px auto 10px auto;
    background:gold;
    color:black;
    padding:14px;
    border-radius:30px;
    font-weight:700;
    text-decoration:none;
    font-size:16px;
}

.join-btn:hover{
    opacity:0.85;
}

.login-link{
    color:gold;
    text-decoration:none;
    font-weight:600;
}

.login-link:hover{
    text-decoration:underline;
}

/* BOTTOM NAV */

.bottom-nav{
    display:flex;
    justify-content:space-around;
    background:#111;
    padding:12px 0;
    border-top:1px solid #333;
}

.bottom-nav a{
    text-decoration:none;
    color:gold;
    font-size:13px;
    text-align:center;
}

.bottom-nav a:hover{
    opacity:0.7;
}

</style>
</head>

<body>

<div class="phone">

    <div class="header">
        <div class="logo">Lido Bet</div>

        <div class="top-btns">
            <a href="insc.php">Inscription</a>
            <a href="conc.php">Connexion</a>
        </div>
    </div>

    <div class="center">

        <h1>Lido Bet</h1>

        <img src="img/casino.png" alt="Jeux casino Lido Bet">

        <a class="join-btn" href="insc.php">JOIN NOW</a>

        <a class="login-link" href="conc.php">LOG IN</a>

    </div>

    <div class="bottom-nav">
        <a href="index.php">Accueil</a>
        <a href="game.php">Game</a>
        <a href="retrait.php">Retrait</a>
        <a href="setting.php">Paramètres</a>
    </div>

</div>

</body>
</html>
