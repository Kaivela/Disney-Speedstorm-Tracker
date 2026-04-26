import { useContext, useState } from 'react';
import Modal from '../Modal';
import { AppContext } from '../../context/AppContext';
import type { SettingsSaved } from '../../types/types';

export function SettingsBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings } = useContext(AppContext);

  function saveSettings(newSettings: Partial<SettingsSaved>) {
    updateSettings({ ...settings, ...newSettings });
  }

  return (
    <>
      <button className="SettingsBtn" onClick={() => setIsOpen(true)}>
        <img src="img\settings.svg" width="30px" />
      </button>
      <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <div className="settingsPanel">
          <div className="settings">
            <button className="close-settings-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>

            <h2 data-trad="settings">SETTINGS</h2>
            <span></span>

            <label htmlFor="trad_button" data-trad="change_lang">
              Lang
            </label>
            <span className="lang-btn-group">
              <button>EN</button>
              <button>FR</button>
            </span>

            <label htmlFor="darkMode" data-trad="dark_mode">
              SasukeDarkShadowKiller
            </label>
            <input id="darkMode" type="checkbox" />

            <label htmlFor="transparantTable" data-trad="transparant_table">
              Transparant ?
            </label>
            <input id="transparant_table" type="checkbox" />

            <label htmlFor="buttonGoal" data-trad="change_goal">
              MPL Goal
            </label>
            <input
              type="number"
              defaultValue={settings.MPLGoal}
              onChange={(event) => saveSettings({ MPLGoal: Number(event.currentTarget.value) })}
              min="0"
              max="40"
              required
            />

            <label htmlFor="starGoal" data-trad="change_level_goal">
              Star Goal
            </label>
            <input
              type="number"
              defaultValue={settings.starGoal}
              onChange={(event) => saveSettings({ starGoal: Number(event.currentTarget.value) })}
              min="0"
              max="6"
              required
            />

            <label htmlFor="superChargeLevelGoal" data-trad="change_level_goal">
              SuperCharge Level Goal
            </label>
            <input
              type="number"
              defaultValue={settings.superChargeLevelGoal}
              onChange={(event) => saveSettings({ superChargeLevelGoal: Number(event.currentTarget.value) })}
              min="0"
              max="2"
              required
            />

            <label htmlFor="selectTheme" data-trad="set_up_background">
              Select theme
            </label>
            <select defaultValue={settings.theme} onChange={(event) => saveSettings({ theme: event.currentTarget.value })}>
              <option value="1">Saison 1 : Monstres Et Compagnies</option>
              <option value="2">Saison 2 : Toy's Story</option>
              <option value="3">Saison 3 : Lilo Et Stitch</option>
              <option value="4">Saison 4 : Aladdin</option>
              <option value="5">Saison 5 : La Reine Des Neiges</option>
              <option value="6">Saison 6 : La Petite Sirène</option>
              <option value="7">Saison 7 : Les Mondes De Ralph</option>
              <option value="8">Saison 8 : Vice-Versa</option>
              <option value="9">Saison 9 : Pirates Des Caraïbes</option>
              <option value="10">Saison 10 : L'Étrange Noël De Monsieur Jack</option>
              <option value="11">Saison 11 : Les Indestructibles</option>
              <option value="11alt">Saison 11 Alt : Les Indestructibles</option>
              <option value="12">Saison 12 : Tron</option>
              <option value="13">Saison 13 : Les Nouveaux Héros</option>
              <option value="14">Saison 14 : Toy Story</option>
              <option value="15">Saison 15 : Alice Au Pays Des Merveilles</option>
              <option value="16">Saison 16 : Winnie L'Ourson</option>
              <option value="17">Saison 17 : Zootopie</option>
              <option value="18">Saison 18 : Cars</option>
              <option value="19">Saison 19 : Villains</option>
            </select>

            <label htmlFor="hideColumn">Hide Colmun</label>
            <details className="center-html">
              <summary>Détails</summary>
              Quelque chose d'assez discret pour passer inaperçu.
            </details>
          </div>
          <span>
            The character images used in this are purely for entertainment and informational purposes.
            <br />
            No ownership is claimed upon the images used, and no copyright infringement is intended.
            <br />
            All rights go to their respective owners.
          </span>
        </div>
      </Modal>
    </>
  );
}
