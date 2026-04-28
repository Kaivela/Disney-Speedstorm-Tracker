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
              Dark Mode (Work In Progress):
            </label>
            <input id="darkMode" type="checkbox" />

            <label htmlFor="transparantTable" data-trad="transparant_table">
              Transparancy :
            </label>
            <input
              defaultChecked={settings.transparent}
              onChange={(event) => saveSettings({ transparent: event.currentTarget.checked })}
              type="checkbox"
            />

            <label htmlFor="buttonGoal" data-trad="change_goal">
              MPL Goal :
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
              Star Goal :
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
              SuperCharge Level Goal :
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
              Select theme :
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
          </div>
          <details>
            <summary>Show Racer Column</summary>
            <div className="details-options">
              <label className={settings.showRacerColumn.releaseSeason ? 'columnShown' : ''}>
                Season
                <input
                  defaultChecked={settings.showRacerColumn.releaseSeason}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, releaseSeason: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.image ? 'columnShown' : ''}>
                Image
                <input
                  defaultChecked={settings.showRacerColumn.image}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, image: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.collection ? 'columnShown' : ''}>
                Collection
                <input
                  defaultChecked={settings.showRacerColumn.collection}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, collection: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.rarity ? 'columnShown' : ''}>
                Rarity
                <input
                  defaultChecked={settings.showRacerColumn.rarity}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, rarity: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.role ? 'columnShown' : ''}>
                Role
                <input
                  defaultChecked={settings.showRacerColumn.role}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, role: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.name ? 'columnShown' : ''}>
                Name
                <input
                  defaultChecked={settings.showRacerColumn.name}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, name: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.currentStars ? 'columnShown' : ''}>
                currentStars
                <input
                  defaultChecked={settings.showRacerColumn.currentStars}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, currentStars: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.currentStarFragment ? 'columnShown' : ''}>
                currentStarFragment
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
                superChargeLevel
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
                currentShards
                <input
                  defaultChecked={settings.showRacerColumn.currentShards}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, currentShards: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.currentSuperChargeTokens ? 'columnShown' : ''}>
                currentSuperChargeTokens
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
                currentMPL
                <input
                  defaultChecked={settings.showRacerColumn.currentMPL}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, currentMPL: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.highestMPL ? 'columnShown' : ''}>
                highestMPL
                <input
                  defaultChecked={settings.showRacerColumn.highestMPL}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, highestMPL: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.maxMPL ? 'columnShown' : ''}>
                maxMPL
                <input
                  defaultChecked={settings.showRacerColumn.maxMPL}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, maxMPL: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.shardsNeededToMax ? 'columnShown' : ''}>
                shardsNeeded
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
                shardsInMPL
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
                superChargeTokensNeeded
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
                tuneCoinsNeeded
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
                free
                <input
                  defaultChecked={settings.showRacerColumn.free}
                  className="hidden"
                  onChange={(event) => saveSettings({ showRacerColumn: { ...settings.showRacerColumn, free: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showRacerColumn.shardsNeededToNextStar ? 'columnShown' : ''}>
                shardsNextStar
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
                tuneCoinsToNextStar
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
                shardsIfMaxMPL
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
          <details>
            <summary>Show Crew Column</summary>
            <div className="details-options">
              <label className={settings.showCrewColumn.releaseSeason ? 'columnShown' : ''}>
                Season
                <input
                  defaultChecked={settings.showCrewColumn.releaseSeason}
                  className="hidden"
                  onChange={(event) => saveSettings({ showCrewColumn: { ...settings.showCrewColumn, releaseSeason: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showCrewColumn.exclusive ? 'columnShown' : ''}>
                Exclusive
                <input
                  defaultChecked={settings.showCrewColumn.exclusive}
                  className="hidden"
                  onChange={(event) => saveSettings({ showCrewColumn: { ...settings.showCrewColumn, exclusive: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showCrewColumn.image ? 'columnShown' : ''}>
                Image
                <input
                  defaultChecked={settings.showCrewColumn.image}
                  className="hidden"
                  onChange={(event) => saveSettings({ showCrewColumn: { ...settings.showCrewColumn, image: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showCrewColumn.collection ? 'columnShown' : ''}>
                Collection
                <input
                  defaultChecked={settings.showCrewColumn.collection}
                  className="hidden"
                  onChange={(event) => saveSettings({ showCrewColumn: { ...settings.showCrewColumn, collection: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showCrewColumn.rarity ? 'columnShown' : ''}>
                Rarity
                <input
                  defaultChecked={settings.showCrewColumn.rarity}
                  className="hidden"
                  onChange={(event) => saveSettings({ showCrewColumn: { ...settings.showCrewColumn, rarity: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showCrewColumn.name ? 'columnShown' : ''}>
                Name
                <input
                  defaultChecked={settings.showCrewColumn.name}
                  className="hidden"
                  onChange={(event) => saveSettings({ showCrewColumn: { ...settings.showCrewColumn, name: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showCrewColumn.currentStars ? 'columnShown' : ''}>
                Level
                <input
                  defaultChecked={settings.showCrewColumn.currentStars}
                  className="hidden"
                  onChange={(event) => saveSettings({ showCrewColumn: { ...settings.showCrewColumn, currentStars: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showCrewColumn.currentShards ? 'columnShown' : ''}>
                currentShards
                <input
                  defaultChecked={settings.showCrewColumn.currentShards}
                  className="hidden"
                  onChange={(event) => saveSettings({ showCrewColumn: { ...settings.showCrewColumn, currentShards: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
              <label className={settings.showCrewColumn.shardsNeededToMax ? 'columnShown' : ''}>
                shardsNeeded
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
                free
                <input
                  defaultChecked={settings.showCrewColumn.free}
                  className="hidden"
                  onChange={(event) => saveSettings({ showCrewColumn: { ...settings.showCrewColumn, free: event.currentTarget.checked } })}
                  type="checkbox"
                />
              </label>
            </div>
          </details>
          <div style={{ marginTop: '30px' }}>
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
