WatchOnSandbox( "STMS", function( m ) {
var STMS = m.STMS,
map = {
IDS_ST_BODY_VOLUME_M_SOUND_ABB: "Bolumena",
IDS_SR_BODY_AIR_CONDITIONER: "Aire girotua",
IDS_SR_BODY_AUSTRIA_M_COUNTRYNAME: "Austria",
IDS_SR_BODY_BELGIUM_M_COUNTRYNAME: "Belgika",
IDS_SR_BODY_CHINA_M_COUNTRYNAME: "Txina",
IDS_SR_BODY_DENMARK_M_COUNTRYNAME: "Danimarka",
IDS_SR_BODY_FAN_SPEED_DOWN: "Moteldu haizagailua",
IDS_SR_BODY_FAN_SPEED_UP: "Azkartu haizagailua",
IDS_SR_BODY_FINLAND_M_COUNTRYNAME: "Finlandia",
IDS_SR_BODY_FRANCE_M_COUNTRYNAME: "Frantzia",
IDS_SR_BODY_GERMANY_M_COUNTRYNAME: "Alemania",
IDS_SR_BODY_IRELAND_M_COUNTRYNAME: "Irlanda",
IDS_SR_BODY_ITALY_M_COUNTRYNAME: "Italia",
IDS_SR_BODY_LUXEMBOURG_M_COUNTRYNAME: "Luxenburgo",
IDS_SR_BODY_MODE: "Modua",
IDS_SR_BODY_NORWAY_M_COUNTRYNAME: "Norvegia",
IDS_SR_BODY_POLAND_M_COUNTRYNAME: "Polonia",
IDS_SR_BODY_PORTUGAL_M_COUNTRYNAME: "Portugal",
IDS_SR_BODY_SET_UP: "Konfiguratu",
IDS_SR_BODY_SOUTH_KOREA_M_COUNTRYNAME: "Hego Korea",
IDS_SR_BODY_SPAIN_M_COUNTRYNAME: "Espainia",
IDS_SR_BODY_SWEDEN_M_COUNTRYNAME: "Suedia",
IDS_SR_BODY_SWITZERLAND_M_COUNTRYNAME: "Suitza",
IDS_SR_BODY_UNITED_KINGDOM_M_COUNTRYNAME: "Erresuma Batua",
IDS_SR_BODY_UNITED_STATES_OF_AMERICA_M_COUNTRYNAME: "Ameriketako Estatu Batuak",
IDS_SR_BUTTON_BACK: "Atzera",
IDS_SR_BUTTON_CANCEL_ABB: "Utzi",
IDS_SR_BUTTON_DELETE: "Ezab.",
IDS_SR_BUTTON_DONE: "Egina",
IDS_SR_BUTTON_EXIT: "Irten",
IDS_SR_BUTTON_INFO: "Informazioa",
IDS_SR_BUTTON_MENU: "Menua",
IDS_SR_BUTTON_MUTE: "Isilarazi",
IDS_SR_BUTTON_OK: "Ados",
IDS_SR_BUTTON_POWER: "Bateria",
IDS_SR_BUTTON_SELECT_YOUR_COUNTRY: "Hautatu zure herrialdea",
IDS_SR_BUTTON_SELECT_YOUR_COUNTRY_REGION: "Hautatu herrialdea/eskualdea",
IDS_SR_BUTTON_SHOW_OTHER_BRANDS: "Erakutsi beste markak",
IDS_SR_BUTTON_SOURCE_T_SMART_REMOTE: "Iturria",
IDS_SR_BUTTON_TEMP_DOWN_M_TEMPERATURE: "Tenp. behera",
IDS_SR_BUTTON_TEMP_UP_M_TEMPERATURE: "Tenp. gora",
IDS_SR_BUTTON_TV: "TB",
IDS_SR_BUTTON_YES: "Bai",
IDS_SR_HEADER_ALL_BRANDS: "Marka guztiak",
IDS_SR_HEADER_DELETE_ABB: "Ezabatu",
IDS_SR_HEADER_RESET: "Berrezarri",
IDS_SR_HEADER_WATCHON_M_APPLICATION: "WatchON",
IDS_SR_OPT_ADD_DEVICE_ABB: "Gehitu gailua",
IDS_SR_OPT_STB_ABB: "STB",
IDS_YSM_POP_SET_UP_THE_REMOTE_CONTROL_ON_YOUR_DEVICE_Q: "Konfiguratu urrutiko agintea zure gailuan?",
IDS_YSM_OPT_SHOW_ALL_BRANDS_ABB: "Erakutsi marka guztiak",
IDS_YSM_BUTTON_VOL_UC: "BOL",
IDS_YSM_BUTTON_CH: "TB kateak",
IDS_YSM_BUTTON_NO: "Ez",
IDS_SAPPS_BODY_NOTICE: "Oharra",
IDS_MSGF_HEADER_OPTION: "Aukera",
IDS_MSGF_HEADER_OPTIONS: "Aukerak",
IDS_SSCHOL_HEADER_COMPLETED: "Osatua",
IDS_YSM_HEADER_SET_UP_REMOTE_ABB: "Konfig. urrutik.",
IDS_YSM_BODY_SET_UP_THE_REMOTE_CONTROL_ON_YOUR_DEVICE_Q: "Konfiguratu urrutiko agintea zure gailuan?",
IDS_YSM_BODY_LATIN_COUNTRIES_ABB: "Herrialde latinoak",
IDS_YSM_BODY_POINT_YOUR_WATCH_TOWARDS_THE_PS_AND_TAP_THE_POWER_BUTTON: "Zuzendu zure erlojua %s-(e)rantz eta ukitu pizteko botoia.",
IDS_YSM_BODY_TAP_THE_BUTTON_ABB: "Ukitu botoia.",
IDS_YSM_BODY_DID_IT_WORK_Q_ABB: "Badabil?",
IDS_YSM_HEADER_SETUP_COMPLETE_ABB: "Konfig. osatua",
IDS_YSM_BODY_PS_REMOTE_CONTROL_SETUP_IS_COMPLETE: "%s urrutiko kontrol konfigurazioa osatu da.",
IDS_YSM_BODY_THIS_MODEL_IS_NOT_SUPPORTED: "Modelo hau ez da onartzen.",
IDS_YSM_BODY_THE_REMOTE_CONTROL_WILL_BE_REMOVED: "Urrutiko agintea kenduko da.",
IDS_YSM_BODY_FAN_SPEED_ABB: "Haiz. ab.",
IDS_YSM_BODY_MODE_ABB2: "Modua",
IDS_YSM_OPT_AV_RECEIVER_ABB2: "AV hartzailea",
IDS_YSM_BODY_BLUE: "Urdina",
IDS_YSM_BODY_CHANNEL_DOWN_ABB: "Atzeratu katea",
IDS_YSM_BODY_CHANNEL_LIST_ABB: "Kate zerrenda",
IDS_YSM_BODY_CHANNEL_UP_ABB: "Aurreratu katea",
IDS_YSM_BODY_DISK_MENU_ABB: "Disko menua",
IDS_YSM_BODY_DOWN: "Behera",
IDS_YSM_BODY_DVR: "DVR",
IDS_YSM_BODY_EJECT_ABB: "Atera",
IDS_YSM_BODY_FAST_FORWARD_ABB: "Bizkor aurreratu",
IDS_YSM_BODY_FAVOURITE_ABB: "Gogokoak",
IDS_YSM_BODY_FORMAT_HASPECT_ABB: "Formatua (itx.)",
IDS_YSM_BODY_GREEN_ABB: "Berdea",
IDS_YSM_BODY_HDMI_PD_ABB: "HDMI %d",
IDS_YSM_BODY_INPUT_ABB: "Sartu",
IDS_YSM_BODY_LEFT: "Ezkerra",
IDS_YSM_BODY_LIST: "Zerrenda",
IDS_YSM_BODY_OTHER_COUNTRIES_ABB: "Beste herrialde batzuk",
IDS_YSM_BODY_PAUSE: "Eten",
IDS_YSM_BODY_PLAY: "Erreproduzitu",
IDS_YSM_BODY_PREVIOUS: "Aurrekoa",
IDS_YSM_BODY_PRE_CHANNEL_ABB: "Aurre katea",
IDS_YSM_BODY_RED: "Gorria",
IDS_YSM_BODY_REWIND_ABB: "Birbobinatu",
IDS_YSM_BODY_RIGHT_ABB2: "Eskuina",
IDS_YSM_BODY_SELECT: "Aukeratu",
IDS_YSM_BODY_SOUND_MODE_ABB: "Soinu modua",
IDS_YSM_BODY_START_SETUP_OF_STB_REMOTE_CONTROL: "Hasi STB urrutiko agintearen konfigurazioa.",
IDS_YSM_BODY_STOP: "Gelditu",
IDS_YSM_BODY_SUBTITLES_ABB2: "Azpitituluak",
IDS_YSM_BODY_SUBWOOFER_ABB: "Subwoofera",
IDS_YSM_BODY_SURROUND_ABB: "Ingurukoa",
IDS_YSM_BODY_TITLE_MENU_ABB: "Izenburu menua",
IDS_YSM_BODY_UP: "Gora",
IDS_YSM_BODY_YELLOW_ABB: "Horia",
IDS_YSM_BUTTON_CLEAR_HISTORY_ABB: "Garbitu historia",
IDS_YSM_BUTTON_DONE: "Egina",
IDS_YSM_BUTTON_HISTORY: "Historia",
IDS_YSM_BUTTON_MENU: "Menua",
IDS_YSM_BUTTON_NEXT: "Hurrengoa",
IDS_YSM_BUTTON_RETURN_UC: "ITZULI",
IDS_YSM_BUTTON_SMART_HUB: "Smart Hub",
IDS_YSM_BUTTON_TOOLS_UC: "TRESNAK",
IDS_YSM_BUTTON_VIDEO: "Bideoa",
IDS_YSM_BUTTON_VOD: "VOD",
IDS_YSM_HEADER_HELP: "Laguntza",
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
IDS_YSM_OPT_ENTER: "Idatzi",
IDS_YSM_OPT_POWER: "Bateria",
IDS_YSM_OPT_RECORD: "Grabatu",
IDS_YSM_OPT_VOLUME_DOWN: "Jaitsi bolumena",
IDS_YSM_OPT_VOLUME_UP: "Igo bolumena",
IDS_YSM_TAB4_GUIDE: "Gida",
IDS_CHATON_BODY_INDIA_M_COUNTRYNAME: "India",
IDS_CHATON_BODY_NETHERLANDS_M_COUNTRYNAME: "Herbehereak",
IDS_WCL_BODY_RUSSIA_M_COUNTRYNAME: "Errusia",
IDS_CHATON_BODY_AUSTRALIA_M_COUNTRYNAME: "Australia",
IDS_CHATON_BODY_SAUDI_ARABIA_M_COUNTRYNAME: "Saudi Arabia",
IDS_CHATON_BODY_CANADA_M_COUNTRYNAME: "Kanada",
IDS_CHATON_BODY_BRAZIL_M_COUNTRYNAME: "Brasil",
IDS_CHATON_BODY_MEXICO_M_COUNTRYNAME: "Mexiko",
IDS_CHATON_BODY_ARGENTINA_M_COUNTRYNAME: "Argentina",
IDS_CHATON_BODY_CHILE_M_COUNTRYNAME: "Txile",
IDS_CHATON_BODY_PERU_M_COUNTRYNAME: "Peru",
IDS_CHATON_BODY_COLOMBIA_M_COUNTRYNAME: "Kolonbia",
IDS_COM_POP_TRY_AGAIN: "Berriro saiatu",
IDS_YSM_BODY_CHANGE_DEVICE_M_NOUN_ABB: "Aldatu gailua",
IDS_YSM_BODY_TEMP_M_TEMPERATURE_ABB: "Tenperat.",
IDS_MSGF_BODY_REMOTE: "Urrutikoa",
IDS_YSM_OPT_TEMP_DOWN_ABB: "Tenp. behera",
IDS_YSM_OPT_TEMP_UP_ABB: "Tenp. gora",
IDS_YSM_OPT_TURBO_ABB: "Turboa",
IDS_YSM_OPT_DISPLAY_ABB: "Pantaila",
IDS_YSM_OPT_DELIMITER_ABB: "Mugatu",
IDS_YSM_OPT_INTERNET_ABB: "Internet",
IDS_YSM_OPT_PIP: "PiP",
IDS_YSM_OPT_PIP_SWAP_ABB: "PiP trukea",
IDS_YSM_OPT_PIP_CHANNEL_MINUS_ABB: "- PiP katea",
IDS_YSM_OPT_PIP_CHANNEL_PLUS_ABB: "+ PiP katea",
IDS_YSM_OPT_PIP_MOVE_ABB: "PiP mugimendua",
IDS_YSM_OPT_DTV: "TBD",
IDS_YSM_OPT_COMPONENT_PD_ABB: "%d. osagaia",
IDS_YSM_OPT_USB: "USB",
IDS_YSM_OPT_PICTURE_ABB2: "Argazkia",
IDS_YSM_OPT_3D: "3d",
IDS_YSM_OPT_REPLAY_ABB: "Berriz errepr.",
IDS_YSM_OPT_DAY_MINUS: "- eguna",
IDS_YSM_OPT_DAY_PLUS: "+ eguna",
IDS_YSM_OPT_RADIO: "Irratia",
IDS_YSM_OPT_TV_RADIO_ABB: "TB/irratia",
IDS_YSM_OPT_SWING_DOWN_ABB: "Kulunkatu behera",
IDS_YSM_OPT_SWING_LEFT_ABB: "Kulunkatu ezk.",
IDS_YSM_OPT_SWING_RIGHT_ABB: "Kulunkatu esk.",
IDS_YSM_OPT_SWING_UP_ABB: "Kulunkatu gora",
IDS_YSM_OPT_PVR_MENU_ABB: "Bideo grab. menua",
IDS_YSM_OPT_RETURN_TO_LIVE_ABB: "Itzuli Zuzenekora",
IDS_YSM_OPT_POWER_OFF_ABB2: "Itzali",
IDS_YSM_OPT_POWER_ON_ABB: "Piztu",
IDS_CHATON_BODY_JAPAN_M_COUNTRYNAME: "Japonia",
IDS_YSM_BODY_VOL_M_VOLUME_ABB: "Bol",
IDS_YSM_HEADER_TV_AND_STB_ABB: "TB eta STB",
IDS_YSM_OPT_SLEEP_M_RESERVATION_ABB: "Lo"};
STMS.setStmsMap( map );
STMS.refreshAllStr();
});