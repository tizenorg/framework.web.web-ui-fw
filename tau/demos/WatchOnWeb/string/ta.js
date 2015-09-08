WatchOnSandbox( "STMS", function( m ) {
var STMS = m.STMS,
map = {
IDS_ST_BODY_VOLUME_M_SOUND_ABB: "ஒலியளவு",
IDS_SR_BODY_AIR_CONDITIONER: "ஏர் கன்டிஷனர்",
IDS_SR_BODY_AUSTRIA_M_COUNTRYNAME: "ஆஸ்த்ரியா",
IDS_SR_BODY_BELGIUM_M_COUNTRYNAME: "பெல்ஜியம்",
IDS_SR_BODY_CHINA_M_COUNTRYNAME: "சீனா",
IDS_SR_BODY_DENMARK_M_COUNTRYNAME: "டென்மார்க்",
IDS_SR_BODY_FAN_SPEED_DOWN: "ஃபேன் வேகத்தை குறைக்கவும்",
IDS_SR_BODY_FAN_SPEED_UP: "ஃபேன் வேகத்தை அதிகரிக்கவும்",
IDS_SR_BODY_FINLAND_M_COUNTRYNAME: "ஃபின்லாந்து",
IDS_SR_BODY_FRANCE_M_COUNTRYNAME: "ஃப்ரான்ஸ்",
IDS_SR_BODY_GERMANY_M_COUNTRYNAME: "ஜெர்மனி",
IDS_SR_BODY_IRELAND_M_COUNTRYNAME: "ஐயர்லாந்து",
IDS_SR_BODY_ITALY_M_COUNTRYNAME: "இத்தாலி",
IDS_SR_BODY_LUXEMBOURG_M_COUNTRYNAME: "லக்ஸம்பெர்க்",
IDS_SR_BODY_MODE: "முறை",
IDS_SR_BODY_NORWAY_M_COUNTRYNAME: "நார்வே",
IDS_SR_BODY_POLAND_M_COUNTRYNAME: "போலந்து",
IDS_SR_BODY_PORTUGAL_M_COUNTRYNAME: "போர்சுகல்",
IDS_SR_BODY_SET_UP: "அமைப்பு",
IDS_SR_BODY_SOUTH_KOREA_M_COUNTRYNAME: "தென் கொரியா",
IDS_SR_BODY_SPAIN_M_COUNTRYNAME: "ஸ்பெயின்",
IDS_SR_BODY_SWEDEN_M_COUNTRYNAME: "ஸ்வீடன்",
IDS_SR_BODY_SWITZERLAND_M_COUNTRYNAME: "சுவிட்சர்லாந்து",
IDS_SR_BODY_UNITED_KINGDOM_M_COUNTRYNAME: "ஐக்கிய இராஜியம்",
IDS_SR_BODY_UNITED_STATES_OF_AMERICA_M_COUNTRYNAME: "ஐக்கிய அமெரிக்க மாகாணங்கள்",
IDS_SR_BUTTON_BACK: "பின்",
IDS_SR_BUTTON_CANCEL_ABB: "ரத்து",
IDS_SR_BUTTON_DELETE: "நீக்கு",
IDS_SR_BUTTON_DONE: "முடிந்தது",
IDS_SR_BUTTON_EXIT: "வெளியே",
IDS_SR_BUTTON_INFO: "விபரம்",
IDS_SR_BUTTON_MENU: "மெனு",
IDS_SR_BUTTON_MUTE: "ஒலிதடு",
IDS_SR_BUTTON_OK: "சரி",
IDS_SR_BUTTON_POWER: "பவர்",
IDS_SR_BUTTON_SELECT_YOUR_COUNTRY: "உங்கள் நாட்டை தேர்வு செய்க",
IDS_SR_BUTTON_SELECT_YOUR_COUNTRY_REGION: "உங்கள் நாடு/பகுதியை தேர்வுசெய்க",
IDS_SR_BUTTON_SHOW_OTHER_BRANDS: "பிற பிராண்டுகளைக் காட்டுக",
IDS_SR_BUTTON_SOURCE_T_SMART_REMOTE: "மூலம்",
IDS_SR_BUTTON_TEMP_DOWN_M_TEMPERATURE: "டெம்ப் டவுன்",
IDS_SR_BUTTON_TEMP_UP_M_TEMPERATURE: "டெம்ப் அப்",
IDS_SR_BUTTON_TV: "TV",
IDS_SR_BUTTON_YES: "ஆம்",
IDS_SR_HEADER_ALL_BRANDS: "அனைத்து பிராண்டுகள்",
IDS_SR_HEADER_DELETE_ABB: "நீக்கு",
IDS_SR_HEADER_RESET: "ரீசெட்",
IDS_SR_HEADER_WATCHON_M_APPLICATION: "WatchON",
IDS_SR_OPT_ADD_DEVICE_ABB: "சாதனத்தை சேர்க",
IDS_SR_OPT_STB_ABB: "STB",
IDS_YSM_POP_SET_UP_THE_REMOTE_CONTROL_ON_YOUR_DEVICE_Q: "ரிமோட் கண்ட்ரோலை உங்கள் சாதனத்தில் அமைக்கவா?",
IDS_YSM_OPT_SHOW_ALL_BRANDS_ABB: "அனைத்து பிராண்டுகளையும் காண்பி",
IDS_YSM_BUTTON_VOL_UC: "ஒலியளவு",
IDS_YSM_BUTTON_CH: "CH",
IDS_YSM_BUTTON_NO: "இல்லை",
IDS_SAPPS_BODY_NOTICE: "அறிவிப்பு",
IDS_MSGF_HEADER_OPTION: "தெரிவு",
IDS_MSGF_HEADER_OPTIONS: "தெரிவுகள்",
IDS_SSCHOL_HEADER_COMPLETED: "முடிந்தது",
IDS_YSM_HEADER_SET_UP_REMOTE_ABB: "ரிமோட்டை அமைக்கவும்",
IDS_YSM_BODY_SET_UP_THE_REMOTE_CONTROL_ON_YOUR_DEVICE_Q: "ரிமோட் கண்ட்ரோலை உங்கள் சாதனத்தில் அமைக்கவா?",
IDS_YSM_BODY_LATIN_COUNTRIES_ABB: "லத்தீன் நாடுகள்",
IDS_YSM_BODY_POINT_YOUR_WATCH_TOWARDS_THE_PS_AND_TAP_THE_POWER_BUTTON: "%sநோக்கி உங்கள் கடிகாரத்தை சுட்டிக்காட்டிய பின்னர் பவர் பொத்தானை டேப் செய்யவும்.",
IDS_YSM_BODY_TAP_THE_BUTTON_ABB: "பொத்தானை டேப் செய்யவும்.",
IDS_YSM_BODY_DID_IT_WORK_Q_ABB: "அது வேலை செய்ததா?",
IDS_YSM_HEADER_SETUP_COMPLETE_ABB: "அமைப்பு நிறைவடைந்தது",
IDS_YSM_BODY_PS_REMOTE_CONTROL_SETUP_IS_COMPLETE: "%s ரிமோட் கண்ட்ரோல் அமைப்பு நிறைவடைந்தது.",
IDS_YSM_BODY_THIS_MODEL_IS_NOT_SUPPORTED: "இந்த மாடல் ஆதரிக்கப்படவில்லை.",
IDS_YSM_BODY_THE_REMOTE_CONTROL_WILL_BE_REMOVED: "ரிமோட் கண்ட்ரோல் அகற்றப்படும்.",
IDS_YSM_BODY_FAN_SPEED_ABB: "மின்விசிறி வேகம்",
IDS_YSM_BODY_MODE_ABB2: "பயன்முறை",
IDS_YSM_OPT_AV_RECEIVER_ABB2: "AV ரிசீவர்",
IDS_YSM_BODY_BLUE: "நீலம்",
IDS_YSM_BODY_CHANNEL_DOWN_ABB: "சேனல் கீழ்",
IDS_YSM_BODY_CHANNEL_LIST_ABB: "சேனல் பட்டியல்",
IDS_YSM_BODY_CHANNEL_UP_ABB: "சேனல் மேல்",
IDS_YSM_BODY_DISK_MENU_ABB: "வட்டு மெனு",
IDS_YSM_BODY_DOWN: "கீழ்",
IDS_YSM_BODY_DVR: "DVR",
IDS_YSM_BODY_EJECT_ABB: "வெளியேற்றம்",
IDS_YSM_BODY_FAST_FORWARD_ABB: "வேகமாக முன்செல்க",
IDS_YSM_BODY_FAVOURITE_ABB: "பிடித்தவை",
IDS_YSM_BODY_FORMAT_HASPECT_ABB: "வடிவம் (பண்பு)",
IDS_YSM_BODY_GREEN_ABB: "பச்சை",
IDS_YSM_BODY_HDMI_PD_ABB: "HDMI %d",
IDS_YSM_BODY_INPUT_ABB: "உள்ளீடு",
IDS_YSM_BODY_LEFT: "இடது",
IDS_YSM_BODY_LIST: "பட்டியல்",
IDS_YSM_BODY_OTHER_COUNTRIES_ABB: "மற்ற நாடுகள்",
IDS_YSM_BODY_PAUSE: "இ.நி.",
IDS_YSM_BODY_PLAY: "இயக்குக",
IDS_YSM_BODY_PREVIOUS: "முந்தையது",
IDS_YSM_BODY_PRE_CHANNEL_ABB: "முன் அலைவரிசை",
IDS_YSM_BODY_RED: "சிவப்பு",
IDS_YSM_BODY_REWIND_ABB: "பின்செல்",
IDS_YSM_BODY_RIGHT_ABB2: "வலது",
IDS_YSM_BODY_SELECT: "தேர்ந்தெடு",
IDS_YSM_BODY_SOUND_MODE_ABB: "ஒலி முறை",
IDS_YSM_BODY_START_SETUP_OF_STB_REMOTE_CONTROL: "STB ரிமோட் கண்ட்ரோலின் அமைப்பைத் துவக்கவும்.",
IDS_YSM_BODY_STOP: "நிறுத்துக",
IDS_YSM_BODY_SUBTITLES_ABB2: "துணைதலைப்புகள்",
IDS_YSM_BODY_SUBWOOFER_ABB: "சப்ஊஃபர்",
IDS_YSM_BODY_SURROUND_ABB: "சுற்றுப்புறம்",
IDS_YSM_BODY_TITLE_MENU_ABB: "தலைப்பு மெனு",
IDS_YSM_BODY_UP: "மேலே",
IDS_YSM_BODY_YELLOW_ABB: "மஞ்சள்",
IDS_YSM_BUTTON_CLEAR_HISTORY_ABB: "வரலாறு நீக்குக",
IDS_YSM_BUTTON_DONE: "முடிந்தது",
IDS_YSM_BUTTON_HISTORY: "வரலாறு",
IDS_YSM_BUTTON_MENU: "மெனு",
IDS_YSM_BUTTON_NEXT: "அடுத்து",
IDS_YSM_BUTTON_RETURN_UC: "திரும்புக",
IDS_YSM_BUTTON_SMART_HUB: "ஸ்மார்ட் ஹப்",
IDS_YSM_BUTTON_TOOLS_UC: "கருவிகள்",
IDS_YSM_BUTTON_VIDEO: "நி.படம்",
IDS_YSM_BUTTON_VOD: "VOD",
IDS_YSM_HEADER_HELP: "உதவி",
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
IDS_YSM_OPT_ENTER: "உள்ளிடவும்",
IDS_YSM_OPT_POWER: "பவர்",
IDS_YSM_OPT_RECORD: "பதிக",
IDS_YSM_OPT_VOLUME_DOWN: "ஒலியளவு குறைப்பு",
IDS_YSM_OPT_VOLUME_UP: "ஒலியளவு அதிகரிப்பு",
IDS_YSM_TAB4_GUIDE: "வழிகாட்டி",
IDS_CHATON_BODY_INDIA_M_COUNTRYNAME: "இந்தியா",
IDS_CHATON_BODY_NETHERLANDS_M_COUNTRYNAME: "நெதர்லாந்து",
IDS_WCL_BODY_RUSSIA_M_COUNTRYNAME: "ரஷ்யா",
IDS_CHATON_BODY_AUSTRALIA_M_COUNTRYNAME: "ஆஸ்திரேலியா",
IDS_CHATON_BODY_SAUDI_ARABIA_M_COUNTRYNAME: "சவுதி அரேபியா",
IDS_CHATON_BODY_CANADA_M_COUNTRYNAME: "கனடா",
IDS_CHATON_BODY_BRAZIL_M_COUNTRYNAME: "பிரேசில்",
IDS_CHATON_BODY_MEXICO_M_COUNTRYNAME: "மெக்ஸிகோ",
IDS_CHATON_BODY_ARGENTINA_M_COUNTRYNAME: "அர்ஜெண்டினா",
IDS_CHATON_BODY_CHILE_M_COUNTRYNAME: "சிலி",
IDS_CHATON_BODY_PERU_M_COUNTRYNAME: "பெரு",
IDS_CHATON_BODY_COLOMBIA_M_COUNTRYNAME: "கொலாம்பியா",
IDS_COM_POP_TRY_AGAIN: "மீண்டும் முயலுக.",
IDS_YSM_BODY_CHANGE_DEVICE_M_NOUN_ABB: "சாதனத்தை மாற்றுக",
IDS_YSM_BODY_TEMP_M_TEMPERATURE_ABB: "வெப்பநிலை",
IDS_MSGF_BODY_REMOTE: "தொலை",
IDS_YSM_OPT_TEMP_DOWN_ABB: "வெப்பநிலை டவுன்",
IDS_YSM_OPT_TEMP_UP_ABB: "வெப்பநிலை அப்",
IDS_YSM_OPT_TURBO_ABB: "டர்போ",
IDS_YSM_OPT_DISPLAY_ABB: "காட்சி",
IDS_YSM_OPT_DELIMITER_ABB: "டெலிமிட்டர்",
IDS_YSM_OPT_INTERNET_ABB: "இணையம்",
IDS_YSM_OPT_PIP: "PiP",
IDS_YSM_OPT_PIP_SWAP_ABB: "PiP ஸ்வாப்",
IDS_YSM_OPT_PIP_CHANNEL_MINUS_ABB: "PiP சேனல் -",
IDS_YSM_OPT_PIP_CHANNEL_PLUS_ABB: "PiP சேனல் +",
IDS_YSM_OPT_PIP_MOVE_ABB: "PiP நகர்வு",
IDS_YSM_OPT_DTV: "DTV",
IDS_YSM_OPT_COMPONENT_PD_ABB: "உபகரணம் %d",
IDS_YSM_OPT_USB: "USB",
IDS_YSM_OPT_PICTURE_ABB2: "படம்",
IDS_YSM_OPT_3D: "3d",
IDS_YSM_OPT_REPLAY_ABB: "மீண்டும் இயக்கு",
IDS_YSM_OPT_DAY_MINUS: "நாள் -",
IDS_YSM_OPT_DAY_PLUS: "நாள் +",
IDS_YSM_OPT_RADIO: "ரேடியோ",
IDS_YSM_OPT_TV_RADIO_ABB: "TV/வானொலி",
IDS_YSM_OPT_SWING_DOWN_ABB: "கீழாக ஸ்விங் செய்க",
IDS_YSM_OPT_SWING_LEFT_ABB: "இடதாக ஸ்விங் செய்க",
IDS_YSM_OPT_SWING_RIGHT_ABB: "வலதாக ஸ்விங் செய்க",
IDS_YSM_OPT_SWING_UP_ABB: "மேலாக ஸ்விங் செய்க",
IDS_YSM_OPT_PVR_MENU_ABB: "PVR மெனு",
IDS_YSM_OPT_RETURN_TO_LIVE_ABB: "நேரலை திரும்புக",
IDS_YSM_OPT_POWER_OFF_ABB2: "பவர் ஆஃப்",
IDS_YSM_OPT_POWER_ON_ABB: "பவர் ஆன்",
IDS_CHATON_BODY_JAPAN_M_COUNTRYNAME: "ஜப்பான்",
IDS_YSM_BODY_VOL_M_VOLUME_ABB: "ஒலியளவு",
IDS_YSM_HEADER_TV_AND_STB_ABB: "TV மற்றும் STB",
IDS_YSM_OPT_SLEEP_M_RESERVATION_ABB: "உறங்கு"};
STMS.setStmsMap( map );
STMS.refreshAllStr();
});