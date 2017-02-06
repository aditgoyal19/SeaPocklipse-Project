var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
	player_png: "res/Ship/Ship1.png",
	playert_png : "res/Ship/ShipTexture.png",
	buttons_png : "res/buttons/menuBWNew.png",
	bgSea_png : "res/background/bg.png",
	player_plist: "res/Ship/player.plist",
	bullet_png: "res/Projectiles/bullet1.png",
	enemy_bomber_png: "res/Enemy/EnsL1.png",
	ExplosionBomber_png: "res/Explosion/eplode1png.png",
	ExplosionBomber_plist: "res/Explosion/explode1.plist",
    ExplosionBullet_png: "res/Explosion/smallExplosions.png",
    ExplosionBullet_plist: "res/Explosion/smallExplosions.plist",
    title_png:"res/title.png",
    blank_png:"res/buttons/blank.png",
    bg_music:"res/sound/ContraRock-Metal.mp3",
    Explosion_effect:"res/sound/EXPLOSION.mp3",
    game_Over_effect:"res/sound/GameOver.mp3"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);

}