To run this, do the following:

1. Do Code -> Download ZIP
2. Extract the contents somewhere.
3. Install Node.js on your system.
4. In thl_battlepositioneditor, open Command Prompt/terminal and execute "npm install" (install dependencies), then "npm run dev" (run program). This will tell you what url the tool will be hosted on.
5. Open a browser and navigate to the url.
6. Choose a file on your system, and upload. This will populate the program with that file's battle information.
7. To close the program, perform a CTRL+C on the command prompt/terminal that started the tool.



Currently, the tool has these functions:
* Set the bytes assigned to each map tile in Ground and Place. Bytes set to Ground define the playable area, while Place defines the positions of player-allied units.
* Wave and Wave_UI information can be viewed.
* Edited battle information can be downloaded as a new json file.
