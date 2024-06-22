import { productLocalDataSource } from "@/app/data/datasources/products_local_data_source";
import { makeAutoObservable, runInAction } from "mobx";

export class AccountStore {
  lang: string | null = "";
  constructor() {
    makeAutoObservable(this);
  }
  setCurrentLang = async (lang: string) => {
    await productLocalDataSource.setCurrentLang(lang);
    this.setLang(lang);
  };

  fetchCurrentLang = async () => {
    const lang = await productLocalDataSource.getCurrentLang();
    this.setLang(lang);
  };

  setLang = (lang: string | null) => {
    runInAction(() => {
      this.lang = lang;
    });
  };
}
