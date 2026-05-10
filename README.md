# Disney Speedstorm Tracker 🏎️

A comprehensive and modern tracking tool to manage your progression in **Disney Speedstorm**. Track your racers and crews, plan your evolution, and optimize your resources.

## 🎯 Key Features

### 📊 Character Management

- **Racer Mode** : Detailed tracking of each racer with :
  - Current and target star levels
  - Shards needed for upgrades
  - Multi Player League (MPL) and rewards
  - Supercharge tokens
  - Rarity and Class

- **Crew Mode** : Crew management with :
  - Shards and upgrades
  - Star levels
  - Associated collections

### 🔍 Advanced Filtering and Sorting

- Filter by :
  - Character name
  - Release season
  - Collection
  - Rarity
  - Racer classes
  - Universal box
  - Upgrade status

- Sort numeric columns in ascending/descending order

### 💾 Data Management

- **Export** : Download your data in JSON format
- **Import** : Restore your previous backups
- **Local Storage** : Automatic persistence in your browser

### 🌍 Multilingual Support

- Support for **French** and **English**
- Automatic system language detection
- Language switching in settings

### 🎨 Customizable Interface

- **Themes** : Adapt the appearance to each season's theme
- **Transparent Mode** : Customize background transparency
- **Responsive** : Compatible with different screen sizes [not yet]

### 📈 Account Statistics

- Overview of your overall progression
- Summary of resources and objectives

## 🛠️ Technologies Used

- **Frontend** :
  - React 19
  - TypeScript
  - Vite (build tool)
  - Tailwind CSS + TailwindCSS/Vite
  - Skeleton UI (components)

- **Internationalization** :
  - i18next
  - react-i18next
  - i18next-browser-languagedetector

- **Code Quality** :
  - ESLint
  - Prettier
  - Vitest (testing)

## 💡 User Guide

- Use the selector at the top to switch between "Racer" and "Crew".

- Filter Your Data
  - Use the filter fields at the top of the table
  - All filters are cumulative

- Edit a Racer/Crew
  - Click the "Edit" button on the relevant row
  - Update the values
  - Confirm to save

- Backup and Restore
  - Export : Click the export button to download your data
  - Import : Click the import button to load a previous backup

- Settings
  - Click the settings icon to customize :
    - Language
    - Season theme
    - Interface transparency
    - Columns display

## 📝 Developer Notes

- Data is stored locally in your browser (localStorage)
- Shards needed are calculated automatically
- MPL rewards vary depending on the racer's release season
- Automatic migration of old backups (refresh page with Ctrl+R if needed)

## 🐛 Report a Bug

If you find a bug :

1. Check your version
2. Refresh the page (Ctrl+R)
3. Clear your browser cache if the issue persists
4. Report the issue on the repository or directly on the discord channel related

## 🤝 Contributing

Contributions are welcome ! Feel free to :

- Report bugs
- Suggest new features
- Propose code improvements

Have fun tracking your progression in Disney Speedstorm ! 🏆
