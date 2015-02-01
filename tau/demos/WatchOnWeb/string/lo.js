WatchOnSandbox( "STMS", function( m ) {
var STMS = m.STMS,
map = {
IDS_ST_BODY_VOLUME_M_SOUND_ABB: "ລະດັບສຽງ",
IDS_SR_BODY_AIR_CONDITIONER: "ເຄື່ອງປັບອາກາດ",
IDS_SR_BODY_AUSTRIA_M_COUNTRYNAME: "ປະເທດໂອຕຣິດ",
IDS_SR_BODY_BELGIUM_M_COUNTRYNAME: "ປະເທດແບນຊິກ",
IDS_SR_BODY_CHINA_M_COUNTRYNAME: "ປະເທດຈີນ",
IDS_SR_BODY_DENMARK_M_COUNTRYNAME: "ປະເທດເດັນມາກ",
IDS_SR_BODY_FAN_SPEED_DOWN: "ຫຼຸດຄວາມໄວພັດລົມ",
IDS_SR_BODY_FAN_SPEED_UP: "ເພີ່ມຄວາມໄວພັດລົມ",
IDS_SR_BODY_FINLAND_M_COUNTRYNAME: "ປະເທດແຟງລັ່ງ",
IDS_SR_BODY_FRANCE_M_COUNTRYNAME: "ປະເທດຝຣັ່ງ",
IDS_SR_BODY_GERMANY_M_COUNTRYNAME: "ປະເທດເຢຍລະມັນ",
IDS_SR_BODY_IRELAND_M_COUNTRYNAME: "ປະເທດອຽກລັ່ງ",
IDS_SR_BODY_ITALY_M_COUNTRYNAME: "ປະເທດອີຕາລີ",
IDS_SR_BODY_LUXEMBOURG_M_COUNTRYNAME: "ປະເທດລຸກຊໍາບວກ",
IDS_SR_BODY_MODE: "ໂໝດ",
IDS_SR_BODY_NORWAY_M_COUNTRYNAME: "ປະເທດນໍເວ",
IDS_SR_BODY_POLAND_M_COUNTRYNAME: "ປະເທດໂປໂລ່ຍ",
IDS_SR_BODY_PORTUGAL_M_COUNTRYNAME: "ປະເທດປັອກຕຸຍການ",
IDS_SR_BODY_SET_UP: "ຕັ້ງ",
IDS_SR_BODY_SOUTH_KOREA_M_COUNTRYNAME: "ເກົາຫຼີໃຕ້",
IDS_SR_BODY_SPAIN_M_COUNTRYNAME: "ປະເທດສະເປນ",
IDS_SR_BODY_SWEDEN_M_COUNTRYNAME: "ປະເທດສະວີເດັັນ",
IDS_SR_BODY_SWITZERLAND_M_COUNTRYNAME: "ປະເທດສະວິດເຊີແລນ",
IDS_SR_BODY_UNITED_KINGDOM_M_COUNTRYNAME: "ສະຫະລາດຊະອານາຈັກ",
IDS_SR_BODY_UNITED_STATES_OF_AMERICA_M_COUNTRYNAME: "ສະຫະລັດອາເມຣິກາ",
IDS_SR_BUTTON_BACK: "ກັບຄືນ",
IDS_SR_BUTTON_CANCEL_ABB: "ຍົກເລີກ",
IDS_SR_BUTTON_DELETE: "ລຶບ",
IDS_SR_BUTTON_DONE: "ສໍາເລັດແລ້ວ",
IDS_SR_BUTTON_EXIT: "ອອກ",
IDS_SR_BUTTON_INFO: "ຂໍ້ມູນ",
IDS_SR_BUTTON_MENU: "ເມນູ",
IDS_SR_BUTTON_MUTE: "ປິດສຽງ",
IDS_SR_BUTTON_OK: "ຕົກລົງ",
IDS_SR_BUTTON_POWER: "ປິດ/ເປີດ",
IDS_SR_BUTTON_SELECT_YOUR_COUNTRY: "ເລືອກປະເທດຂອງທ່ານ",
IDS_SR_BUTTON_SELECT_YOUR_COUNTRY_REGION: "ເລືອກປະເທດ/ພາກພື້ນຂອງທ່ານ",
IDS_SR_BUTTON_SHOW_OTHER_BRANDS: "ສະແດງຍີ່ຫໍ້ອື່ນ",
IDS_SR_BUTTON_SOURCE_T_SMART_REMOTE: "ທີ່ມາ",
IDS_SR_BUTTON_TEMP_DOWN_M_TEMPERATURE: "ເອົາລົງ",
IDS_SR_BUTTON_TEMP_UP_M_TEMPERATURE: "ເອົາຂຶ້ນ",
IDS_SR_BUTTON_TV: "TV",
IDS_SR_BUTTON_YES: "ແມ່ນແລ້ວ",
IDS_SR_HEADER_ALL_BRANDS: "ທຸກຍີ່ຫໍ້",
IDS_SR_HEADER_DELETE_ABB: "ລຶບ",
IDS_SR_HEADER_RESET: "ຕັ້ງຄ່າ​ຄືນ​ໃໝ່",
IDS_SR_HEADER_WATCHON_M_APPLICATION: "WatchON",
IDS_SR_OPT_ADD_DEVICE_ABB: "ເພີ່ມເຄື່ອງ",
IDS_SR_OPT_STB_ABB: "STB",
IDS_YSM_POP_SET_UP_THE_REMOTE_CONTROL_ON_YOUR_DEVICE_Q: "ຕັ້ງການຄວບຄຸມທາງໄກຢູ່ໃນເຄື່ອງຂອງທ່ານບໍ?",
IDS_YSM_OPT_SHOW_ALL_BRANDS_ABB: "ສະແດງທຸກຍີ່ຫໍ້",
IDS_YSM_BUTTON_VOL_UC: "ສຽງ",
IDS_YSM_BUTTON_CH: "CH",
IDS_YSM_BUTTON_NO: "ບໍ່",
IDS_SAPPS_BODY_NOTICE: "ແຈ້ງການ",
IDS_MSGF_HEADER_OPTION: "Option",
IDS_MSGF_HEADER_OPTIONS: "ຕົວເລືອກ",
IDS_SSCHOL_HEADER_COMPLETED: "ສຳເລັດແລ້ວ",
IDS_YSM_HEADER_SET_UP_REMOTE_ABB: "ຕັ້ງຣີໂໝດ",
IDS_YSM_BODY_SET_UP_THE_REMOTE_CONTROL_ON_YOUR_DEVICE_Q: "ຕັ້ງການຄວບຄຸມທາງໄກຢູ່ໃນເຄື່ອງຂອງທ່ານບໍ?",
IDS_YSM_BODY_LATIN_COUNTRIES_ABB: "ບັນດາປະເທດລາຕິນ",
IDS_YSM_BODY_POINT_YOUR_WATCH_TOWARDS_THE_PS_AND_TAP_THE_POWER_BUTTON: "ຊີ້ໂມງຂອງທ່ານໄປຍັງ %s ແລະແຕະປຸ່ມປິດເປີດ.",
IDS_YSM_BODY_TAP_THE_BUTTON_ABB: "ແຕະປຸ່ມ.",
IDS_YSM_BODY_DID_IT_WORK_Q_ABB: "ມັນເຮັດວຽກບໍ?",
IDS_YSM_HEADER_SETUP_COMPLETE_ABB: "ຕິດຕັ້ງສໍາເລັດ",
IDS_YSM_BODY_PS_REMOTE_CONTROL_SETUP_IS_COMPLETE: "ຕັ້ງຣີໂໝດຄວບຄຸມ %s ສໍາເລັດແລ້ວ.",
IDS_YSM_BODY_THIS_MODEL_IS_NOT_SUPPORTED: "ລຸ້ນນີ້ບໍ່ໄດ້ຮອງຮັບເທື່ອ.",
IDS_YSM_BODY_THE_REMOTE_CONTROL_WILL_BE_REMOVED: "ຣີໂໝດຄວບຄຸມຈະຖືກເອົາອອກໄປ.",
IDS_YSM_BODY_FAN_SPEED_ABB: "ຄວາມໄວພັດລົມ",
IDS_YSM_BODY_MODE_ABB2: "ໂໝດ",
IDS_YSM_OPT_AV_RECEIVER_ABB2: "ເຄື່ອງຮັບ AV",
IDS_YSM_BODY_BLUE: "ສີຟ້າ",
IDS_YSM_BODY_CHANNEL_DOWN_ABB: "ຊ່ອງລົງ",
IDS_YSM_BODY_CHANNEL_LIST_ABB: "ລາຍການຊ່ອງ",
IDS_YSM_BODY_CHANNEL_UP_ABB: "ຊ່ອງຂຶ້ນ",
IDS_YSM_BODY_DISK_MENU_ABB: "ເມນູດິສກ໌",
IDS_YSM_BODY_DOWN: "ລົງລຸ່ມ",
IDS_YSM_BODY_DVR: "DVR",
IDS_YSM_BODY_EJECT_ABB: "ດີດອອກ",
IDS_YSM_BODY_FAST_FORWARD_ABB: "ມ້ວນໄປໜ້າ",
IDS_YSM_BODY_FAVOURITE_ABB: "ລາຍການທີ່ມັກ",
IDS_YSM_BODY_FORMAT_HASPECT_ABB: "ຟໍແມັດ (ມຸມມອງ)",
IDS_YSM_BODY_GREEN_ABB: "ສີຂຽວ",
IDS_YSM_BODY_HDMI_PD_ABB: "HDMI %d",
IDS_YSM_BODY_INPUT_ABB: "ປ້ອນໃສ່",
IDS_YSM_BODY_LEFT: "ຊ້າຍ",
IDS_YSM_BODY_LIST: "ລາຍການ",
IDS_YSM_BODY_OTHER_COUNTRIES_ABB: "Other countries",
IDS_YSM_BODY_PAUSE: "ຢຸດຊົ່ວຄາວ",
IDS_YSM_BODY_PLAY: "ຫຼິ້ນ",
IDS_YSM_BODY_PREVIOUS: "ຜ່ານມາ",
IDS_YSM_BODY_PRE_CHANNEL_ABB: "ຊ່ອງທີ່ຕັ້ງກ່ອນ",
IDS_YSM_BODY_RED: "ສີ​ແດງ",
IDS_YSM_BODY_REWIND_ABB: "ມ້ວນກັບຄືນ",
IDS_YSM_BODY_RIGHT_ABB2: "ຂວາ",
IDS_YSM_BODY_SELECT: "​ເລື​ອກ",
IDS_YSM_BODY_SOUND_MODE_ABB: "ໂໝດສຽງ",
IDS_YSM_BODY_START_SETUP_OF_STB_REMOTE_CONTROL: "ເລີ່ມຕັ້ງຣີໂໝດຄວບຄຸມ STB.",
IDS_YSM_BODY_STOP: "ຢຸດ",
IDS_YSM_BODY_SUBTITLES_ABB2: "ຄໍາບັນຍາຍ",
IDS_YSM_BODY_SUBWOOFER_ABB: "ຊັບວູເຟີ",
IDS_YSM_BODY_SURROUND_ABB: "ເຊີຣາວ",
IDS_YSM_BODY_TITLE_MENU_ABB: "ເມນູຫົວຂໍ້",
IDS_YSM_BODY_UP: "ຂຶ້ນ",
IDS_YSM_BODY_YELLOW_ABB: "ສີເຫຼືອງ",
IDS_YSM_BUTTON_CLEAR_HISTORY_ABB: "ລົບປະຫວັດບັນທຶກໄວ້ຜ່ານມາ",
IDS_YSM_BUTTON_DONE: "ສໍາເລັດແລ້ວ",
IDS_YSM_BUTTON_HISTORY: "ປະຫວັດ",
IDS_YSM_BUTTON_MENU: "ເມນູ",
IDS_YSM_BUTTON_NEXT: "ຕໍ່ໄປ",
IDS_YSM_BUTTON_RETURN_UC: "ກັບຄືນ",
IDS_YSM_BUTTON_SMART_HUB: "ສະມາທ໌ຮັບ",
IDS_YSM_BUTTON_TOOLS_UC: "ເຄື່ອງມື",
IDS_YSM_BUTTON_VIDEO: "ວິດີໂອ",
IDS_YSM_BUTTON_VOD: "VOD",
IDS_YSM_HEADER_HELP: "ຊ່ວຍ​ເຫຼືອ",
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
IDS_YSM_OPT_ENTER: "ປ້ອນ",
IDS_YSM_OPT_POWER: "ປິດ/ເປີດ",
IDS_YSM_OPT_RECORD: "ບັນທຶກ",
IDS_YSM_OPT_VOLUME_DOWN: "ສຽງລົງ",
IDS_YSM_OPT_VOLUME_UP: "ສຽງຂຶ້ນ",
IDS_YSM_TAB4_GUIDE: "ບົດແນະນໍາ",
IDS_CHATON_BODY_INDIA_M_COUNTRYNAME: "ປະເທດອິນເດຍ",
IDS_CHATON_BODY_NETHERLANDS_M_COUNTRYNAME: "ປະເທດເນເທີແລນ",
IDS_WCL_BODY_RUSSIA_M_COUNTRYNAME: "ປະເທດຣັດເຊຍ",
IDS_CHATON_BODY_AUSTRALIA_M_COUNTRYNAME: "ປະເທດອົດສະຕາລີ",
IDS_CHATON_BODY_SAUDI_ARABIA_M_COUNTRYNAME: "ປະເທດຊາອຸດິອາຣາເບຍ",
IDS_CHATON_BODY_CANADA_M_COUNTRYNAME: "ປະເທດການາດາ",
IDS_CHATON_BODY_BRAZIL_M_COUNTRYNAME: "ປະເທດເບຣຊິນ",
IDS_CHATON_BODY_MEXICO_M_COUNTRYNAME: "ປະເທດເມັກຊິກໂກ",
IDS_CHATON_BODY_ARGENTINA_M_COUNTRYNAME: "ປະເທດອາກຊັງຕິນ",
IDS_CHATON_BODY_CHILE_M_COUNTRYNAME: "ປະເທດຊິລີ",
IDS_CHATON_BODY_PERU_M_COUNTRYNAME: "ປະເທດເປຣູ",
IDS_CHATON_BODY_COLOMBIA_M_COUNTRYNAME: "ປະເທດໂກລົມບີ່",
IDS_COM_POP_TRY_AGAIN: "ລອງອີກຄັ້ງ.",
IDS_YSM_BODY_CHANGE_DEVICE_M_NOUN_ABB: "ປ່ຽນເຄື່ອງ",
IDS_YSM_BODY_TEMP_M_TEMPERATURE_ABB: "ອຸນນະພູມ",
IDS_MSGF_BODY_REMOTE: "ລີໂໝດ",
IDS_YSM_OPT_TEMP_DOWN_ABB: "ອຸນນະພູມລົງ",
IDS_YSM_OPT_TEMP_UP_ABB: "ອຸນນະພູມຂຶ້ນ",
IDS_YSM_OPT_TURBO_ABB: "ເທີໂບ",
IDS_YSM_OPT_DISPLAY_ABB: "ສະແດງ",
IDS_YSM_OPT_DELIMITER_ABB: "ດີລີມີເຕີ",
IDS_YSM_OPT_INTERNET_ABB: "ອິນເຕີເນັດ",
IDS_YSM_OPT_PIP: "PiP",
IDS_YSM_OPT_PIP_SWAP_ABB: "PiP ສັບປ່ຽນ",
IDS_YSM_OPT_PIP_CHANNEL_MINUS_ABB: "ຊ່ອງ PiP -",
IDS_YSM_OPT_PIP_CHANNEL_PLUS_ABB: "ຊ່ອງ PiP +",
IDS_YSM_OPT_PIP_MOVE_ABB: "PiP ຍ້າຍ",
IDS_YSM_OPT_DTV: "DTV",
IDS_YSM_OPT_COMPONENT_PD_ABB: "ອົງປະກອບ %d",
IDS_YSM_OPT_USB: "USB",
IDS_YSM_OPT_PICTURE_ABB2: "ຮູບ",
IDS_YSM_OPT_3D: "3D",
IDS_YSM_OPT_REPLAY_ABB: "ຫຼິ້ນຄືນ",
IDS_YSM_OPT_DAY_MINUS: "ວັນ -",
IDS_YSM_OPT_DAY_PLUS: "ວັນ +",
IDS_YSM_OPT_RADIO: "ວິທະຍຸ",
IDS_YSM_OPT_TV_RADIO_ABB: "TV/ວິທະຍຸ",
IDS_YSM_OPT_SWING_DOWN_ABB: "ແກ່ວງລົງ",
IDS_YSM_OPT_SWING_LEFT_ABB: "ແກ່ວງຊ້າຍ",
IDS_YSM_OPT_SWING_RIGHT_ABB: "ແກ່ວງຂວາ",
IDS_YSM_OPT_SWING_UP_ABB: "ແກ່ວງຂຶ້ນ",
IDS_YSM_OPT_PVR_MENU_ABB: "ເມນູ PVR",
IDS_YSM_OPT_RETURN_TO_LIVE_ABB: "ກັບຄືນໄປທີ່ Live",
IDS_YSM_OPT_POWER_OFF_ABB2: "ປິດເຄື່ອງ",
IDS_YSM_OPT_POWER_ON_ABB: "ເປີດເຄື່ອງ",
IDS_CHATON_BODY_JAPAN_M_COUNTRYNAME: "ປະເທດຍີປຸ່ນ",
IDS_YSM_BODY_VOL_M_VOLUME_ABB: "ລະດັບສຽງ",
IDS_YSM_HEADER_TV_AND_STB_ABB: "TV ແລະ STB",
IDS_YSM_OPT_SLEEP_M_RESERVATION_ABB: "ນອນຫຼັບ"};
STMS.setStmsMap( map );
STMS.refreshAllStr();
});