WatchOnSandbox( "STMS", function( m ) {
var STMS = m.STMS,
map = {
IDS_ST_BODY_VOLUME_M_SOUND_ABB: "വോളിയം",
IDS_SR_BODY_AIR_CONDITIONER: "എയര്‍ കണ്ടീഷണര്‍",
IDS_SR_BODY_AUSTRIA_M_COUNTRYNAME: "ഓസ്ട്രിയ",
IDS_SR_BODY_BELGIUM_M_COUNTRYNAME: "ബെല്‍ജിയം",
IDS_SR_BODY_CHINA_M_COUNTRYNAME: "ചൈന",
IDS_SR_BODY_DENMARK_M_COUNTRYNAME: "ഡെന്‍മാര്‍ക്ക്",
IDS_SR_BODY_FAN_SPEED_DOWN: "ഫാന്‍ സ്പീഡ് കുറയ്ക്കുക",
IDS_SR_BODY_FAN_SPEED_UP: "ഫാന്‍ സ്പീഡ് വര്‍ധിപ്പിക്കുക",
IDS_SR_BODY_FINLAND_M_COUNTRYNAME: "ഫിന്‍ലാന്‍ഡ്",
IDS_SR_BODY_FRANCE_M_COUNTRYNAME: "ഫ്രാന്‍സ്",
IDS_SR_BODY_GERMANY_M_COUNTRYNAME: "ജര്‍മ്മനി",
IDS_SR_BODY_IRELAND_M_COUNTRYNAME: "ഐയര്‍ലന്‍ഡ്",
IDS_SR_BODY_ITALY_M_COUNTRYNAME: "ഇറ്റലി",
IDS_SR_BODY_LUXEMBOURG_M_COUNTRYNAME: "ലക്സംബര്‍ഗ്",
IDS_SR_BODY_MODE: "രീതി",
IDS_SR_BODY_NORWAY_M_COUNTRYNAME: "നോര്‍വെ",
IDS_SR_BODY_POLAND_M_COUNTRYNAME: "പോളണ്ട്",
IDS_SR_BODY_PORTUGAL_M_COUNTRYNAME: "പോര്‍ച്ചുഗല്‍",
IDS_SR_BODY_SET_UP: "ക്രമീകരണം",
IDS_SR_BODY_SOUTH_KOREA_M_COUNTRYNAME: "സൌത്ത് കൊറിയ",
IDS_SR_BODY_SPAIN_M_COUNTRYNAME: "സ്പെയിന്‍",
IDS_SR_BODY_SWEDEN_M_COUNTRYNAME: "സ്വീഡന്‍",
IDS_SR_BODY_SWITZERLAND_M_COUNTRYNAME: "സ്വിറ്റ്സര്‍ലാന്‍ഡ്",
IDS_SR_BODY_UNITED_KINGDOM_M_COUNTRYNAME: "യുണൈറ്റഡ് കിംഗ്ഡം",
IDS_SR_BODY_UNITED_STATES_OF_AMERICA_M_COUNTRYNAME: "യുണൈറ്റഡ് സ്റ്റേറ്റ്സ് ഓഫ് അമേരിക്ക",
IDS_SR_BUTTON_BACK: "പിന്നോട്ട്",
IDS_SR_BUTTON_CANCEL_ABB: "റദ്ദ്",
IDS_SR_BUTTON_DELETE: "ഡിലീറ്റ് ചെയ്യുക",
IDS_SR_BUTTON_DONE: "ചെയ്തു",
IDS_SR_BUTTON_EXIT: "പുറത്തുകടക്കുക",
IDS_SR_BUTTON_INFO: "വിവരം",
IDS_SR_BUTTON_MENU: "മെനു",
IDS_SR_BUTTON_MUTE: "നിശബ്ദം",
IDS_SR_BUTTON_OK: "ശരി",
IDS_SR_BUTTON_POWER: "പവര്‍",
IDS_SR_BUTTON_SELECT_YOUR_COUNTRY: "നിങ്ങളുടെ രാജ്യം തിരഞ്ഞെടുക്കുക",
IDS_SR_BUTTON_SELECT_YOUR_COUNTRY_REGION: "നിങ്ങളുടെ രാജ്യം/മേഖല തിരഞ്ഞെടുക്കുക",
IDS_SR_BUTTON_SHOW_OTHER_BRANDS: "മറ്റ് ബ്രാന്‍ഡുകള്‍ പ്രദര്‍ശിപ്പിക്കുക",
IDS_SR_BUTTON_SOURCE_T_SMART_REMOTE: "സ്രോതസ്സ്",
IDS_SR_BUTTON_TEMP_DOWN_M_TEMPERATURE: "ഊഷ്മാവ് കുറയ്ക്കുക",
IDS_SR_BUTTON_TEMP_UP_M_TEMPERATURE: "ഊഷ്മാവ് കൂട്ടുക",
IDS_SR_BUTTON_TV: "TV",
IDS_SR_BUTTON_YES: "അതെ",
IDS_SR_HEADER_ALL_BRANDS: "എല്ലാ ബ്രാന്‍ഡുകളും",
IDS_SR_HEADER_DELETE_ABB: "നീക്കം ചെയ്യുക",
IDS_SR_HEADER_RESET: "പുനഃസജ്ജമാക്കുക",
IDS_SR_HEADER_WATCHON_M_APPLICATION: "WatchON",
IDS_SR_OPT_ADD_DEVICE_ABB: "സാമഗ്രി ചേര്‍ക്കുക",
IDS_SR_OPT_STB_ABB: "STB",
IDS_YSM_POP_SET_UP_THE_REMOTE_CONTROL_ON_YOUR_DEVICE_Q: "നിങ്ങളുടെ ഉപകരണത്തിൽ വിദൂര നിയന്ത്രണം സജ്ജമാക്കട്ടെ?",
IDS_YSM_OPT_SHOW_ALL_BRANDS_ABB: "എല്ലാ ബ്രാൻഡുകളെയും കാണിക്കുക",
IDS_YSM_BUTTON_VOL_UC: "VOL",
IDS_YSM_BUTTON_CH: "ചാനല്‍",
IDS_YSM_BUTTON_NO: "ഇല്ല",
IDS_SAPPS_BODY_NOTICE: "അറിയിപ്പ്",
IDS_MSGF_HEADER_OPTION: "ഓപ്‌ഷന്‍",
IDS_MSGF_HEADER_OPTIONS: "ഓപ്‌ഷനുകള്‍",
IDS_SSCHOL_HEADER_COMPLETED: "പൂര്‍ത്തിയാക്കി",
IDS_YSM_HEADER_SET_UP_REMOTE_ABB: "റിമോട്ട് സജ്ജമാക്കുക",
IDS_YSM_BODY_SET_UP_THE_REMOTE_CONTROL_ON_YOUR_DEVICE_Q: "നിങ്ങളുടെ ഉപകരണത്തിൽ വിദൂര നിയന്ത്രണം സജ്ജമാക്കട്ടെ?",
IDS_YSM_BODY_LATIN_COUNTRIES_ABB: "ലാറ്റിൻ രാജ്യങ്ങൾ",
IDS_YSM_BODY_POINT_YOUR_WATCH_TOWARDS_THE_PS_AND_TAP_THE_POWER_BUTTON: "നിങ്ങളുടെ വാച്ച് %s-ന് നേരെ പിടിച്ച് പവർ ബട്ടണിൽ സ്പർശിക്കുക.",
IDS_YSM_BODY_TAP_THE_BUTTON_ABB: "ബട്ടണിൽ സ്പർശിക്കുക.",
IDS_YSM_BODY_DID_IT_WORK_Q_ABB: "ഇത് ഫലവത്തായോ?",
IDS_YSM_HEADER_SETUP_COMPLETE_ABB: "സെറ്റപ്പ് പൂർത്തിയായി",
IDS_YSM_BODY_PS_REMOTE_CONTROL_SETUP_IS_COMPLETE: "%s റിമോട്ട് കൺട്രോൾ സെറ്റപ്പ് പൂർത്തിയായി.",
IDS_YSM_BODY_THIS_MODEL_IS_NOT_SUPPORTED: "ഈ മോഡലിനെ പിന്തുണയ്ക്കുന്നില്ല.",
IDS_YSM_BODY_THE_REMOTE_CONTROL_WILL_BE_REMOVED: "റിമോട്ട് കൺട്രോൾ നീക്കംചെയ്യപ്പെടും.",
IDS_YSM_BODY_FAN_SPEED_ABB: "ഫാൻ വേഗത",
IDS_YSM_BODY_MODE_ABB2: "മോഡ്",
IDS_YSM_OPT_AV_RECEIVER_ABB2: "AV റിസീവർ",
IDS_YSM_BODY_BLUE: "നീല",
IDS_YSM_BODY_CHANNEL_DOWN_ABB: "താഴെയുള്ള ചാനൽ",
IDS_YSM_BODY_CHANNEL_LIST_ABB: "ചാനൽ പട്ടിക",
IDS_YSM_BODY_CHANNEL_UP_ABB: "മേലെയുള്ള ചാനൽ",
IDS_YSM_BODY_DISK_MENU_ABB: "ഡിസ്ക് മെനു",
IDS_YSM_BODY_DOWN: "താഴെ",
IDS_YSM_BODY_DVR: "DVR",
IDS_YSM_BODY_EJECT_ABB: "ഇജക്റ്റ് ചെയ്യുക",
IDS_YSM_BODY_FAST_FORWARD_ABB: "ഫാസ്റ്റ് ഫോർവേഡ്",
IDS_YSM_BODY_FAVOURITE_ABB: "പ്രിയപ്പെട്ടത്",
IDS_YSM_BODY_FORMAT_HASPECT_ABB: "ഫോർമാറ്റ് (അനുപാതം)",
IDS_YSM_BODY_GREEN_ABB: "പച്ച",
IDS_YSM_BODY_HDMI_PD_ABB: "HDMI %d",
IDS_YSM_BODY_INPUT_ABB: "ഇൻപുട്ട്",
IDS_YSM_BODY_LEFT: "ഇടത്",
IDS_YSM_BODY_LIST: "ലിസ്റ്റ്",
IDS_YSM_BODY_OTHER_COUNTRIES_ABB: "മറ്റ് രാജ്യങ്ങള്‍",
IDS_YSM_BODY_PAUSE: "പോസ്",
IDS_YSM_BODY_PLAY: "പ്ലേ ചെയ്യുക",
IDS_YSM_BODY_PREVIOUS: "മുമ്പത്തെ",
IDS_YSM_BODY_PRE_CHANNEL_ABB: "പ്രീ ചാനൽ",
IDS_YSM_BODY_RED: "ചുവപ്പ്",
IDS_YSM_BODY_REWIND_ABB: "റിവൈന്‍‌ഡ് ചെയ്യുക",
IDS_YSM_BODY_RIGHT_ABB2: "വലത്",
IDS_YSM_BODY_SELECT: "തിരഞ്ഞെടുക്കുക",
IDS_YSM_BODY_SOUND_MODE_ABB: "ശബ്ദ മോഡ്",
IDS_YSM_BODY_START_SETUP_OF_STB_REMOTE_CONTROL: "STB റിമോട്ട് കൺട്രോളിന്‍റെ സെറ്റപ്പ് ആരംഭിക്കുക.",
IDS_YSM_BODY_STOP: "നിര്‍ത്തുക",
IDS_YSM_BODY_SUBTITLES_ABB2: "ഉപശീർഷകങ്ങൾ",
IDS_YSM_BODY_SUBWOOFER_ABB: "സബ്‍വൂഫർ",
IDS_YSM_BODY_SURROUND_ABB: "സറൗണ്ട്",
IDS_YSM_BODY_TITLE_MENU_ABB: "ശീർഷക മെനു",
IDS_YSM_BODY_UP: "മുകളിലേക്ക്",
IDS_YSM_BODY_YELLOW_ABB: "മഞ്ഞ",
IDS_YSM_BUTTON_CLEAR_HISTORY_ABB: "ചരിത്രം മായ്‌ക്കുക",
IDS_YSM_BUTTON_DONE: "ചെയ്തു",
IDS_YSM_BUTTON_HISTORY: "ചരിത്രം",
IDS_YSM_BUTTON_MENU: "മെനു",
IDS_YSM_BUTTON_NEXT: "അടുത്തത്",
IDS_YSM_BUTTON_RETURN_UC: "RETURN",
IDS_YSM_BUTTON_SMART_HUB: "സ്മാര്‍ട്ട് ഹബ്",
IDS_YSM_BUTTON_TOOLS_UC: "TOOLS",
IDS_YSM_BUTTON_VIDEO: "വീഡിയോ",
IDS_YSM_BUTTON_VOD: "VOD",
IDS_YSM_HEADER_HELP: "സഹായം",
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
IDS_YSM_OPT_ENTER: "നല്‍കൂ",
IDS_YSM_OPT_POWER: "പവര്‍",
IDS_YSM_OPT_RECORD: "റെക്കോര്‍ഡ്",
IDS_YSM_OPT_VOLUME_DOWN: "ശബ്ദം താഴ്ത്തുക",
IDS_YSM_OPT_VOLUME_UP: "ശബ്ദം കൂട്ടുക",
IDS_YSM_TAB4_GUIDE: "ഗൈഡ്",
IDS_CHATON_BODY_INDIA_M_COUNTRYNAME: "ഇന്ത്യ",
IDS_CHATON_BODY_NETHERLANDS_M_COUNTRYNAME: "നെതര്‍ലാന്‍ഡ്സ്",
IDS_WCL_BODY_RUSSIA_M_COUNTRYNAME: "റഷ്യ",
IDS_CHATON_BODY_AUSTRALIA_M_COUNTRYNAME: "ഓസ്ട്രേല്യ",
IDS_CHATON_BODY_SAUDI_ARABIA_M_COUNTRYNAME: "സൌദി അറേബ്യ",
IDS_CHATON_BODY_CANADA_M_COUNTRYNAME: "കാനഡ",
IDS_CHATON_BODY_BRAZIL_M_COUNTRYNAME: "ബ്രസീല്‍",
IDS_CHATON_BODY_MEXICO_M_COUNTRYNAME: "മെക്സിക്കോ",
IDS_CHATON_BODY_ARGENTINA_M_COUNTRYNAME: "അര്‍ജന്‍റീന",
IDS_CHATON_BODY_CHILE_M_COUNTRYNAME: "ചിലി",
IDS_CHATON_BODY_PERU_M_COUNTRYNAME: "പെറു",
IDS_CHATON_BODY_COLOMBIA_M_COUNTRYNAME: "കൊളംബിയ",
IDS_COM_POP_TRY_AGAIN: "വീണ്ടും ശ്രമിക്കുക.",
IDS_YSM_BODY_CHANGE_DEVICE_M_NOUN_ABB: "ഉപകരണം മാറ്റുക",
IDS_YSM_BODY_TEMP_M_TEMPERATURE_ABB: "താപനില",
IDS_MSGF_BODY_REMOTE: "റിമോട്ട്",
IDS_YSM_OPT_TEMP_DOWN_ABB: "ഊഷ്മാവ് കുറയ്ക്കുക",
IDS_YSM_OPT_TEMP_UP_ABB: "ഊഷ്മാവ് കൂട്ടുക",
IDS_YSM_OPT_TURBO_ABB: "ടർബോ",
IDS_YSM_OPT_DISPLAY_ABB: "ഡിസ്പ്ലേ",
IDS_YSM_OPT_DELIMITER_ABB: "അതിര്",
IDS_YSM_OPT_INTERNET_ABB: "ഇന്‍റര്‍‍നെറ്റ്",
IDS_YSM_OPT_PIP: "PiP",
IDS_YSM_OPT_PIP_SWAP_ABB: "PiP തമ്മിൽ മാറൽ",
IDS_YSM_OPT_PIP_CHANNEL_MINUS_ABB: "PiP ചാനൽ -",
IDS_YSM_OPT_PIP_CHANNEL_PLUS_ABB: "PiP ചാനൽ +",
IDS_YSM_OPT_PIP_MOVE_ABB: "PiP നീക്കം",
IDS_YSM_OPT_DTV: "DTV",
IDS_YSM_OPT_COMPONENT_PD_ABB: "ഘടകം %d",
IDS_YSM_OPT_USB: "USB",
IDS_YSM_OPT_PICTURE_ABB2: "ചിത്രം",
IDS_YSM_OPT_3D: "ത്രിമാനം",
IDS_YSM_OPT_REPLAY_ABB: "വീണ്ടും പ്ലേ ചെയ്യുക",
IDS_YSM_OPT_DAY_MINUS: "ദിവസം -",
IDS_YSM_OPT_DAY_PLUS: "ദിവസം +",
IDS_YSM_OPT_RADIO: "റേഡിയോ",
IDS_YSM_OPT_TV_RADIO_ABB: "TV/റേഡിയോ",
IDS_YSM_OPT_SWING_DOWN_ABB: "താഴോട്ട് ആട്ടുക",
IDS_YSM_OPT_SWING_LEFT_ABB: "ഇടത്തോട്ട് ആട്ടുക",
IDS_YSM_OPT_SWING_RIGHT_ABB: "വലത്തോട്ട് ആട്ടുക",
IDS_YSM_OPT_SWING_UP_ABB: "മേലോട്ട് ആട്ടുക",
IDS_YSM_OPT_PVR_MENU_ABB: "PVR മെനു",
IDS_YSM_OPT_RETURN_TO_LIVE_ABB: "തത്സമയത്തിലേക്ക് മടങ്ങുക",
IDS_YSM_OPT_POWER_OFF_ABB2: "പവര്‍ ഓഫ് ചെയ്യുക",
IDS_YSM_OPT_POWER_ON_ABB: "പവര്‍ ഓൺ ചെയ്യുക",
IDS_CHATON_BODY_JAPAN_M_COUNTRYNAME: "ജപ്പാന്‍",
IDS_YSM_BODY_VOL_M_VOLUME_ABB: "വോളിയം",
IDS_YSM_HEADER_TV_AND_STB_ABB: "TV-യും STB-യും",
IDS_YSM_OPT_SLEEP_M_RESERVATION_ABB: "ഉറക്കം"};
STMS.setStmsMap( map );
STMS.refreshAllStr();
});