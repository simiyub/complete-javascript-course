/*****************************
* CODING CHALLENGE 2
*/

/*
John and Mike both play basketball in different teams. In the latest 3 games, John's team scored 89, 120 and 103 points, while Mike's team scored 116, 94 and 123 points.

1. Calculate the average score for each team
2. Decide which teams wins in average (highest average score), and print the winner to the console. Also include the average score in the output.
3. Then change the scores to show different winners. Don't forget to take into account there might be a draw (the same average score)

4. EXTRA: Mary also plays basketball, and her team scored 97, 134 and 105 points. Like before, log the average winner to the console. HINT: you will need the && operator to take the decision. If you can't solve this one, just watch the solution, it's no problem :)
5. Like before, change the scores to generate different winners, keeping in mind there might be draws.

*/

var averageJohnsTeam    = (89 + 120 + 103) / 3;
var averageMikesTeam    = (116 + 94 + 123) / 3;
var averageMarysTeam    = (97 + 134 + 105) / 3;

if (averageJohnsTeam && averageMikesTeam && averageMarysTeam) {
    
    if (averageJohnsTeam !== averageMikesTeam !== averageMarysTeam) {
        var winnerScore, winner;
        if (averageJohnsTeam > averageMikesTeam) {
            winnerScore = averageJohnsTeam;
            winner      = 'John';
        } else {
            winnerScore = averageMikesTeam;
            winner      = 'Mike';
        }
        
        if (averageMarysTeam > winnerScore) {
            winnerScore = averageMarysTeam;
            winner      = 'Mary';
        } 
        console.log('The winner [with highest average score of %s] is ....... %s .', winnerScore, winner); 
    } else {
        console.log('its a tie');
    }
  
    
}
