package co.junecheol.dto;

public class WeekWorkDTO {
	private int WEEK_WORK_CONTS_IDX; 
	private int YYYY; 
	private int WEEK_WORK; 
	private String USER_IDX; 
	private String USER_NM; 
	private int COMPANY_IDX; 
	private String COMPANY_NM; 
	private String PREV_CONTS; 
	private String NOW_CONTS; 
	private String REG_DATE; 
	private int REG_IDX; 
	private String MOD_DATE; 
	private int MOD_IDX; 
	private int ROW_CNT; 

	public WeekWorkDTO() {}
	
	

	public WeekWorkDTO(int WEEK_WORK_CONTS_IDX, int YYYY, int WEEK_WORK, String USER_IDX, String USER_NM,
			int COMPANY_IDX, String COMPANY_NM, String PREV_CONTS, String NOW_CONTS, String REG_DATE, int REG_IDX,
			String MOD_DATE
			, int MOD_IDX
			, int ROW_CNT
			) {
		super();
		this.WEEK_WORK_CONTS_IDX = WEEK_WORK_CONTS_IDX;
		this.YYYY = YYYY;
		this.WEEK_WORK = WEEK_WORK;
		this.USER_IDX = USER_IDX;
		this.USER_NM = USER_NM;
		this.COMPANY_IDX = COMPANY_IDX;
		this.COMPANY_NM = COMPANY_NM;
		this.PREV_CONTS = PREV_CONTS;
		this.NOW_CONTS = NOW_CONTS;
		this.REG_DATE = REG_DATE;
		this.REG_IDX = REG_IDX;
		this.MOD_DATE = MOD_DATE;
		this.MOD_IDX = MOD_IDX;
		this.ROW_CNT = ROW_CNT;
	}



	public int getWEEK_WORK_CONTS_IDX() {
		return WEEK_WORK_CONTS_IDX;
	}

	public void setWEEK_WORK_CONTS_IDX(int WEEK_WORK_CONTS_IDX) {
		this.WEEK_WORK_CONTS_IDX = WEEK_WORK_CONTS_IDX;
	}

	public int getYYYY() {
		return YYYY;
	}

	public void setYYYY(int YYYY) {
		this.YYYY = YYYY;
	}

	public int getWEEK_WORK() {
		return WEEK_WORK;
	}

	public void setWEEK_WORK(int WEEK_WORK) {
		this.WEEK_WORK = WEEK_WORK;
	}

	public String getUSER_IDX() {
		return USER_IDX;
	}

	public void setUSER_IDX(String USER_IDX) {
		this.USER_IDX = USER_IDX;
	}

	public String getUSER_NM() {
		return USER_NM;
	}

	public void setUSER_NM(String USER_NM) {
		this.USER_NM = USER_NM;
	}

	public int getCOMPANY_IDX() {
		return COMPANY_IDX;
	}

	public void setCOMPANY_IDX(int COMPANY_IDX) {
		this.COMPANY_IDX = COMPANY_IDX;
	}

	public String getCOMPANY_NM() {
		return COMPANY_NM;
	}

	public void setCOMPANY_NM(String COMPANY_NM) {
		this.COMPANY_NM = COMPANY_NM;
	}

	public String getPREV_CONTS() {
		return PREV_CONTS;
	}

	public void setPREV_CONTS(String PREV_CONTS) {
		this.PREV_CONTS = PREV_CONTS;
	}

	public String getNOW_CONTS() {
		return NOW_CONTS;
	}

	public void setNOW_CONTS(String NOW_CONTS) {
		this.NOW_CONTS = NOW_CONTS;
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
	
	public int getROW_CNT() {
		return ROW_CNT;
	}
	
	public void setROW_CNT(int ROW_CNT) {
		this.ROW_CNT = ROW_CNT;
	}

	
}
