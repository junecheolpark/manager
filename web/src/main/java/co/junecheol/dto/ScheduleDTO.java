package co.junecheol.dto;

public class ScheduleDTO {
	private int SCHEDULE_IDX;
	private int SCHEDULE_TP;
	private String SUBJ;
	private String CONTS;
	private String SDATE;
	private String STIME;
	private String EDATE;
	private String ETIME;
	private int AMPM;
	private int APPROVE_STS;
	private String REG_DATE;
	private int REG_IDX;
	private String MOD_DATE;
	private int MOD_IDX;
	private String CODE_NM;
	private String USER_NM;
	private String SCHEDULE_USER_IDX;

	private int YYYY;
	private int USER_IDX;
	private float NOMAL_CNT;
	private float USE_NOMAL_CNT;
	private String MEMO;
	private String IN_TIME;
	private String OUT_TIME;
	private String IN_DATETIME;
	private String OUT_DATETIME;

	private String HOLIDAY_NM;

	private String FILE_NM;
	private String FILE_PATH;
	private String REAL_FILE_NM;
	
	

	public ScheduleDTO() {
	}

	public ScheduleDTO(int SCHEDULE_IDX, int SCHEDULE_TP, String SUBJ, String CONTS, String SDATE, String STIME,
			String EDATE, String ETIME, int APPROVE_STS, String REG_DATE, int REG_IDX, String MOD_DATE, int MOD_IDX,
			String CODE_NM, String USER_NM, String SCHEDULE_USER_IDX, int YYYY, int USER_IDX, float NOMAL_CNT,
			float USE_NOMAL_CNT, String MEMO, String IN_TIME, String OUT_TIME, String IN_DATETIME, String OUT_DATETIME,
			String HOLIDAY_NM, int AMPM, String FILE_NM, String FILE_PATH, String REAL_FILE_NM) {
		super();
		this.SCHEDULE_IDX = SCHEDULE_IDX;
		this.SCHEDULE_TP = SCHEDULE_TP;
		this.SUBJ = SUBJ;
		this.CONTS = CONTS;
		this.SDATE = SDATE;
		this.STIME = STIME;
		this.EDATE = EDATE;
		this.ETIME = ETIME;
		this.APPROVE_STS = APPROVE_STS;
		this.REG_DATE = REG_DATE;
		this.REG_IDX = REG_IDX;
		this.MOD_DATE = MOD_DATE;
		this.MOD_IDX = MOD_IDX;
		this.CODE_NM = CODE_NM;
		this.USER_NM = USER_NM;
		this.SCHEDULE_USER_IDX = SCHEDULE_USER_IDX;
		this.YYYY = YYYY;
		this.USER_IDX = USER_IDX;
		this.NOMAL_CNT = NOMAL_CNT;
		this.USE_NOMAL_CNT = USE_NOMAL_CNT;
		this.MEMO = MEMO;
		this.IN_TIME = IN_TIME;
		this.OUT_TIME = OUT_TIME;
		this.IN_DATETIME = IN_DATETIME;
		this.OUT_DATETIME = OUT_DATETIME;
		this.HOLIDAY_NM = HOLIDAY_NM;
		this.AMPM = AMPM;
		this.FILE_NM = FILE_NM;
		this.FILE_PATH = FILE_PATH;
		this.REAL_FILE_NM = REAL_FILE_NM;
	}

	public int getSCHEDULE_IDX() {
		return SCHEDULE_IDX;
	}

	public void setSCHEDULE_IDX(int SCHEDULE_IDX) {
		this.SCHEDULE_IDX = SCHEDULE_IDX;
	}

	public int getSCHEDULE_TP() {
		return SCHEDULE_TP;
	}

	public void setSCHEDULE_TP(int SCHEDULE_TP) {
		this.SCHEDULE_TP = SCHEDULE_TP;
	}

	public String getSUBJ() {
		return SUBJ;
	}

	public void setSUBJ(String SUBJ) {
		this.SUBJ = SUBJ;
	}

	public String getCONTS() {
		return CONTS;
	}

	public void setCONTS(String CONTS) {
		this.CONTS = CONTS;
	}

	public String getSDATE() {
		return SDATE;
	}

	public void setSDATE(String SDATE) {
		this.SDATE = SDATE;
	}

	public String getSTIME() {
		return STIME;
	}

	public void setSTIME(String STIME) {
		this.STIME = STIME;
	}

	public String getEDATE() {
		return EDATE;
	}

	public void setEDATE(String EDATE) {
		this.EDATE = EDATE;
	}

	public String getETIME() {
		return ETIME;
	}

	public void setETIME(String ETIME) {
		this.ETIME = ETIME;
	}

	public int getAPPROVE_STS() {
		return APPROVE_STS;
	}

	public void setAPPROVE_STS(int APPROVE_STS) {
		this.APPROVE_STS = APPROVE_STS;
	}

	public String getREG_DATE() {
		return REG_DATE;
	}

