import productRepository from "@/app/data/repositoryimpl/product_repository_impl";
import { makeAutoObservable, runInAction } from "mobx";

export class AccountStore {
  lang: string | null = "";
  constructor() {
    makeAutoObservable(this);
  }
  setCurrentLang = async (lang: string) => {
    await productRepository.setCurrentLang(lang);
    this.setLang(lang);
  };

  fetchCurrentLang = async () => {
    const lang = await this.getCurrentLang();
    this.setLang(lang);
  };

  getCurrentLang = async () => {
    return await productRepository.getCurrentLang();
  };

  setLang = (lang: string | null) => {
    runInAction(() => {
      this.lang = lang;
    });
  };
}
