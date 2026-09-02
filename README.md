# ⚽ Simple Football Game

A fun, interactive football (soccer) game playable directly in your browser! Similar to FIFA and eFootball, but simple and lightweight.

## 🎮 Features

- **Real-time Match Gameplay**: 90-minute matches with live updates
- **Player Controls**: Pass, Shoot, Dribble, and Defend
- **AI Opponent**: Play against a CPU-controlled team
- **Possession Stats**: Track possession percentage during the match
- **Live Commentary**: Real-time match events and commentary
- **Beautiful UI**: Modern, responsive design with gradient effects
- **Keyboard Shortcuts**: Quick gameplay with P, S, D, F keys
- **Mobile Friendly**: Play on desktop and mobile devices

## 🚀 How to Play

### Online (GitHub Pages)
Visit: https://forckyou.github.io/football-game/

### Local Installation
1. Clone the repository:
```bash
git clone https://github.com/ForckYou/football-game.git
cd football-game
```

2. Open `index.html` in your web browser

That's it! No installation or build process needed.

## 🎯 Gameplay Controls

| Action | Button | Keyboard |
|--------|--------|----------|
| Pass | 🎯 Pass | P |
| Shoot | ⚡ Shoot | S |
| Dribble | 🏃 Dribble | D |
| Defend | 🛡️ Defend | F |

## 📋 Game Rules

### Passing
- **Success Rate**: 80%
- **Effect**: Moves the ball forward by ~10-15%
- **On Fail**: Ball intercepted by opponent

### Shooting
- **Position Required**: Within 25% of opponent's goal
- **Success Rate**: 70% (when in position)
- **Effect**: Score a goal if successful
- **On Fail**: Shot blocked or saved

### Dribbling
- **Success Rate**: 70%
- **Effect**: Advance the ball 8% closer to goal
- **On Fail**: Lose possession to opponent

### Defending
- **Success Rate**: 65% (when opponent has possession)
- **Effect**: Recover the ball
- **On Fail**: Opponent keeps possession

## 📊 Game Mechanics

- **Possession**: Affects your ability to play
- **Match Time**: 90 minutes total
- **Home Team (You)**: Blue gradient players
- **Away Team (CPU)**: Pink/Red gradient players
- **Active Player**: Yellow glow around current ball holder
- **Ball Animation**: Special effects when scoring

## 🎨 Customization

You can customize the game by editing:

- **Player Names**: In `index.html`, change `homeTeam` and `awayTeam` text
- **Match Duration**: In `game.js`, change `matchDuration: 90` value
- **Success Rates**: Modify percentages in each action function
- **Colors**: Update gradient colors in `style.css`

### Example: Change Match Duration to 45 Minutes
```javascript
matchDuration: 45, // in game.js
```

## 📱 Responsive Design

The game adapts to different screen sizes:
- Desktop: Full field display
- Tablet: Optimized layout
- Mobile: Touch-friendly controls

## 🐛 Troubleshooting

**Game not loading?**
- Ensure all three files are in the same directory: `index.html`, `style.css`, `game.js`
- Check browser console for errors (F12)

**Controls not working?**
- Make sure you click on the page first to ensure it has focus
- Try using keyboard shortcuts (P, S, D, F)

**Slow performance?**
- Close other browser tabs
- Update your browser to the latest version

## 🔧 Technical Stack

- **HTML5**: Game structure and layout
- **CSS3**: Modern styling with gradients and animations
- **Vanilla JavaScript**: Game logic and interactivity
- **No Dependencies**: Runs on pure web technologies

## 📈 Future Enhancements

Possible improvements:
- Player stats and ratings
- Multiple difficulty levels
- Team customization
- Power-ups and special moves
- Sound effects and music
- Online multiplayer
- Save game functionality
- Match replays

## 📄 License

Open source - Feel free to use, modify, and share!

## 🎮 Tips to Win

1. **Pass wisely**: High success rate, builds up possession
2. **Dribble strategically**: Great for advancing down the field
3. **Shoot from close**: Only shoot when within 25% of goal
4. **Defend actively**: Press the defend button when losing possession
5. **Watch possession**: Higher possession = better chance to score
6. **Patience**: Build up plays rather than rushing shots

## 🤝 Contributing

Found a bug or have an idea? Feel free to:
- Report issues
- Suggest improvements
- Submit pull requests

## 📞 Support

For questions or issues, check the GitHub repository or contact the developer.

---

**Enjoy the game! ⚽ Good luck!**