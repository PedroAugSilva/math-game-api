import app from "./http";

app
  .listen({
    port: 3000,
  })
  .then(() => console.log("servidor aberto!!"));
