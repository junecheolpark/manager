package co.junecheol.dto;

public class WorkInoutDTO {
	// private String CHECK_DATE;
	// private String CHECK_TIME;
	// private String END_TIME;
	private int USER_IDX;
	// private int INOUT_TP;

	private String WORK_DATE;
	private String IN_DATETIME;
	private String OUT_DATETIME;
	private String IN_TIME;
	private String OUT_TIME;
	private String HOLIDAY_NM;
	private int SCHEDULE_TP;
	private String CODE_NM;
	private String NM;

	public WorkInoutDTO() {
	}

	public WorkInoutDTO(String CHECK_DATE, String CHECK_TIME, String END_TIME, int USER_IDX, int INOUT_TP

			, String WORK_DATE, String IN_DATETIME, String OUT_DATETIME, String IN_TIME, String OUT_TIME,
			String HOLIDAY_NM, int SCHEDULE_TP, String CODE_NM, String NM) {
		super();
		this.WORK_DATE = WORK_DATE;
		this.IN_DATETIME = IN_DATETIME;
		this.OUT_DATETIME = OUT_DATETIME;
		this.IN_TIME = IN_TIME;
		this.OUT_TIME = OUT_TIME;
		this.HOLIDAY_NM = HOLIDAY_NM;

		// this.CHECK_DATE = CHECK_DATE;
		// this.CHECK_TIME = CHECK_TIME;
		// this.END_TIME = END_TIME;

		this.SCHEDULE_TP = SCHEDULE_TP;
		this.CODE_NM = CODE_NM;
		this.NM = NM;
	}

//	public String getCHECK_DATE() {
//		return CHECK_DATE;
//	}
//
//	public void setCHECK_DATE(String CHECK_DATE) {
//		this.CHECK_DATE = CHECK_DATE;
//	}
//
//	public String getCHECK_TIME() {
//		return CHECK_TIME;
//	}
//
//	public void setCHECK_TIME(String CHECK_TIME) {
//		this.CHECK_TIME = CHECK_TIME;
//	}
//
//	public String getEND_TIME() {
//		return END_TIME;
//	}
//
//	public void setEND_TIME(String END_TIME) {
//		this.END_TIME = END_TIME;
//	}

	public int getUSER_IDX() {
		return USER_IDX;
	}

	public void setUSER_IDX(int USER_IDX) {
		this.USER_IDX = USER_IDX;
	}

//	public int getINOUT_TP() {
//		return INOUT_TP;
//	}
//
//	public void setINOUT_TP(int INOUT_TP) {
//		this.INOUT_TP = INOUT_TP;
//	}

	public String getWORK_DATE() {
		return WORK_DATE;
	}

	public void setWORK_DATE(String WORK_DATE) {
		this.WORK_DATE = WORK_DATE;
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

	public int getSCHEDULE_TP() {
		return SCHEDULE_TP;
	}

	public void setSCHEDULE_TP(int SCHEDULE_TP) {
		this.SCHEDULE_TP = SCHEDULE_TP;
	}

	public String getCODE_NM() {
		return CODE_NM;
	}

	public void setCODE_NM(String CODE_NM) {
		this.CODE_NM = CODE_NM;
	}

	public String getNM() {
		return NM;
	}

	public void setNM(String NM) {
		this.NM = NM;
	}

	public String getHOLIDAY_NM() {
		return HOLIDAY_NM;
	}

	public void setHOLIDAY_NM(String hOLIDAY_NM) {
		HOLIDAY_NM = hOLIDAY_NM;
	}
}
