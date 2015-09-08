WatchOnSandbox( "STMS", function( m ) {
var STMS = m.STMS,
map = {
IDS_ST_BODY_VOLUME_M_SOUND_ABB: "Głośność",
IDS_SR_BODY_AIR_CONDITIONER: "Klimatyzator",
IDS_SR_BODY_AUSTRIA_M_COUNTRYNAME: "Austria",
IDS_SR_BODY_BELGIUM_M_COUNTRYNAME: "Belgia",
IDS_SR_BODY_CHINA_M_COUNTRYNAME: "Chiny",
IDS_SR_BODY_DENMARK_M_COUNTRYNAME: "Dania",
IDS_SR_BODY_FAN_SPEED_DOWN: "Zwolnij tempo nawiewu",
IDS_SR_BODY_FAN_SPEED_UP: "Przyspiesz tempo nawiewu",
IDS_SR_BODY_FINLAND_M_COUNTRYNAME: "Finlandia",
IDS_SR_BODY_FRANCE_M_COUNTRYNAME: "Francja",
IDS_SR_BODY_GERMANY_M_COUNTRYNAME: "Niemcy",
IDS_SR_BODY_IRELAND_M_COUNTRYNAME: "Irlandia",
IDS_SR_BODY_ITALY_M_COUNTRYNAME: "Włochy",
IDS_SR_BODY_LUXEMBOURG_M_COUNTRYNAME: "Luksemburg",
IDS_SR_BODY_MODE: "Tryb",
IDS_SR_BODY_NORWAY_M_COUNTRYNAME: "Norwegia",
IDS_SR_BODY_POLAND_M_COUNTRYNAME: "Polska",
IDS_SR_BODY_PORTUGAL_M_COUNTRYNAME: "Portugalia",
IDS_SR_BODY_SET_UP: "Konfiguracja",
IDS_SR_BODY_SOUTH_KOREA_M_COUNTRYNAME: "Korea Południowa",
IDS_SR_BODY_SPAIN_M_COUNTRYNAME: "Hiszpania",
IDS_SR_BODY_SWEDEN_M_COUNTRYNAME: "Szwecja",
IDS_SR_BODY_SWITZERLAND_M_COUNTRYNAME: "Szwajcaria",
IDS_SR_BODY_UNITED_KINGDOM_M_COUNTRYNAME: "Wielka Brytania",
IDS_SR_BODY_UNITED_STATES_OF_AMERICA_M_COUNTRYNAME: "Stany Zjednoczone",
IDS_SR_BUTTON_BACK: "Wstecz",
IDS_SR_BUTTON_CANCEL_ABB: "Anuluj",
IDS_SR_BUTTON_DELETE: "Usuń",
IDS_SR_BUTTON_DONE: "Gotowe",
IDS_SR_BUTTON_EXIT: "Wyjdź",
IDS_SR_BUTTON_INFO: "Inform.",
IDS_SR_BUTTON_MENU: "Menu",
IDS_SR_BUTTON_MUTE: "Cichy",
IDS_SR_BUTTON_OK: "OK",
IDS_SR_BUTTON_POWER: "Zasilan.",
IDS_SR_BUTTON_SELECT_YOUR_COUNTRY: "Wybierz kraj",
IDS_SR_BUTTON_SELECT_YOUR_COUNTRY_REGION: "Wybierz kraj/region",
IDS_SR_BUTTON_SHOW_OTHER_BRANDS: "Pokaż inne marki",
IDS_SR_BUTTON_SOURCE_T_SMART_REMOTE: "Źródło",
IDS_SR_BUTTON_TEMP_DOWN_M_TEMPERATURE: "Zmn. temp.",
IDS_SR_BUTTON_TEMP_UP_M_TEMPERATURE: "Zw. temp.",
IDS_SR_BUTTON_TV: "TV",
IDS_SR_BUTTON_YES: "Tak",
IDS_SR_HEADER_ALL_BRANDS: "Wszystkie marki",
IDS_SR_HEADER_DELETE_ABB: "Usuń",
IDS_SR_HEADER_RESET: "Zeruj",
IDS_SR_HEADER_WATCHON_M_APPLICATION: "WatchON",
IDS_SR_OPT_ADD_DEVICE_ABB: "Dodaj urządzenie",
IDS_SR_OPT_STB_ABB: "Dek. STB",
IDS_YSM_POP_SET_UP_THE_REMOTE_CONTROL_ON_YOUR_DEVICE_Q: "Skonfigurować pilota na urządzeniu?",
IDS_YSM_OPT_SHOW_ALL_BRANDS_ABB: "Wyświetl wszystkie marki",
IDS_YSM_BUTTON_VOL_UC: "GŁOŚNOŚĆ",
IDS_YSM_BUTTON_CH: "KAN",
IDS_YSM_BUTTON_NO: "Nie",
IDS_SAPPS_BODY_NOTICE: "Uwaga",
IDS_MSGF_HEADER_OPTION: "Opcje",
IDS_MSGF_HEADER_OPTIONS: "Opcje",
IDS_SSCHOL_HEADER_COMPLETED: "Zakończone",
IDS_YSM_HEADER_SET_UP_REMOTE_ABB: "Konfigur. pilota",
IDS_YSM_BODY_SET_UP_THE_REMOTE_CONTROL_ON_YOUR_DEVICE_Q: "Skonfigurować pilota na urządzeniu?",
IDS_YSM_BODY_LATIN_COUNTRIES_ABB: "Kraje latynoskie",
IDS_YSM_BODY_POINT_YOUR_WATCH_TOWARDS_THE_PS_AND_TAP_THE_POWER_BUTTON: "Skieruj zegarek do urządzenia %s i dotknij przycisku zasilania.",
IDS_YSM_BODY_TAP_THE_BUTTON_ABB: "Dotknij przyc.",
IDS_YSM_BODY_DID_IT_WORK_Q_ABB: "Działa?",
IDS_YSM_HEADER_SETUP_COMPLETE_ABB: "Konf. ukończona",
IDS_YSM_BODY_PS_REMOTE_CONTROL_SETUP_IS_COMPLETE: "Konfiguracja zdalnego sterowania dla urządzenia %s jest ukończona.",
IDS_YSM_BODY_THIS_MODEL_IS_NOT_SUPPORTED: "Ten model nie jest obsługiwany.",
IDS_YSM_BODY_THE_REMOTE_CONTROL_WILL_BE_REMOVED: "Zdalne sterowanie zostanie usunięte.",
IDS_YSM_BODY_FAN_SPEED_ABB: "Szybk.naw.",
IDS_YSM_BODY_MODE_ABB2: "Tryb",
IDS_YSM_OPT_AV_RECEIVER_ABB2: "Odbiornik AV",
IDS_YSM_BODY_BLUE: "Niebieski",
IDS_YSM_BODY_CHANNEL_DOWN_ABB: "Poprzed. kanał",
IDS_YSM_BODY_CHANNEL_LIST_ABB: "Lista kanałów",
IDS_YSM_BODY_CHANNEL_UP_ABB: "Następny kanał",
IDS_YSM_BODY_DISK_MENU_ABB: "Menu dysku",
IDS_YSM_BODY_DOWN: "W dół",
IDS_YSM_BODY_DVR: "DVR",
IDS_YSM_BODY_EJECT_ABB: "Wysuń",
IDS_YSM_BODY_FAST_FORWARD_ABB: "Do przodu",
IDS_YSM_BODY_FAVOURITE_ABB: "Ulubione",
IDS_YSM_BODY_FORMAT_HASPECT_ABB: "Form.(proporc.)",
IDS_YSM_BODY_GREEN_ABB: "Zielony",
IDS_YSM_BODY_HDMI_PD_ABB: "HDMI %d",
IDS_YSM_BODY_INPUT_ABB: "Wprowadzanie",
IDS_YSM_BODY_LEFT: "W lewo",
IDS_YSM_BODY_LIST: "Lista",
IDS_YSM_BODY_OTHER_COUNTRIES_ABB: "Inne kraje",
IDS_YSM_BODY_PAUSE: "Pauza",
IDS_YSM_BODY_PLAY: "Odtwórz",
IDS_YSM_BODY_PREVIOUS: "Poprzedni",
IDS_YSM_BODY_PRE_CHANNEL_ABB: "Poprz. kanał",
IDS_YSM_BODY_RED: "Czerwony",
IDS_YSM_BODY_REWIND_ABB: "Do tyłu",
IDS_YSM_BODY_RIGHT_ABB2: "W prawo",
IDS_YSM_BODY_SELECT: "Wybierz",
IDS_YSM_BODY_SOUND_MODE_ABB: "Tryb dźwięku",
IDS_YSM_BODY_START_SETUP_OF_STB_REMOTE_CONTROL: "Zacznij konfigurowanie pilota dekodera STB.",
IDS_YSM_BODY_STOP: "Stop",
IDS_YSM_BODY_SUBTITLES_ABB2: "Napisy",
IDS_YSM_BODY_SUBWOOFER_ABB: "Gł. niskoton.",
IDS_YSM_BODY_SURROUND_ABB: "Dźw. przestrz.",
IDS_YSM_BODY_TITLE_MENU_ABB: "Menu tytułów",
IDS_YSM_BODY_UP: "W górę",
IDS_YSM_BODY_YELLOW_ABB: "Żółty",
IDS_YSM_BUTTON_CLEAR_HISTORY_ABB: "Wyczyść historię",
IDS_YSM_BUTTON_DONE: "Gotowe",
IDS_YSM_BUTTON_HISTORY: "Historia",
IDS_YSM_BUTTON_MENU: "Menu",
IDS_YSM_BUTTON_NEXT: "Dalej",
IDS_YSM_BUTTON_RETURN_UC: "POWRÓT",
IDS_YSM_BUTTON_SMART_HUB: "Smart Hub",
IDS_YSM_BUTTON_TOOLS_UC: "NARZĘDZIA",
IDS_YSM_BUTTON_VIDEO: "Wideo",
IDS_YSM_BUTTON_VOD: "VOD",
IDS_YSM_HEADER_HELP: "Pomoc",
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
IDS_YSM_OPT_ENTER: "Wprowadź",
IDS_YSM_OPT_POWER: "Zasilanie",
IDS_YSM_OPT_RECORD: "Nagraj",
IDS_YSM_OPT_VOLUME_DOWN: "Ściszanie",
IDS_YSM_OPT_VOLUME_UP: "Podgłaśnianie",
IDS_YSM_TAB4_GUIDE: "Przewodnik",
IDS_CHATON_BODY_INDIA_M_COUNTRYNAME: "Indie",
IDS_CHATON_BODY_NETHERLANDS_M_COUNTRYNAME: "Holandia",
IDS_WCL_BODY_RUSSIA_M_COUNTRYNAME: "Rosja",
IDS_CHATON_BODY_AUSTRALIA_M_COUNTRYNAME: "Australia",
IDS_CHATON_BODY_SAUDI_ARABIA_M_COUNTRYNAME: "Arabia Saudyjska",
IDS_CHATON_BODY_CANADA_M_COUNTRYNAME: "Kanada",
IDS_CHATON_BODY_BRAZIL_M_COUNTRYNAME: "Brazylia",
IDS_CHATON_BODY_MEXICO_M_COUNTRYNAME: "Meksyk",
IDS_CHATON_BODY_ARGENTINA_M_COUNTRYNAME: "Argentyna",
IDS_CHATON_BODY_CHILE_M_COUNTRYNAME: "Chile",
IDS_CHATON_BODY_PERU_M_COUNTRYNAME: "Peru",
IDS_CHATON_BODY_COLOMBIA_M_COUNTRYNAME: "Kolumbia",
IDS_COM_POP_TRY_AGAIN: "Spróbuj ponownie.",
IDS_YSM_BODY_CHANGE_DEVICE_M_NOUN_ABB: "Zmień urządz.",
IDS_YSM_BODY_TEMP_M_TEMPERATURE_ABB: "Temp.",
IDS_MSGF_BODY_REMOTE: "Zdalny",
IDS_YSM_OPT_TEMP_DOWN_ABB: "Zmniejsz temp.",
IDS_YSM_OPT_TEMP_UP_ABB: "Zwiększ temp.",
IDS_YSM_OPT_TURBO_ABB: "Turbo",
IDS_YSM_OPT_DISPLAY_ABB: "Wyświetlacz",
IDS_YSM_OPT_DELIMITER_ABB: "Ogranicznik",
IDS_YSM_OPT_INTERNET_ABB: "Internet",
IDS_YSM_OPT_PIP: "Obraz PiP",
IDS_YSM_OPT_PIP_SWAP_ABB: "Zamień PiP",
IDS_YSM_OPT_PIP_CHANNEL_MINUS_ABB: "Kanał PiP -",
IDS_YSM_OPT_PIP_CHANNEL_PLUS_ABB: "Kanał PiP +",
IDS_YSM_OPT_PIP_MOVE_ABB: "Film PiP",
IDS_YSM_OPT_DTV: "Telewizja cyfrowa",
IDS_YSM_OPT_COMPONENT_PD_ABB: "Składnik %d",
IDS_YSM_OPT_USB: "USB",
IDS_YSM_OPT_PICTURE_ABB2: "Obraz",
IDS_YSM_OPT_3D: "3d",
IDS_YSM_OPT_REPLAY_ABB: "Odtwórz ponownie",
IDS_YSM_OPT_DAY_MINUS: "Dzień -",
IDS_YSM_OPT_DAY_PLUS: "Dzień +",
IDS_YSM_OPT_RADIO: "Radio",
IDS_YSM_OPT_TV_RADIO_ABB: "Telewizor/radio",
IDS_YSM_OPT_SWING_DOWN_ABB: "Przechyl w dół",
IDS_YSM_OPT_SWING_LEFT_ABB: "Przechyl w lewo",
IDS_YSM_OPT_SWING_RIGHT_ABB: "Przechyl w prawo",
IDS_YSM_OPT_SWING_UP_ABB: "Przechyl w górę",
IDS_YSM_OPT_PVR_MENU_ABB: "Menu PVR",
IDS_YSM_OPT_RETURN_TO_LIVE_ABB: "Wr.do TV na żywo",
IDS_YSM_OPT_POWER_OFF_ABB2: "Wyłącz zasilanie",
IDS_YSM_OPT_POWER_ON_ABB: "Włącz zasilanie",
IDS_CHATON_BODY_JAPAN_M_COUNTRYNAME: "Japonia",
IDS_YSM_BODY_VOL_M_VOLUME_ABB: "Gł.",
IDS_YSM_HEADER_TV_AND_STB_ABB: "TV i STB",
IDS_YSM_OPT_SLEEP_M_RESERVATION_ABB: "Uśpienie"};
STMS.setStmsMap( map );
STMS.refreshAllStr();
});