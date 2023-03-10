### Showcase

![Screenshot_1](https://user-images.githubusercontent.com/91349014/208101437-aaf29350-e34a-4a51-92a1-f5475b95b77f.png)
[Try it yourself](https://jd-todos.vercel.app)

# Create JD App

This project was created using [Create JD App](https://github.com/OrJDev/create-jd-app)

## Deploying To Vercel

### Installing

```bash
npm install solid-start-vercel@latest -D
```

### Adding to vite config

```ts
import solid from "solid-start/vite";
import dotenv from "dotenv";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
// @ts-expect-error no typing
import vercel from "solid-start-vercel";

export default defineConfig(() => {
  dotenv.config();
  return {
    plugins: [
      solid({ ssr: false, adapter: vercel({ edge: false }) }),
      UnoCSS(),
    ],
  };
});
```

### Enviroment Variables

- `ENABLE_VC_BUILD`=`1` .
- `DATABASE_URL`=`your database url` .

### You Are Done

Create a github repo and push your code to it, then deploy it to vercel (:
