service Leaderboard {

	oneway void setHighScore(1:string playerName, 2:i32 highScore);
	map<string, i32> getTop20();

}