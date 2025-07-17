package co.junecheol.dto;

public class FileDTO {
	private int BOARD_IDX;
	private int MAINTENANCE_IDX;
	private int FILE_IDX;
	private int FILE_TP;
	private int REG_IDX;
	private int MOD_IDX;
	private int UPLOAD_ST;
	private String REAL_FILE_NM;
	private String FILE_PATH;
	private String FILE_NM;
	private String FILE_TP_NM;
	private String REG_DATE;
	private String MOD_DATE;
	private float FILE_SIZE;

	public int getBOARD_IDX() {
		return BOARD_IDX;
	}

	public void setBOARD_IDX(int BOARD_IDX) {
		this.BOARD_IDX = BOARD_IDX;
	}

	public int getMAINTENANCE_IDX() {
		return MAINTENANCE_IDX;
	}

	public void setMAINTENANCE_IDX(int MAINTENANCE_IDX) {
		this.MAINTENANCE_IDX = MAINTENANCE_IDX;
	}

	public int getFILE_IDX() {
		return FILE_IDX;
	}

	public void setFILE_IDX(int FILE_IDX) {
		this.FILE_IDX = FILE_IDX;
	}

	public int getFILE_TP() {
		return FILE_TP;
	}

	public void setFILE_TP(int FILE_TP) {
		this.FILE_TP = FILE_TP;
	}

	public int getREG_IDX() {
		return REG_IDX;
	}

	public void setREG_IDX(int REG_IDX) {
		this.REG_IDX = REG_IDX;
	}

	public int getMOD_IDX() {
		return MOD_IDX;
	}

	public void setMOD_IDX(int MOD_IDX) {
		this.MOD_IDX = MOD_IDX;
	}
	
	public int getUPLOAD_ST() {
		return UPLOAD_ST;
	}

	public void setUPLOAD_ST(int UPLOAD_ST) {
		this.UPLOAD_ST = UPLOAD_ST;
	}	
	
	public String getREAL_FILE_NM() {
		return REAL_FILE_NM;
	}

	public void setREAL_FILE_NM(String REAL_FILE_NM) {
		this.REAL_FILE_NM = REAL_FILE_NM;
	}	

	public String getFILE_PATH() {
		return FILE_PATH;
	}

	public void setFILE_PATH(String FILE_PATH) {
		this.FILE_PATH = FILE_PATH;
	}

	public String getFILE_NM() {
		return FILE_NM;
	}

	public void setFILE_NM(String FILE_NM) {
		this.FILE_NM = FILE_NM;
	}

	public String getREG_DATE() {
		return REG_DATE;
	}

	public void setREG_DATE(String REG_DATE) {
		this.REG_DATE = REG_DATE;
	}

	public String getMOD_DATE() {
		return MOD_DATE;
	}

	public void setMOD_DATE(String MOD_DATE) {
		this.MOD_DATE = MOD_DATE;
	}

	public String getFILE_TP_NM() {
		return FILE_TP_NM;
	}

	public void setFILE_TP_NM(String FILE_TP_NM) {
		this.FILE_TP_NM = FILE_TP_NM;
	}

	public float getFILE_SIZE() {
		return FILE_SIZE;
	}

	public void setFILE_SIZE(float FILE_SIZE) {
		this.FILE_SIZE = FILE_SIZE;
	}
}
