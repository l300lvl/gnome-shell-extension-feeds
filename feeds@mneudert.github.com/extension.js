const St = imports.gi.St;

const Panel = imports.ui.panel;
const PanelMenu = imports.ui.panelMenu;

function Feeds() {
    this._init.apply(this, arguments);
}

Feeds.prototype = {
    __proto__: PanelMenu.SystemStatusButton.prototype,

    _init: function() {
        PanelMenu.SystemStatusButton.prototype._init.call(this, '', 'Feed Reader');

        this._initMenu();
    },

    _initMenu: function() {
        this._menuLabel = new St.Label({text: 'Feeds'});

        this.actor.add_actor(this._menuLabel);
    }
}

function main() {
    Panel.STANDARD_TRAY_ICON_ORDER.unshift('feeds');
    Panel.STANDARD_TRAY_ICON_SHELL_IMPLEMENTATION['feeds'] = Feeds;
}
