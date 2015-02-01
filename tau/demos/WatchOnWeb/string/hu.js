WatchOnSandbox( "STMS", function( m ) {
var STMS = m.STMS,
map = {
IDS_ST_BODY_VOLUME_M_SOUND_ABB: "Hangerő",
IDS_SR_BODY_AIR_CONDITIONER: "Klímaberendezés",
IDS_SR_BODY_AUSTRIA_M_COUNTRYNAME: "Ausztria",
IDS_SR_BODY_BELGIUM_M_COUNTRYNAME: "Belgium",
IDS_SR_BODY_CHINA_M_COUNTRYNAME: "Kína",
IDS_SR_BODY_DENMARK_M_COUNTRYNAME: "Dánia",
IDS_SR_BODY_FAN_SPEED_DOWN: "Lassabb ventilátor",
IDS_SR_BODY_FAN_SPEED_UP: "Gyorsabb ventilátor",
IDS_SR_BODY_FINLAND_M_COUNTRYNAME: "Finnország",
IDS_SR_BODY_FRANCE_M_COUNTRYNAME: "Franciao.",
IDS_SR_BODY_GERMANY_M_COUNTRYNAME: "Németország",
IDS_SR_BODY_IRELAND_M_COUNTRYNAME: "Írország",
IDS_SR_BODY_ITALY_M_COUNTRYNAME: "Olaszo.",
IDS_SR_BODY_LUXEMBOURG_M_COUNTRYNAME: "Luxembourg",
IDS_SR_BODY_MODE: "Mód",
IDS_SR_BODY_NORWAY_M_COUNTRYNAME: "Norvégia",
IDS_SR_BODY_POLAND_M_COUNTRYNAME: "Lengyelország",
IDS_SR_BODY_PORTUGAL_M_COUNTRYNAME: "Portugália",
IDS_SR_BODY_SET_UP: "Beállítás",
IDS_SR_BODY_SOUTH_KOREA_M_COUNTRYNAME: "Dél-Korea",
IDS_SR_BODY_SPAIN_M_COUNTRYNAME: "Spanyolország",
IDS_SR_BODY_SWEDEN_M_COUNTRYNAME: "Svédország",
IDS_SR_BODY_SWITZERLAND_M_COUNTRYNAME: "Svájc",
IDS_SR_BODY_UNITED_KINGDOM_M_COUNTRYNAME: "Egyesült Királyság",
IDS_SR_BODY_UNITED_STATES_OF_AMERICA_M_COUNTRYNAME: "Amerikai Egyesült Államok",
IDS_SR_BUTTON_BACK: "Vissza",
IDS_SR_BUTTON_CANCEL_ABB: "Mégse",
IDS_SR_BUTTON_DELETE: "Törlés",
IDS_SR_BUTTON_DONE: "Kész",
IDS_SR_BUTTON_EXIT: "Kilépés",
IDS_SR_BUTTON_INFO: "Infó",
IDS_SR_BUTTON_MENU: "Menü",
IDS_SR_BUTTON_MUTE: "Némít",
IDS_SR_BUTTON_OK: "OK",
IDS_SR_BUTTON_POWER: "En.gazd.",
IDS_SR_BUTTON_SELECT_YOUR_COUNTRY: "Válasszon országot",
IDS_SR_BUTTON_SELECT_YOUR_COUNTRY_REGION: "Ország/régió kiválasztása",
IDS_SR_BUTTON_SHOW_OTHER_BRANDS: "Egyéb márkák megjelenítése",
IDS_SR_BUTTON_SOURCE_T_SMART_REMOTE: "Forrás",
IDS_SR_BUTTON_TEMP_DOWN_M_TEMPERATURE: "Hidegebb",
IDS_SR_BUTTON_TEMP_UP_M_TEMPERATURE: "Melegebb",
IDS_SR_BUTTON_TV: "TV",
IDS_SR_BUTTON_YES: "Igen",
IDS_SR_HEADER_ALL_BRANDS: "Összes márka",
IDS_SR_HEADER_DELETE_ABB: "Töröl",
IDS_SR_HEADER_RESET: "Alaphelyzet",
IDS_SR_HEADER_WATCHON_M_APPLICATION: "WatchON",
IDS_SR_OPT_ADD_DEVICE_ABB: "Eszköz hozzáadása",
IDS_SR_OPT_STB_ABB: "STB",
IDS_YSM_POP_SET_UP_THE_REMOTE_CONTROL_ON_YOUR_DEVICE_Q: "Beállítja a távvezérlőt az eszközön?",
IDS_YSM_OPT_SHOW_ALL_BRANDS_ABB: "Össz. márka megjelenítése",
IDS_YSM_BUTTON_VOL_UC: "HANGERŐ",
IDS_YSM_BUTTON_CH: "CS",
IDS_YSM_BUTTON_NO: "Nem",
IDS_SAPPS_BODY_NOTICE: "Jegyzet",
IDS_MSGF_HEADER_OPTION: "Opció",
IDS_MSGF_HEADER_OPTIONS: "Opciók",
IDS_SSCHOL_HEADER_COMPLETED: "Kész",
IDS_YSM_HEADER_SET_UP_REMOTE_ABB: "Távvezérlő beá.",
IDS_YSM_BODY_SET_UP_THE_REMOTE_CONTROL_ON_YOUR_DEVICE_Q: "Beállítja a távvezérlőt az eszközön?",
IDS_YSM_BODY_LATIN_COUNTRIES_ABB: "Latin országok",
IDS_YSM_BODY_POINT_YOUR_WATCH_TOWARDS_THE_PS_AND_TAP_THE_POWER_BUTTON: "Irányítsa az órát a(z) %s felé, és érintse meg a Bekapcsolás gombot.",
IDS_YSM_BODY_TAP_THE_BUTTON_ABB: "Érintse meg a g.",
IDS_YSM_BODY_DID_IT_WORK_Q_ABB: "Működik?",
IDS_YSM_HEADER_SETUP_COMPLETE_ABB: "A beállítás kész",
IDS_YSM_BODY_PS_REMOTE_CONTROL_SETUP_IS_COMPLETE: "Befejeződött a(z) %s távvezérlőjének beállítása.",
IDS_YSM_BODY_THIS_MODEL_IS_NOT_SUPPORTED: "Ez a modell nincs támogatva.",
IDS_YSM_BODY_THE_REMOTE_CONTROL_WILL_BE_REMOVED: "El fogja távolítani a távvezérlőt.",
IDS_YSM_BODY_FAN_SPEED_ABB: "Vent. seb.",
IDS_YSM_BODY_MODE_ABB2: "Üzemmód",
IDS_YSM_OPT_AV_RECEIVER_ABB2: "AV-vevő",
IDS_YSM_BODY_BLUE: "Kék",
IDS_YSM_BODY_CHANNEL_DOWN_ABB: "Csat.váltás le",
IDS_YSM_BODY_CHANNEL_LIST_ABB: "Csatornalista",
IDS_YSM_BODY_CHANNEL_UP_ABB: "Csat.vált. fel",
IDS_YSM_BODY_DISK_MENU_ABB: "Lemezmenü",
IDS_YSM_BODY_DOWN: "Le",
IDS_YSM_BODY_DVR: "DVR",
IDS_YSM_BODY_EJECT_ABB: "Kiadás",
IDS_YSM_BODY_FAST_FORWARD_ABB: "Gy. előretek.",
IDS_YSM_BODY_FAVOURITE_ABB: "Kedvenc",
IDS_YSM_BODY_FORMAT_HASPECT_ABB: "Formát. (arány)",
IDS_YSM_BODY_GREEN_ABB: "Zöld",
IDS_YSM_BODY_HDMI_PD_ABB: "%d. HDMI",
IDS_YSM_BODY_INPUT_ABB: "Bemenet",
IDS_YSM_BODY_LEFT: "Bal",
IDS_YSM_BODY_LIST: "Lista",
IDS_YSM_BODY_OTHER_COUNTRIES_ABB: "Egyéb országok",
IDS_YSM_BODY_PAUSE: "Szünet",
IDS_YSM_BODY_PLAY: "Lejátszás",
IDS_YSM_BODY_PREVIOUS: "Előző",
IDS_YSM_BODY_PRE_CHANNEL_ABB: "Előző csatorna",
IDS_YSM_BODY_RED: "Piros",
IDS_YSM_BODY_REWIND_ABB: "Visszatekerés",
IDS_YSM_BODY_RIGHT_ABB2: "Jobbra",
IDS_YSM_BODY_SELECT: "Választ",
IDS_YSM_BODY_SOUND_MODE_ABB: "Hangmód",
IDS_YSM_BODY_START_SETUP_OF_STB_REMOTE_CONTROL: "Elindítja a set-top box távvezérlőjének beállítását.",
IDS_YSM_BODY_STOP: "Leállít",
IDS_YSM_BODY_SUBTITLES_ABB2: "Feliratok",
IDS_YSM_BODY_SUBWOOFER_ABB: "Mélysugárzó",
IDS_YSM_BODY_SURROUND_ABB: "Térhatás",
IDS_YSM_BODY_TITLE_MENU_ABB: "Műsormenü",
IDS_YSM_BODY_UP: "Fel",
IDS_YSM_BODY_YELLOW_ABB: "Sárga",
IDS_YSM_BUTTON_CLEAR_HISTORY_ABB: "Előzmények törlése",
IDS_YSM_BUTTON_DONE: "Kész",
IDS_YSM_BUTTON_HISTORY: "Előzmények",
IDS_YSM_BUTTON_MENU: "Menü",
IDS_YSM_BUTTON_NEXT: "Következő",
IDS_YSM_BUTTON_RETURN_UC: "VISSZA",
IDS_YSM_BUTTON_SMART_HUB: "Smart Hub",
IDS_YSM_BUTTON_TOOLS_UC: "ESZKÖZÖK",
IDS_YSM_BUTTON_VIDEO: "Videó",
IDS_YSM_BUTTON_VOD: "VOD",
IDS_YSM_HEADER_HELP: "Súgó",
IDS_YSM_OPT_0: "0",
IDS_YSM_OPT_1: "1",
IDS_YSM_OPT_2: "2",
IDS_YSM_OPT_3: "3",
IDS_YSM_OPT_4: "4",
IDS_YSM_OPT_5: "5",
IDS_YSM_OPT_6: "6",
IDS_YSM_OPT_7: "7",
IDS_YSM_OPT_8: "8",
IDS_YSM_OPT_9: "9",
IDS_YSM_OPT_ENTER: "Bevitel",
IDS_YSM_OPT_POWER: "Be-ki kapcsolás",
IDS_YSM_OPT_RECORD: "Rögzítés",
IDS_YSM_OPT_VOLUME_DOWN: "Halkítás",
IDS_YSM_OPT_VOLUME_UP: "Hangosítás",
IDS_YSM_TAB4_GUIDE: "Műsor-újság",
IDS_CHATON_BODY_INDIA_M_COUNTRYNAME: "India",
IDS_CHATON_BODY_NETHERLANDS_M_COUNTRYNAME: "Hollandia",
IDS_WCL_BODY_RUSSIA_M_COUNTRYNAME: "Oroszország",
IDS_CHATON_BODY_AUSTRALIA_M_COUNTRYNAME: "Ausztrália",
IDS_CHATON_BODY_SAUDI_ARABIA_M_COUNTRYNAME: "Szaúd-Arábia",
IDS_CHATON_BODY_CANADA_M_COUNTRYNAME: "Kanada",
IDS_CHATON_BODY_BRAZIL_M_COUNTRYNAME: "Brazília",
IDS_CHATON_BODY_MEXICO_M_COUNTRYNAME: "Mexikó",
IDS_CHATON_BODY_ARGENTINA_M_COUNTRYNAME: "Argentína",
IDS_CHATON_BODY_CHILE_M_COUNTRYNAME: "Chile",
IDS_CHATON_BODY_PERU_M_COUNTRYNAME: "Peru",
IDS_CHATON_BODY_COLOMBIA_M_COUNTRYNAME: "Kolumbia",
IDS_COM_POP_TRY_AGAIN: "Próbálja újra.",
IDS_YSM_BODY_CHANGE_DEVICE_M_NOUN_ABB: "Eszközváltás",
IDS_YSM_BODY_TEMP_M_TEMPERATURE_ABB: "Hőmérs.",
IDS_MSGF_BODY_REMOTE: "Távoli",
IDS_YSM_OPT_TEMP_DOWN_ABB: "Hidegebb",
IDS_YSM_OPT_TEMP_UP_ABB: "Melegebb",
IDS_YSM_OPT_TURBO_ABB: "Turbó",
IDS_YSM_OPT_DISPLAY_ABB: "Megjelenítés",
IDS_YSM_OPT_DELIMITER_ABB: "Elválasztó",
IDS_YSM_OPT_INTERNET_ABB: "Internet",
IDS_YSM_OPT_PIP: "PiP",
IDS_YSM_OPT_PIP_SWAP_ABB: "PiP-csere",
IDS_YSM_OPT_PIP_CHANNEL_MINUS_ABB: "PiP-csatorna -",
IDS_YSM_OPT_PIP_CHANNEL_PLUS_ABB: "PiP-csatorna +",
IDS_YSM_OPT_PIP_MOVE_ABB: "PiP áthelyezése",
IDS_YSM_OPT_DTV: "DTV",
IDS_YSM_OPT_COMPONENT_PD_ABB: "%d. összetevő",
IDS_YSM_OPT_USB: "USB",
IDS_YSM_OPT_PICTURE_ABB2: "Kép",
IDS_YSM_OPT_3D: "3d",
IDS_YSM_OPT_REPLAY_ABB: "Lejátszás",
IDS_YSM_OPT_DAY_MINUS: "Nap -",
IDS_YSM_OPT_DAY_PLUS: "Nap +",
IDS_YSM_OPT_RADIO: "Rádió",
IDS_YSM_OPT_TV_RADIO_ABB: "TV/rádió",
IDS_YSM_OPT_SWING_DOWN_ABB: "Lendítés lefelé",
IDS_YSM_OPT_SWING_LEFT_ABB: "Lendítés balra",
IDS_YSM_OPT_SWING_RIGHT_ABB: "Lendítés jobbra",
IDS_YSM_OPT_SWING_UP_ABB: "Lendítés felfelé",
IDS_YSM_OPT_PVR_MENU_ABB: "PVR-menü",
IDS_YSM_OPT_RETURN_TO_LIVE_ABB: "Vissza az élőhöz",
IDS_YSM_OPT_POWER_OFF_ABB2: "Kikapcsolás",
IDS_YSM_OPT_POWER_ON_ABB: "Bekapcsolás",
IDS_CHATON_BODY_JAPAN_M_COUNTRYNAME: "Japán",
IDS_YSM_BODY_VOL_M_VOLUME_ABB: "Vol",
IDS_YSM_HEADER_TV_AND_STB_ABB: "TV és STB",
IDS_YSM_OPT_SLEEP_M_RESERVATION_ABB: "Sleep"};
STMS.setStmsMap( map );
STMS.refreshAllStr();
});