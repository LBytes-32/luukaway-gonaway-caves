# The Shifting-Scrolling Demo's Change Log
### Notice
These records began later on in development. Not everything has been documented to the extend I would've preferred.

#### Refactored Tile-Strips
- Added `createDivChild` function.
- Added `createDiv` function.
- Added `padding`, `strips`, and `tiles` to the `Map` class.
- `Map` was cleaned up. Creation and operations of strips are much more organized.
- Removed unnecessary `Map` methods.
- Added the `tiles.ts` file.
- Removed `Dom.swap` function.

#### Improved Demo UI
- Added a "generate colors" button.
- Added a toolbar.
- Updated CSS.
- Added `Map.indexTile` method.
- Added `Map.indexTile` method.
- Removed `Map.scrolledInDir` method.

#### CSS Cleanup
- Removed most CSS calculations. Integrated into TS. This keeps the calculations much more consistent with the code.
- Still need to remove the border's CSS calculations.
- `Dom.Styles` numeric fields can be either string or number. Numeric values will be interpreted in pixels.

#### CSS Border Cleanup
- Moved the border element from `Game` to `Map`.
- CSS expressions are now calculated in the `Map` constructor.
- `styles.css` has been heavily simplified.
- `Dom.Styles` no longer supports numerics. This made things unnecessarily complicated.

#### Lovely CSS
- Improved look of CSS.

#### Smooth Scrolling and Beautiful
- Added a title in the toolbar.
- Toggled border is now prettier!
- Precision of `x` and `y` is no longer tampered with. Screen coordinates are now stored separately, in `xScreen` and `yScreen`. Smooth velocity is now possible!
- Map shifting is once again based on conditional logic. However, instead of a hard set to the other side, it is now accumulated, allowing decimal precision to persist.
- Added title CSS class.

#### Small Fixes
- Changed the title.
- Improved consistency with calculations.
- Removed the "tile length" parameter when constructing a `TileStrip`. It was unnecessary.
- Changed map colors and slow-down velocity.

#### Migrated to CSS Transform
- Map offset relies on "transform" instead of "absolute position".
- Scroll coordinates no longer need to be integers.

#### Game Manager Adjustments
- `Game.State` now captures the framerate.
- Added new `border-revealing` style. This cleans up code in the "Toggle Border" event listener.
- `Game.createGameLoop` now receives a callback as an update function.
- Added various comments in the `game.ts` file.