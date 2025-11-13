# Directed Percolation Visualizer

Interactive p5.js sketch that renders a directed percolation model of state evolutionwith time and lets you tune (some) probabilities in real time.

## Running
1. Open `index.html` in a browser.
2. Adjust the sliders to explore different percolation regimes.

## Notes
- [ ] The canvas resizes on window changes through [`windowResized`](directedPercolation.js), this is to be improved
- [ ] The probability of a spread at the moment requires a spread and survive which I think is not quite right.