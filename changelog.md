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