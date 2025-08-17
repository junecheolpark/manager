package co.junecheol.dto;

public class MyScheduleDTO {
	private String TOTAL_TIME; 
	private int VACATION; 
	private int BUSINESS; 
	private float NOMAL_CNT; 
	private int HALFDAY;
	private int DOUBLEHALFDAY;

	public MyScheduleDTO() {}

	public MyScheduleDTO(String TOTAL_TIME, int VACATION, int BUSINESS, float NOMAL_CNT
			, int HALFDAY
			, int DOUBLEHALFDAY
			) {
		super();
		this.TOTAL_TIME = TOTAL_TIME;
		this.VACATION = VACATION;
		this.BUSINESS = BUSINESS;
		this.NOMAL_CNT = NOMAL_CNT;
		this.HALFDAY = HALFDAY;
		this.DOUBLEHALFDAY = DOUBLEHALFDAY;
		
	}

	public String getTOTAL_TIME() {
		return TOTAL_TIME;
	}

	public void setTOTAL_TIME(String TOTAL_TIME) {
		this.TOTAL_TIME = TOTAL_TIME;
	}

	public int getVACATION() {
		return VACATION;
	}

	public void setVACATION(int VACATION) {
		this.VACATION = VACATION;
	}

	public int getBUSINESS() {
		return BUSINESS;
	}

	public void setBUSINESS(int BUSINESS) {
		this.BUSINESS = BUSINESS;
	}

	public float getNOMAL_CNT() {
		return NOMAL_CNT;
	}

	public void setNOMAL_CNT(float NOMAL_CNT) {
		this.NOMAL_CNT = NOMAL_CNT;
	}

	public int getHALFDAY() {
		return HALFDAY;
	}

	public void setHALFDAY(int HALFDAY) {
		this.HALFDAY = HALFDAY;
	}

	public int getDOUBLEHALFDAY() {
		return DOUBLEHALFDAY;
	}

	public void setDOUBLEHALFDAY(int DOUBLEHALFDAY) {
		this.DOUBLEHALFDAY = DOUBLEHALFDAY;
	}
	
	
	

	

	
}
