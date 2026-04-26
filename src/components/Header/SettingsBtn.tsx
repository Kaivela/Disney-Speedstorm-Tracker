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
            <select id="selectTheme"></select>

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
