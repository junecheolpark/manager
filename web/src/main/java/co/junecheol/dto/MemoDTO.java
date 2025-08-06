package co.junecheol.dto;

public class MemoDTO {
	private String REG_DATE; // 등록일시
	private int USER_IDX; // 노출여부
	private String MEMO; // 등록일시
	private int SHOW_TP; // 노출여부
	private int REG_IDX; // 등록자
	private String MOD_DATE; // 수정일시
	private int MOD_IDX; // 수정자 IDX

	public MemoDTO() {
	}

	public MemoDTO(String REG_DATE, int USER_IDX, String MEMO, int SHOW_TP, int REG_IDX, String MOD_DATE, int MOD_IDX) {
		super();
		this.REG_DATE = REG_DATE;
		this.USER_IDX = USER_IDX;
		this.MEMO = MEMO;
		this.SHOW_TP = SHOW_TP;
		this.REG_IDX = REG_IDX;
		this.MOD_DATE = MOD_DATE;
		this.MOD_IDX = MOD_IDX;
	}

	public String getREG_DATE() {
		return REG_DATE;
	}

	public void setREG_DATE(String REG_DATE) {
		this.REG_DATE = REG_DATE;
	}

	public int getUSER_IDX() {
		return USER_IDX;
	}

	public void setUSER_IDX(int USER_IDX) {
		this.USER_IDX = USER_IDX;
	}

	public String getMEMO() {
		return MEMO;
	}

	public void setMEMO(String MEMO) {
		this.MEMO = MEMO;
	}

	public int getSHOW_TP() {
		return SHOW_TP;
	}

	public void setSHOW_TP(int SHOW_TP) {
		this.SHOW_TP = SHOW_TP;
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
