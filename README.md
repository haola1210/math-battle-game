<!-- @format -->
# Apply?
- Pls **remove** all example components
- Follow the `Rules` (at the end of this file)
- Read carefully the `Cleaner importing` section

<br>
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
