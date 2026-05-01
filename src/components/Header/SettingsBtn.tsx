import { useContext, useState } from 'react';
import Modal from '../Modal';
import { AppContext } from '../../context/AppContext';
import type { SettingsSaved } from '../../types/types';
import SettingsSvg from '../../img/settings.svg?react';
import { ToggleGroup } from '@skeletonlabs/skeleton-react';
import { useTranslation } from 'react-i18next';

export function SettingsBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings } = useContext(AppContext);
  const { t, i18n } = useTranslation();

  function saveSettings(newSettings: Partial<SettingsSaved>) {
    updateSettings({ ...settings, ...newSettings });
  }

  return (
    <>
      <button
        className="duration-100 fixed top-3 right-3 bg-black/50 rounded-full p-2 hover:scale-[1.1] transition-scale"
        onClick={() => setIsOpen(true)}>
        <SettingsSvg width="30px" height="30px" />
      </button>
      <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <div>
          <div className="settings gap-4">
            <h2 className="h4" data-trad="settings">
              {t('settings.SETTINGS')}
            </h2>
            <span></span>

            <label htmlFor="trad_button" data-trad="change_lang">
              {t('settings.lang')}
            </label>

            <ToggleGroup value={[settings.lang]} className="bg-black/20 backdrop-blur-xs w-min">
              <ToggleGroup.Item
                className="px-10 py-2 aspect-auto"
                value="en"
                onClick={() => {
                  saveSettings({ lang: 'en' });
                  i18n.changeLanguage('en');
                }}>
                EN
              </ToggleGroup.Item>
              <ToggleGroup.Item
                className="px-10 py-2 aspect-auto"
                value="fr"
                onClick={() => {
                  saveSettings({ lang: 'fr' });
                  i18n.changeLanguage('fr');
                }}>
                FR
              </ToggleGroup.Item>
            </ToggleGroup>

            <label htmlFor="darkMode" data-trad="dark_mode">
              {t('settings.dark')}
            </label>
            <input type="checkbox" className="checkbox" />

            <label htmlFor="transparantTable" data-trad="transparant_table">
              {t('settings.dark')}
            </label>
            <input
              className="checkbox"
              defaultChecked={settings.transparent}
              onChange={(event) => saveSettings({ transparent: event.currentTarget.checked })}
              type="checkbox"
            />

            <label htmlFor="buttonGoal" data-trad="change_goal">
              {t('settings.MPLGoal')}
            </label>
            <input
              className="input"
              type="number"
              defaultValue={settings.MPLGoal}
              onChange={(event) => saveSettings({ MPLGoal: Number(event.currentTarget.value) })}
              min="0"
              max="40"
              required
            />

            <label htmlFor="starGoal" data-trad="change_level_goal">
              {t('settings.starGoal')}
            </label>
            <input
              className="input"
              type="number"
              defaultValue={settings.starGoal}
              onChange={(event) => saveSettings({ starGoal: Number(event.currentTarget.value) })}
              min="0"
              max="6"
              required
            />

            <label htmlFor="superChargeLevelGoal" data-trad="change_level_goal">
              {t('settings.superChargeGoal')}
            </label>
            <input
              className="input"
              type="number"
              defaultValue={settings.superChargeLevelGoal}
              onChange={(event) => saveSettings({ superChargeLevelGoal: Number(event.currentTarget.value) })}
              min="0"
              max="2"
              required
            />

            <label htmlFor="selectTheme" data-trad="set_up_background">
              {t('settings.selectTheme')}
            </label>
            <select className="input " defaultValue={settings.theme} onChange={(event) => saveSettings({ theme: event.currentTarget.value })}>
              <option value="1">{t('theme.S1')}</option>
              <option value="2">{t('theme.S2')}</option>
              <option value="3">{t('theme.S3')}</option>
              <option value="4">{t('theme.S4')}</option>
              <option value="5">{t('theme.S5')}</option>
              <option value="6">{t('theme.S6')}</option>
              <option value="7">{t('theme.S7')}</option>
              <option value="8">{t('theme.S8')}</option>
              <option value="9">{t('theme.S9')}</option>
              <option value="10">{t('theme.S10')}</option>
              <option value="11">{t('theme.S11')}</option>
              <option value="11alt">{t('theme.S11alt')}</option>
              <option value="12">{t('theme.S12')}</option>
              <option value="13">{t('theme.S13')}</option>
              <option value="14">{t('theme.S14')}</option>
              <option value="15">{t('theme.S15')}</option>
              <option value="16">{t('theme.S16')}</option>
              <option value="17">{t('theme.S17')}</option>
              <option value="18">{t('theme.S18')}</option>
              <option value="19">{t('theme.S19')}</option>
            </select>
          </div>
          <details>
            <summary className="p-3 border my-4 cursor-pointer rounded-md">{t('settings.showRacerColumn')}</summary>
            <div className="details-options">
              <label className={settings.showRacerColumn.releaseSeason ? 'columnShown' : ''}>
                {t('showColumn.season')}
                <input
                  defaultChecked={settings.showRacerColumn.releaseSeason}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, releaseSeason: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.image ? 'columnShown' : ''}>
                {t('showColumn.image')}
                <input
                  defaultChecked={settings.showRacerColumn.image}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, image: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.collection ? 'columnShown' : ''}>
                {t('showColumn.collection')}
                <input
                  defaultChecked={settings.showRacerColumn.collection}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, collection: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.rarity ? 'columnShown' : ''}>
                {t('showColumn.rarity')}
                <input
                  defaultChecked={settings.showRacerColumn.rarity}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, rarity: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.role ? 'columnShown' : ''}>
                {t('showColumn.role')}
                <input
                  defaultChecked={settings.showRacerColumn.role}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, role: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.name ? 'columnShown' : ''}>
                {t('showColumn.name')}
                <input
                  defaultChecked={settings.showRacerColumn.name}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, name: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.currentStars ? 'columnShown' : ''}>
                {t('showColumn.currentStars')}
                <input
                  defaultChecked={settings.showRacerColumn.currentStars}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, currentStars: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.currentStarFragment ? 'columnShown' : ''}>
                {t('showColumn.currentStarFragment')}
                <input
                  defaultChecked={settings.showRacerColumn.currentStarFragment}
                  className="hidden"
                  onChange={(event) =>
                    saveSettings({ showRacerColumn: { ...settings.showRacerColumn, currentStarFragment: event.currentTarget.checked } })
                  }
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.currentSuperChargeLevel ? 'columnShown' : ''}>
                {t('showColumn.superChargeLevel')}
                <input
                  defaultChecked={settings.showRacerColumn.currentSuperChargeLevel}
                  className="hidden"
                  onChange={(event) =>
                    saveSettings({ showRacerColumn: { ...settings.showRacerColumn, currentSuperChargeLevel: event.currentTarget.checked } })
                  }
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.currentShards ? 'columnShown' : ''}>
                {t('showColumn.currentShards')}
                <input
                  defaultChecked={settings.showRacerColumn.currentShards}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, currentShards: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.currentSuperChargeTokens ? 'columnShown' : ''}>
                {t('showColumn.currentSuperChargeTokens')}
                <input
                  defaultChecked={settings.showRacerColumn.currentSuperChargeTokens}
                  className="hidden"
                  onChange={(event) =>
                    saveSettings({ showRacerColumn: { ...settings.showRacerColumn, currentSuperChargeTokens: event.currentTarget.checked } })
                  }
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.currentMPL ? 'columnShown' : ''}>
                {t('showColumn.currentMPL')}
                <input
                  defaultChecked={settings.showRacerColumn.currentMPL}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, currentMPL: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.highestMPL ? 'columnShown' : ''}>
                {t('showColumn.highestMPL')}
                <input
                  defaultChecked={settings.showRacerColumn.highestMPL}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, highestMPL: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.maxMPL ? 'columnShown' : ''}>
                {t('showColumn.maxMPL')}
                <input
                  defaultChecked={settings.showRacerColumn.maxMPL}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, maxMPL: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.shardsNeededToMax ? 'columnShown' : ''}>
                {t('showColumn.shardsNeeded')}
                <input
                  defaultChecked={settings.showRacerColumn.shardsNeededToMax}
                  className="hidden"
                  onChange={(event) =>
                    saveSettings({ showRacerColumn: { ...settings.showRacerColumn, shardsNeededToMax: event.currentTarget.checked } })
                  }
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.shardsToGetInMPL ? 'columnShown' : ''}>
                {t('showColumn.shardsInMPL')}
                <input
                  defaultChecked={settings.showRacerColumn.shardsToGetInMPL}
                  className="hidden"
                  onChange={(event) =>
                    saveSettings({ showRacerColumn: { ...settings.showRacerColumn, shardsToGetInMPL: event.currentTarget.checked } })
                  }
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.superChargeTokensNeeded ? 'columnShown' : ''}>
                {t('showColumn.superChargeTokensNeeded')}
                <input
                  defaultChecked={settings.showRacerColumn.superChargeTokensNeeded}
                  className="hidden"
                  onChange={(event) =>
                    saveSettings({ showRacerColumn: { ...settings.showRacerColumn, superChargeTokensNeeded: event.currentTarget.checked } })
                  }
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.tuneCoinsNeededToMax ? 'columnShown' : ''}>
                {t('showColumn.tuneCoinsNeeded')}
                <input
                  defaultChecked={settings.showRacerColumn.tuneCoinsNeededToMax}
                  className="hidden"
                  onChange={(event) =>
                    saveSettings({ showRacerColumn: { ...settings.showRacerColumn, tuneCoinsNeededToMax: event.currentTarget.checked } })
                  }
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.free ? 'columnShown' : ''}>
                {t('showColumn.free')}
                <input
                  defaultChecked={settings.showRacerColumn.free}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, free: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.shardsNeededToNextStar ? 'columnShown' : ''}>
                {t('showColumn.shardsNext')}
                <input
                  defaultChecked={settings.showRacerColumn.shardsNeededToNextStar}
                  className="hidden"
                  onChange={(event) =>
                    saveSettings({ showRacerColumn: { ...settings.showRacerColumn, shardsNeededToNextStar: event.currentTarget.checked } })
                  }
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.tuneCoinsNeededToNextStar ? 'columnShown' : ''}>
                {t('showColumn.tuneCoinsNext')}
                <input
                  defaultChecked={settings.showRacerColumn.tuneCoinsNeededToNextStar}
                  className="hidden"
                  onChange={(event) =>
                    saveSettings({ showRacerColumn: { ...settings.showRacerColumn, tuneCoinsNeededToNextStar: event.currentTarget.checked } })
                  }
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.shardsNeededIfMaxMPL ? 'columnShown' : ''}>
                {t('showColumn.shardsIfMaxMPL')}
                <input
                  defaultChecked={settings.showRacerColumn.shardsNeededIfMaxMPL}
                  className="hidden"
                  onChange={(event) =>
                    saveSettings({ showRacerColumn: { ...settings.showRacerColumn, shardsNeededIfMaxMPL: event.currentTarget.checked } })
                  }
                  type="checkbox"
                />
              </label>
            </div>
          </details>
          <details className="mt-4">
            <summary className="p-3 border mb-4 cursor-pointer rounded-md">{t('settings.showCrewColumn')}</summary>
            <div className="details-options">
              <label className={settings.showCrewColumn.releaseSeason ? 'columnShown' : ''}>
                {t('showColumn.season')}
                <input
                  defaultChecked={settings.showCrewColumn.releaseSeason}
                  className="hidden"
                  onChange={(event) => saveSettings({ showCrewColumn: { ...settings.showCrewColumn, releaseSeason: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showCrewColumn.exclusive ? 'columnShown' : ''}>
                {t('showColumn.exclusiveTo')}
                <input
                  defaultChecked={settings.showCrewColumn.exclusive}
                  className="hidden"
                  onChange={(event) => saveSettings({ showCrewColumn: { ...settings.showCrewColumn, exclusive: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showCrewColumn.image ? 'columnShown' : ''}>
                {t('showColumn.image')}
                <input
                  defaultChecked={settings.showCrewColumn.image}
                  className="hidden"
                  onChange={(event) => saveSettings({ showCrewColumn: { ...settings.showCrewColumn, image: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showCrewColumn.collection ? 'columnShown' : ''}>
                {t('showColumn.collection')}
                <input
                  defaultChecked={settings.showCrewColumn.collection}
                  className="hidden"
                  onChange={(event) => saveSettings({ showCrewColumn: { ...settings.showCrewColumn, collection: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showCrewColumn.rarity ? 'columnShown' : ''}>
                {t('showColumn.rarity')}
                <input
                  defaultChecked={settings.showCrewColumn.rarity}
                  className="hidden"
                  onChange={(event) => saveSettings({ showCrewColumn: { ...settings.showCrewColumn, rarity: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showCrewColumn.name ? 'columnShown' : ''}>
                {t('showColumn.name')}
                <input
                  defaultChecked={settings.showCrewColumn.name}
                  className="hidden"
                  onChange={(event) => saveSettings({ showCrewColumn: { ...settings.showCrewColumn, name: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showCrewColumn.currentStars ? 'columnShown' : ''}>
                {t('showColumn.currentStars')}
                <input
                  defaultChecked={settings.showCrewColumn.currentStars}
                  className="hidden"
                  onChange={(event) => saveSettings({ showCrewColumn: { ...settings.showCrewColumn, currentStars: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showCrewColumn.currentShards ? 'columnShown' : ''}>
                {t('showColumn.currentShards')}
                <input
                  defaultChecked={settings.showCrewColumn.currentShards}
                  className="hidden"
                  onChange={(event) => saveSettings({ showCrewColumn: { ...settings.showCrewColumn, currentShards: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showCrewColumn.shardsNeededToMax ? 'columnShown' : ''}>
                {t('showColumn.shardsNeeded')}
                <input
                  defaultChecked={settings.showCrewColumn.shardsNeededToMax}
                  className="hidden"
                  onChange={(event) =>
                    saveSettings({ showCrewColumn: { ...settings.showCrewColumn, shardsNeededToMax: event.currentTarget.checked } })
                  }
                  type="checkbox"
                />
              </label>
              <label className={settings.showCrewColumn.free ? 'columnShown' : ''}>
                {t('showColumn.free')}
                <input
                  defaultChecked={settings.showCrewColumn.free}
                  className="hidden"
                  onChange={(event) => saveSettings({ showCrewColumn: { ...settings.showCrewColumn, free: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
            </div>
          </details>
          <div className="mt-7.5">
            The character images used in this are purely for entertainment and informational purposes.
            <br />
            No ownership is claimed upon the images used, and no copyright infringement is intended.
            <br />
            All rights go to their respective owners.
          </div>
        </div>
      </Modal>
    </>
  );
}
