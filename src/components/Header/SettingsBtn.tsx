import { useContext, useState } from 'react';
import Modal from '../Modal';
import { AppContext } from '../../context/AppContext';
import type { SettingsSaved } from '../../types/types';

export function SettingsBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, setSettings } = useContext(AppContext);

  function saveSettings(newSettings: Partial<SettingsSaved>) {
    setSettings({ ...settings, ...newSettings });
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
            <select onChange={(event) => saveSettings({ MPLGoal: Number(event.currentTarget.value) })}>
              <option value="6">6</option>
              <option value="11">11</option>
              <option value="16">16</option>
              <option value="21">21</option>
              <option value="26">26</option>
              <option value="31">31</option>
              <option value="36">36</option>
              <option value="40">40</option>
            </select>

            <label htmlFor="levelGoal" data-trad="change_level_goal">
              Star Goal
            </label>
            <select></select>

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
