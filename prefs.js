'use strict';


const {Adw, Gio, GLib, Gtk} = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();


function init() {
}


function fillPreferencesWindow(window) {
    const settings = ExtensionUtils.getSettings();

    const page = new Adw.PreferencesPage();
    const group = new Adw.PreferencesGroup();
    page.add(group);

    // Enter Command
    const rowCom = new Adw.ActionRow({
        title: 'Enter Command',
        subtitle: 'Shell Expansion is not supported',
    });
    group.add(rowCom);

    const entry = new Gtk.Entry({
        placeholder_text: 'bash example.sh',
        text: settings.get_string('command'),
        valign: Gtk.Align.CENTER,
        hexpand: true,
    });

    rowCom.add_suffix(entry);
    rowCom.activatable_widget = entry;

    settings.bind(
        'command',
        entry,
        'text',
        Gio.SettingsBindFlags.DEFAULT
    );

    // Enable Logs
    const rowLog = new Adw.ActionRow({
        title: 'Enable Log',
        subtitle: `${GLib.get_home_dir()}/.${Me.metadata.name}.log`,
    });
    group.add(rowLog);

    const toggleLog = new Gtk.Switch({
        active: settings.get_boolean('logging'),
        valign: Gtk.Align.CENTER,
    });

    settings.bind(
        'logging',
        toggleLog,
        'active',
        Gio.SettingsBindFlags.DEFAULT
    );

    rowLog.add_suffix(toggleLog);
    rowLog.activatable_widget = toggleLog;

    // Notify
    const rowNotify = new Adw.ActionRow({
        title: 'Notify',
        subtitle: 'Show a notification on command completion',
    });
    group.add(rowNotify);

    const toggleNotify = new Gtk.Switch({
        active: settings.get_boolean('notify'),
        valign: Gtk.Align.CENTER,
    });

    settings.bind(
        'notify',
        toggleNotify,
        'active',
        Gio.SettingsBindFlags.DEFAULT
    );

    rowNotify.add_suffix(toggleNotify);
    rowNotify.activatable_widget = toggleNotify;

    window.add(page);
}