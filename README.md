<!-- @format -->

# What?

Just a template
<br>
<br>

# Apply?
- Pls **remove** all example components
- Follow the `Rules` (at the end of this file)
- Read carefully the `Cleaner importing` section

<br>
<br>

# Solve Eslint and Prettier conflict
First:

```json
npm i -D prettier

npm i -D eslint-config-prettier
npm i -D eslint-plugin-prettier
```
Then you need to add `plugin:prettier/recommended` as the **last** extension in your `.eslintrc.json`:

```json
{
  "extends": ["plugin:prettier/recommended"]
}
```

Exactly what does `plugin:prettier/recommended` do? Well, this is what it expands to:

```json
{
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off"
  }
}
```
<br>
<hr />
<br>


# Cleaner importing
In `tsconfig.json`:
```json
"paths": {
  "@components/*": ["./components/*"],
  "@assets/*": ["./assets/*"],
  "@interfaces/*": ["./interfaces/*"],

}
```

In `vite.config.ts`:
```js
resolve: {

  alias: {
    "@components": path.resolve(__dirname, "./src/components"),
    "@assets": path.resolve(__dirname, "./src/assets"),
    "@interfaces": path.resolve(__dirname, "./src/interfaces"),
  }
}
```
**Add more if necessary.**
<br>
<br>

# Atomic Design Pattern
- `Atoms`
- `Molecules` (Group of Atoms)
- `Organisms` (Group of Molecules and Atoms)
- `Templates` (The layout (container / responsive container) of Pages / Organisms) - no logic, just css
- `Pages` (Combined of 4 above)

# Rules
- Base component (`Atom`), Common Component (`Molecules`)
- Place in `@Components`
- ex:

  + Input feature -> `@components/Input`
    + Its implementation? -> `@components/Input/Input.tsx`
    + Its variant? -> `@components/Input/variants`
    + Should always use `index.ts` to export (default component, types, variants)

<br>
<hr />


- everything can be splitted and belong to specific features (`Organisms`), place in  `@modules`
- ex:

  + Message feature -> `@modules/message`
  + Common Components of Message -> `@modules/message/components`
    + Hooks of a specific component? -> `@modules/message/components/SomeThing/hooks`
    + implementation of a specific component? -> `@modules/message/components/SomeThing/Something.tsx`
  + Shared Hooks of Message -> `@modules/message/hooks`

<br>
<hr />

