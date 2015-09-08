WatchOnSandbox( "STMS", function( m ) {
var STMS = m.STMS,
map = {
IDS_ST_BODY_VOLUME_M_SOUND_ABB: "음량",
IDS_SR_BODY_AIR_CONDITIONER: "에어컨",
IDS_SR_BODY_AUSTRIA_M_COUNTRYNAME: "오스트리아",
IDS_SR_BODY_BELGIUM_M_COUNTRYNAME: "벨기에",
IDS_SR_BODY_CHINA_M_COUNTRYNAME: "중국",
IDS_SR_BODY_DENMARK_M_COUNTRYNAME: "덴마크",
IDS_SR_BODY_FAN_SPEED_DOWN: "풍속 줄임",
IDS_SR_BODY_FAN_SPEED_UP: "풍속 높임",
IDS_SR_BODY_FINLAND_M_COUNTRYNAME: "핀란드",
IDS_SR_BODY_FRANCE_M_COUNTRYNAME: "프랑스",
IDS_SR_BODY_GERMANY_M_COUNTRYNAME: "독일",
IDS_SR_BODY_IRELAND_M_COUNTRYNAME: "아일랜드",
IDS_SR_BODY_ITALY_M_COUNTRYNAME: "이탈리아",
IDS_SR_BODY_LUXEMBOURG_M_COUNTRYNAME: "룩셈부르크",
IDS_SR_BODY_MODE: "모드",
IDS_SR_BODY_NORWAY_M_COUNTRYNAME: "노르웨이",
IDS_SR_BODY_POLAND_M_COUNTRYNAME: "폴란드",
IDS_SR_BODY_PORTUGAL_M_COUNTRYNAME: "포르투갈",
IDS_SR_BODY_SET_UP: "설정",
IDS_SR_BODY_SOUTH_KOREA_M_COUNTRYNAME: "대한민국",
IDS_SR_BODY_SPAIN_M_COUNTRYNAME: "스페인",
IDS_SR_BODY_SWEDEN_M_COUNTRYNAME: "스웨덴",
IDS_SR_BODY_SWITZERLAND_M_COUNTRYNAME: "스위스",
IDS_SR_BODY_UNITED_KINGDOM_M_COUNTRYNAME: "영국",
IDS_SR_BODY_UNITED_STATES_OF_AMERICA_M_COUNTRYNAME: "미국",
IDS_SR_BUTTON_BACK: "이전",
IDS_SR_BUTTON_CANCEL_ABB: "취소",
IDS_SR_BUTTON_DELETE: "삭제",
IDS_SR_BUTTON_DONE: "완료",
IDS_SR_BUTTON_EXIT: "종료",
IDS_SR_BUTTON_INFO: "정보",
IDS_SR_BUTTON_MENU: "메뉴",
IDS_SR_BUTTON_MUTE: "음소거",
IDS_SR_BUTTON_OK: "확인",
IDS_SR_BUTTON_POWER: "전원",
IDS_SR_BUTTON_SELECT_YOUR_COUNTRY: "국가 선택",
IDS_SR_BUTTON_SELECT_YOUR_COUNTRY_REGION: "국가/지역 선택",
IDS_SR_BUTTON_SHOW_OTHER_BRANDS: "다른 브랜드 보기",
IDS_SR_BUTTON_SOURCE_T_SMART_REMOTE: "외부 입력",
IDS_SR_BUTTON_TEMP_DOWN_M_TEMPERATURE: "온도 낮춤",
IDS_SR_BUTTON_TEMP_UP_M_TEMPERATURE: "온도 높임",
IDS_SR_BUTTON_TV: "TV",
IDS_SR_BUTTON_YES: "예",
IDS_SR_HEADER_ALL_BRANDS: "모든 브랜드",
IDS_SR_HEADER_DELETE_ABB: "삭제",
IDS_SR_HEADER_RESET: "초기화",
IDS_SR_HEADER_WATCHON_M_APPLICATION: "WatchON",
IDS_SR_OPT_ADD_DEVICE_ABB: "디바이스 추가",
IDS_SR_OPT_STB_ABB: "셋톱 박스",
IDS_YSM_POP_SET_UP_THE_REMOTE_CONTROL_ON_YOUR_DEVICE_Q: "디바이스에서 리모컨을 설정할까요?",
IDS_YSM_OPT_SHOW_ALL_BRANDS_ABB: "모든 브랜드 보기",
IDS_YSM_BUTTON_VOL_UC: "음량",
IDS_YSM_BUTTON_CH: "채널",
IDS_YSM_BUTTON_NO: "아니요",
IDS_SAPPS_BODY_NOTICE: "알림",
IDS_MSGF_HEADER_OPTION: "옵션",
IDS_MSGF_HEADER_OPTIONS: "옵션",
IDS_SSCHOL_HEADER_COMPLETED: "완료",
IDS_YSM_HEADER_SET_UP_REMOTE_ABB: "리모컨 설정",
IDS_YSM_BODY_SET_UP_THE_REMOTE_CONTROL_ON_YOUR_DEVICE_Q: "디바이스에서 리모컨을 설정할까요?",
IDS_YSM_BODY_LATIN_COUNTRIES_ABB: "라틴 국가",
IDS_YSM_BODY_POINT_YOUR_WATCH_TOWARDS_THE_PS_AND_TAP_THE_POWER_BUTTON: "시계를 %s 방향에 맞춘 후 전원 버튼을 누르세요.",
IDS_YSM_BODY_TAP_THE_BUTTON_ABB: "버튼을 누르세요.",
IDS_YSM_BODY_DID_IT_WORK_Q_ABB: "작동하나요?",
IDS_YSM_HEADER_SETUP_COMPLETE_ABB: "설정 완료",
IDS_YSM_BODY_PS_REMOTE_CONTROL_SETUP_IS_COMPLETE: "%s 리모컨 설정을 완료하였습니다.",
IDS_YSM_BODY_THIS_MODEL_IS_NOT_SUPPORTED: "지원하지 않는 모델입니다.",
IDS_YSM_BODY_THE_REMOTE_CONTROL_WILL_BE_REMOVED: "리모컨을 삭제합니다.",
IDS_YSM_BODY_FAN_SPEED_ABB: "풍속",
IDS_YSM_BODY_MODE_ABB2: "모드",
IDS_YSM_OPT_AV_RECEIVER_ABB2: "AV 리시버",
IDS_YSM_BODY_BLUE: "파란색",
IDS_YSM_BODY_CHANNEL_DOWN_ABB: "채널 내림",
IDS_YSM_BODY_CHANNEL_LIST_ABB: "채널 목록",
IDS_YSM_BODY_CHANNEL_UP_ABB: "채널 올림",
IDS_YSM_BODY_DISK_MENU_ABB: "디스크 메뉴",
IDS_YSM_BODY_DOWN: "하위",
IDS_YSM_BODY_DVR: "DVR",
IDS_YSM_BODY_EJECT_ABB: "꺼내기",
IDS_YSM_BODY_FAST_FORWARD_ABB: "빨리감기",
IDS_YSM_BODY_FAVOURITE_ABB: "즐겨찾기",
IDS_YSM_BODY_FORMAT_HASPECT_ABB: "형식(화면)",
IDS_YSM_BODY_GREEN_ABB: "녹색",
IDS_YSM_BODY_HDMI_PD_ABB: "HDMI %d",
IDS_YSM_BODY_INPUT_ABB: "입력",
IDS_YSM_BODY_LEFT: "왼쪽",
IDS_YSM_BODY_LIST: "목록",
IDS_YSM_BODY_OTHER_COUNTRIES_ABB: "다른 국가",
IDS_YSM_BODY_PAUSE: "일시 정지",
IDS_YSM_BODY_PLAY: "재생",
IDS_YSM_BODY_PREVIOUS: "이전",
IDS_YSM_BODY_PRE_CHANNEL_ABB: "이전 채널",
IDS_YSM_BODY_RED: "빨간색",
IDS_YSM_BODY_REWIND_ABB: "되감기",
IDS_YSM_BODY_RIGHT_ABB2: "오른쪽",
IDS_YSM_BODY_SELECT: "선택",
IDS_YSM_BODY_SOUND_MODE_ABB: "소리 모드",
IDS_YSM_BODY_START_SETUP_OF_STB_REMOTE_CONTROL: "셋톱 박스 리모컨 설정을 시작합니다.",
IDS_YSM_BODY_STOP: "중지",
IDS_YSM_BODY_SUBTITLES_ABB2: "자막",
IDS_YSM_BODY_SUBWOOFER_ABB: "서브우퍼",
IDS_YSM_BODY_SURROUND_ABB: "서라운드",
IDS_YSM_BODY_TITLE_MENU_ABB: "타이틀 메뉴",
IDS_YSM_BODY_UP: "상위",
IDS_YSM_BODY_YELLOW_ABB: "노란색",
IDS_YSM_BUTTON_CLEAR_HISTORY_ABB: "기록 삭제",
IDS_YSM_BUTTON_DONE: "완료",
IDS_YSM_BUTTON_HISTORY: "기록",
IDS_YSM_BUTTON_MENU: "메뉴",
IDS_YSM_BUTTON_NEXT: "다음",
IDS_YSM_BUTTON_RETURN_UC: "뒤로",
IDS_YSM_BUTTON_SMART_HUB: "스마트허브",
IDS_YSM_BUTTON_TOOLS_UC: "도구",
IDS_YSM_BUTTON_VIDEO: "동영상",
IDS_YSM_BUTTON_VOD: "VOD",
IDS_YSM_HEADER_HELP: "도움말",
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
IDS_YSM_OPT_ENTER: "입력",
IDS_YSM_OPT_POWER: "전원",
IDS_YSM_OPT_RECORD: "녹음",
IDS_YSM_OPT_VOLUME_DOWN: "음량 줄임",
IDS_YSM_OPT_VOLUME_UP: "음량 높임",
IDS_YSM_TAB4_GUIDE: "가이드",
IDS_CHATON_BODY_INDIA_M_COUNTRYNAME: "인도",
IDS_CHATON_BODY_NETHERLANDS_M_COUNTRYNAME: "네덜란드",
IDS_WCL_BODY_RUSSIA_M_COUNTRYNAME: "러시아",
IDS_CHATON_BODY_AUSTRALIA_M_COUNTRYNAME: "오스트레일리아",
IDS_CHATON_BODY_SAUDI_ARABIA_M_COUNTRYNAME: "사우디아라비아",
IDS_CHATON_BODY_CANADA_M_COUNTRYNAME: "캐나다",
IDS_CHATON_BODY_BRAZIL_M_COUNTRYNAME: "브라질",
IDS_CHATON_BODY_MEXICO_M_COUNTRYNAME: "멕시코",
IDS_CHATON_BODY_ARGENTINA_M_COUNTRYNAME: "아르헨티나",
IDS_CHATON_BODY_CHILE_M_COUNTRYNAME: "칠레",
IDS_CHATON_BODY_PERU_M_COUNTRYNAME: "페루",
IDS_CHATON_BODY_COLOMBIA_M_COUNTRYNAME: "콜롬비아",
IDS_COM_POP_TRY_AGAIN: "다시 시도하세요.",
IDS_YSM_BODY_CHANGE_DEVICE_M_NOUN_ABB: "기기 변경",
IDS_YSM_BODY_TEMP_M_TEMPERATURE_ABB: "온도",
IDS_MSGF_BODY_REMOTE: "리모트",
IDS_YSM_OPT_TEMP_DOWN_ABB: "온도 낮춤",
IDS_YSM_OPT_TEMP_UP_ABB: "온도 높임",
IDS_YSM_OPT_TURBO_ABB: "터보",
IDS_YSM_OPT_DISPLAY_ABB: "디스플레이",
IDS_YSM_OPT_DELIMITER_ABB: "구분자",
IDS_YSM_OPT_INTERNET_ABB: "인터넷",
IDS_YSM_OPT_PIP: "PiP",
IDS_YSM_OPT_PIP_SWAP_ABB: "PiP 전환",
IDS_YSM_OPT_PIP_CHANNEL_MINUS_ABB: "PiP 채널 -",
IDS_YSM_OPT_PIP_CHANNEL_PLUS_ABB: "PiP 채널 +",
IDS_YSM_OPT_PIP_MOVE_ABB: "PiP 이동",
IDS_YSM_OPT_DTV: "디지털 TV",
IDS_YSM_OPT_COMPONENT_PD_ABB: "컴포넌트 %d",
IDS_YSM_OPT_USB: "USB",
IDS_YSM_OPT_PICTURE_ABB2: "사진",
IDS_YSM_OPT_3D: "3D",
IDS_YSM_OPT_REPLAY_ABB: "재생",
IDS_YSM_OPT_DAY_MINUS: "날짜 -",
IDS_YSM_OPT_DAY_PLUS: "날짜 +",
IDS_YSM_OPT_RADIO: "라디오",
IDS_YSM_OPT_TV_RADIO_ABB: "TV/라디오",
IDS_YSM_OPT_SWING_DOWN_ABB: "아래쪽으로 바람",
IDS_YSM_OPT_SWING_LEFT_ABB: "왼쪽으로 바람",
IDS_YSM_OPT_SWING_RIGHT_ABB: "오른쪽으로 바람",
IDS_YSM_OPT_SWING_UP_ABB: "위쪽으로 바람",
IDS_YSM_OPT_PVR_MENU_ABB: "PVR 메뉴",
IDS_YSM_OPT_RETURN_TO_LIVE_ABB: "라이브로 돌아가기",
IDS_YSM_OPT_POWER_OFF_ABB2: "전원 끄기",
IDS_YSM_OPT_POWER_ON_ABB: "전원 켜기",
IDS_CHATON_BODY_JAPAN_M_COUNTRYNAME: "일본",
IDS_YSM_BODY_VOL_M_VOLUME_ABB: "음량",
IDS_YSM_HEADER_TV_AND_STB_ABB: "TV 및 셋톱 박스",
IDS_YSM_OPT_SLEEP_M_RESERVATION_ABB: "취침 예약"};
STMS.setStmsMap( map );
STMS.refreshAllStr();
});