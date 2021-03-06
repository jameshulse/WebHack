require('xterm/dist/xterm.css');
require('normalize.css');
require('./site.css');

const Terminal = require('./core/terminal');

const terminal = new Terminal(onCommand);

const scenario = require('./scenarios/helloworld'); // TODO: Dynamic somehow..?

const commands = require('./commands');

let currentDirectory = ['var'];
let directoryStructure = scenario.getDirectoryStructure();

function onCommand(input) {
    let parts = input.split(' ');
    let command = parts[0];

    switch (command) {
        case '':
            break;
        case 'pwd':
            terminal.writeLine(`/${currentDirectory.join('/')}`);
            break;
        case 'cd':
            if (parts[1] === '..') {
                currentDirectory.pop();
            } else if(parts[1] === '.') {
                break;
            } else if (directoryExists(parts[1])) {
                currentDirectory.push(parts[1]);
            }
            break;
        default:
            terminal.writeLine(`Command not found: ${command}`);
    }

    acceptCommand();
}

function acceptCommand() {
    terminal.write(`root> /${currentDirectory.join('/')} # `);
}

terminal.writeLines(scenario.getIntro());

acceptCommand();

if (module.hot) {
    module.hot.accept();
}