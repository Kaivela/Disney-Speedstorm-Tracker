import type { ICrew, ISettings, RacerSaved } from '../types/types';
import { migrateLocalStorage } from './migration';

const racersKey = 'racers';
const crewsKey = 'crews';
const settingsKey = 'settings';

export class StorageService {
  private static instance: StorageService;

  private constructor() {}

  public static getInstance(): StorageService {
    migrateLocalStorage();
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  public getRacers(): RacerSaved[] {
    const racers = localStorage.getItem(racersKey);
    return racers ? JSON.parse(racers) : [];
  }

  public saveRacers(racers: RacerSaved[]): void {
    localStorage.setItem(racersKey, JSON.stringify(racers));
  }

  public getCrews(): ICrew[] {
    const crews = localStorage.getItem(crewsKey);
    return crews ? JSON.parse(crews) : [];
  }

  public saveCrews(crews: ICrew[]): void {
    localStorage.setItem(crewsKey, JSON.stringify(crews));
  }

  public getSettings(): ISettings {
    const settings = localStorage.getItem(settingsKey);
    return settings ? JSON.parse(settings) : {};
  }

  public saveSettings(settings: ISettings): void {
    localStorage.setItem(settingsKey, JSON.stringify(settings));
  }
}
