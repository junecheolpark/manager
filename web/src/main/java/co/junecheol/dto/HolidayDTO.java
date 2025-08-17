package co.junecheol.dto;

public class HolidayDTO {
	private String HOLIDAY; 
	private int HOLIDAY_IDX; 
	private String HOLIDAY_NM; 
	private String REG_DATE;
	private int REG_IDX;
	private String MOD_DATE;
	private int MOD_IDX;
	
	public HolidayDTO () {}

	public HolidayDTO(String HOLIDAY, int HOLIDAY_IDX, String HOLIDAY_NM, String REG_DATE, int REG_IDX, String MOD_DATE,
			int MOD_IDX) {
		super();
		this.HOLIDAY = HOLIDAY;
		this.HOLIDAY_IDX = HOLIDAY_IDX;
		this.HOLIDAY_NM = HOLIDAY_NM;
		this.REG_DATE = REG_DATE;
		this.REG_IDX = REG_IDX;
		this.MOD_DATE = MOD_DATE;
		this.MOD_IDX = MOD_IDX;
	}

	public String getHOLIDAY() {
		return HOLIDAY;
	}

	public void setHOLIDAY(String HOLIDAY) {
		this.HOLIDAY = HOLIDAY;
	}

	public int getHOLIDAY_IDX() {
		return HOLIDAY_IDX;
	}

	public void setHOLIDAY_IDX(int HOLIDAY_IDX) {
		this.HOLIDAY_IDX = HOLIDAY_IDX;
	}

	public String getHOLIDAY_NM() {
		return HOLIDAY_NM;
	}

	public void setHOLIDAY_NM(String HOLIDAY_NM) {
		this.HOLIDAY_NM = HOLIDAY_NM;
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
	

	
	
	
}
