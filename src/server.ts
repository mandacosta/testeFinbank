import app from "./app";
import AppDataSource from "./data-source";

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.error("BUGO AQ PARCERO, NAO CONSEGUI CONECTA NO BANCO", err);
  });

  app.listen(3000, () => {
    console.log("TA RODANDO NA PORTA 3000 IRMÃO");
  });
})();
