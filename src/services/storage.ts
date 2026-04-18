import type { IRacer, ICrew, ISettings } from '../types/types';

const racersKey = 'racers';
const crewsKey = 'crews';
const settingsKey = 'settings';

export class StorageService {
  private static instance: StorageService;

  private constructor() {}

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  public getRacers(): IRacer[] {
    const racers = localStorage.getItem(racersKey);
    return racers ? JSON.parse(racers) : [];
  }

  public saveRacers(racers: IRacer[]): void {
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
