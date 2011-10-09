const GLib = imports.gi.GLib;
const St = imports.gi.St;

const ExtensionSystem = imports.ui.extensionSystem;
const Panel = imports.ui.panel;
const PanelMenu = imports.ui.panelMenu;

function Feeds() {
    this._init.apply(this, arguments);
}

Feeds.prototype = {
    __proto__: PanelMenu.SystemStatusButton.prototype,

    // {{{ initialize variables
    _menuType:  "icon",
    _menuIcon:  null,
    _menuLabel: null,
    // }}}

    _init: function() {
        PanelMenu.SystemStatusButton.prototype._init.call(this, '', 'Feed Reader');

        this._initConfig();
        this._initMenu();
    },

    _initConfig: function() {
        let ext       = ExtensionSystem.extensionMeta['feeds@mneudert.github.com'];
        let extConfig = ext.path + '/config.json';

        if (GLib.file_test(extConfig, 1<<4)) {
            let config = JSON.parse(GLib.file_get_contents(extConfig)[1]);

            if (config.menuType
                && ("icon" == config.menuType || "text" == config.menuType)
            ) {
                this._menuType = config.menuType;
            }
        }
    },

    _initMenu: function() {
        if ("icon" == this._menuType) {
            this._menuIcon  = new St.Icon({icon_type: St.IconType.FULLCOLOR,
                                           icon_name: "application-rss+xml",
                                           style_class: "system-status-icon"});

            this.actor.add_actor(this._menuIcon);
        } else {
            this._menuLabel = new St.Label({text: 'Feeds'});

            this.actor.add_actor(this._menuLabel);
        }
    }
}

function main() {
    Panel.STANDARD_TRAY_ICON_ORDER.unshift('feeds');
    Panel.STANDARD_TRAY_ICON_SHELL_IMPLEMENTATION['feeds'] = Feeds;
}
