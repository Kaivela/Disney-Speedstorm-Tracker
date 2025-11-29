import { Pilot, Crew, Settings } from "./types";

export class StorageService {
    private static instance: StorageService;

    private constructor() { }

    public static getInstance(): StorageService {
        if (!StorageService.instance) {
            StorageService.instance = new StorageService();
        }
        return StorageService.instance;
    }

    public getPilots(): Pilot[] {
        const pilotsStr = localStorage.getItem("pilots");
        return pilotsStr ? JSON.parse(pilotsStr) : [];
    }

    public savePilots(pilots: Pilot[]): void {
        localStorage.setItem("pilots", JSON.stringify(pilots));
    }

    public getCrews(): Crew[] {
        const crewsStr = localStorage.getItem("crews");
        return crewsStr ? JSON.parse(crewsStr) : [];
    }

    public saveCrews(crews: Crew[]): void {
        localStorage.setItem("crews", JSON.stringify(crews));
    }

    public getSettings(): Settings {
        const settingsStr = localStorage.getItem("settings");
        return settingsStr ? JSON.parse(settingsStr) : {};
    }

    public saveSettings(settings: Settings): void {
        localStorage.setItem("settings", JSON.stringify(settings));
    }

    public getTheme(): string {
        return localStorage.getItem("theme") || "";
    }

    public saveTheme(theme: string): void {
        localStorage.setItem("theme", theme);
    }
}
