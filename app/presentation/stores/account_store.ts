import { productLocalDataSource } from "@/app/data/datasources/products_local_data_source";
import { makeAutoObservable } from "mobx";

export class AccountStore {
  lang: string | null = "";
  constructor() {
    makeAutoObservable(this);
  }
  setCurrentLang = async (lang: string) => {
    await productLocalDataSource.setCurrentLang(lang);
  };

  fetchCurrentLang = async () => {
    this.lang = await productLocalDataSource.getCurrentLang();
  };
}