	public void setREG_DATE(String REG_DATE) {
		this.REG_DATE = REG_DATE;
	}

	public int getREG_IDX() {
		return REG_IDX;
	}

	public void setREG_IDX(int REG_IDX) {
		this.REG_IDX = REG_IDX;
	}

	public String getMOD_DATE() {
		return MOD_DATE;
	}

	public void setMOD_DATE(String MOD_DATE) {
		this.MOD_DATE = MOD_DATE;
	}

	public int getMOD_IDX() {
		return MOD_IDX;
	}

	public void setMOD_IDX(int MOD_IDX) {
		this.MOD_IDX = MOD_IDX;
	}

	public String getCODE_NM() {
		return CODE_NM;
	}

	public void setCODE_NM(String CODE_NM) {
		this.CODE_NM = CODE_NM;
	}

	public String getUSER_NM() {
		return USER_NM;
	}

	public void setUSER_NM(String USER_NM) {
		this.USER_NM = USER_NM;
	}

	public String getSCHEDULE_USER_IDX() {
		return SCHEDULE_USER_IDX;
	}

	public void setSCHEDULE_USER_IDX(String SCHEDULE_USER_IDX) {
		this.SCHEDULE_USER_IDX = SCHEDULE_USER_IDX;
	}

	public int getYYYY() {
		return YYYY;
	}

	public void setYYYY(int YYYY) {
		this.YYYY = YYYY;
	}

	public int getUSER_IDX() {
		return USER_IDX;
	}

	public void setUSER_IDX(int USER_IDX) {
		this.USER_IDX = USER_IDX;
	}

	public float getNOMAL_CNT() {
		return NOMAL_CNT;
	}

	public void setNOMAL_CNT(float NOMAL_CNT) {
		this.NOMAL_CNT = NOMAL_CNT;
	}

	public float getUSE_NOMAL_CNT() {
		return USE_NOMAL_CNT;
	}

	public void setUSE_NOMAL_CNT(float USE_NOMAL_CNT) {
		this.USE_NOMAL_CNT = USE_NOMAL_CNT;
	}

	public String getMEMO() {
		return MEMO;
	}

	public void setMEMO(String MEMO) {
		this.MEMO = MEMO;
	}

	public String getIN_TIME() {
		return IN_TIME;
	}

	public void setIN_TIME(String IN_TIME) {
		this.IN_TIME = IN_TIME;
	}

	public String getOUT_TIME() {
		return OUT_TIME;
	}

	public void setOUT_TIME(String OUT_TIME) {
		this.OUT_TIME = OUT_TIME;
	}

	public String getIN_DATETIME() {
		return IN_DATETIME;
	}

	public void setIN_DATETIME(String IN_DATETIME) {
		this.IN_DATETIME = IN_DATETIME;
	}

	public String getOUT_DATETIME() {
		return OUT_DATETIME;
	}

	public void setOUT_DATETIME(String OUT_DATETIME) {
		this.OUT_DATETIME = OUT_DATETIME;
	}

	public String getHOLIDAY_NM() {
		return HOLIDAY_NM;
	}

	public void setHOLIDAY_NM(String hOLIDAY_NM) {
		this.HOLIDAY_NM = hOLIDAY_NM;
	}

	public int getAMPM() {
		return AMPM;
	}

	public void setAMPM(int aMPM) {
		this.AMPM = aMPM;
	}
	
	public String getFILE_NM() {
		return FILE_NM;
	}

	public void setFILE_NM(String FILE_NM) {
		this.FILE_NM = FILE_NM;
	}

	public String getFILE_PATH() {
		return FILE_PATH;
	}

	public void setFILE_PATH(String FILE_PATH) {
		this.FILE_PATH = FILE_PATH;
	}

	public String getREAL_FILE_NM() {
		return REAL_FILE_NM;
	}

	public void setREAL_FILE_NM(String REAL_FILE_NM) {
		this.REAL_FILE_NM = REAL_FILE_NM;
	}

	@Override
	public String toString() {
		String scheduleDto = "ScheduleDTO " + "[SCHEDULE_IDX=" + SCHEDULE_IDX + ", SCHEDULE_TP=" + SCHEDULE_TP
				+ ", SUBJ=" + SUBJ + ", CONTS=" + CONTS + ", SDATE=" + SDATE + ", STIME=" + STIME + ", EDATE=" + EDATE
				+ ", ETIME=" + ETIME + ", APPROVE_STS=" + APPROVE_STS + ", REG_DATE=" + REG_DATE + ", REG_IDX="
				+ REG_IDX + ", MOD_DATE=" + MOD_DATE + ", MOD_IDX=" + MOD_IDX + ", CODE_NM=" + CODE_NM + ", USER_NM="
				+ USER_NM + ", SCHEDULE_USER_IDX=" + SCHEDULE_USER_IDX + ", HOLIDAY_NM=" + HOLIDAY_NM + ", AMPM=" + AMPM
				+ "]";
		return scheduleDto;
	}

}
