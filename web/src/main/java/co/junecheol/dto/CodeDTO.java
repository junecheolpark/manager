package co.junecheol.dto;

public class CodeDTO {
	private int CODE_IDX;
	private int PARENT_IDX; 
	private String CODE_ID; 
	private String CODE_NM; 
	private int CODE_DEPTH; 
	private int CODE_STS; 
	private int CODE_SORT; 
	private String REG_DATE; 
	private int REG_IDX; 
	private String MOD_DATE; 
	private int MOD_IDX; 
	private String DEL_DATE; 
	private int DEL_IDX;
	
	public CodeDTO() {}
	

	
	public CodeDTO(int CODE_IDX, 
			int PARENT_IDX, 
			String CODE_ID, 
			String CODE_NM, 
			int CODE_DEPTH, 
			int CODE_STS,
			int CODE_SORT, 
			String REG_DATE, 
			int REG_IDX, 
			String MOD_DATE, 
			int MOD_IDX, 
			String DEL_DATE, 
			int DEL_IDX) {
		super();
		this.CODE_IDX = CODE_IDX;
		this.PARENT_IDX = PARENT_IDX;
		this.CODE_ID = CODE_ID;
		this.CODE_NM = CODE_NM;
		this.CODE_DEPTH = CODE_DEPTH;
		this.CODE_STS = CODE_STS;
		this.CODE_SORT = CODE_SORT;
		this.REG_DATE = REG_DATE;
		this.REG_IDX = REG_IDX;
		this.MOD_DATE = MOD_DATE;
		this.MOD_IDX = MOD_IDX;
		this.DEL_DATE = DEL_DATE;
		this.DEL_IDX = DEL_IDX;
	}
	
	
	
	public int getCODE_IDX() {
		return CODE_IDX;
	}



	public void setCODE_IDX(int CODE_IDX) {
		this.CODE_IDX = CODE_IDX;
	}



	public int getPARENT_IDX() {
		return PARENT_IDX;
	}



	public void setPARENT_IDX(int PARENT_IDX) {
		this.PARENT_IDX = PARENT_IDX;
	}



	public String getCODE_ID() {
		return CODE_ID;
	}



	public void setCODE_ID(String CODE_ID) {
		this.CODE_ID = CODE_ID;
	}



	public String getCODE_NM() {
		return CODE_NM;
	}



	public void setCODE_NM(String CODE_NM) {
		this.CODE_NM = CODE_NM;
	}



	public int getCODE_DEPTH() {
		return CODE_DEPTH;
	}



	public void setCODE_DEPTH(int CODE_DEPTH) {
		this.CODE_DEPTH = CODE_DEPTH;
	}



	public int getCODE_STS() {
		return CODE_STS;
	}



	public void setCODE_STS(int CODE_STS) {
		this.CODE_STS = CODE_STS;
	}



	public int getCODE_SORT() {
		return CODE_SORT;
	}



	public void setCODE_SORT(int CODE_SORT) {
		this.CODE_SORT = CODE_SORT;
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



	public String getDEL_DATE() {
		return DEL_DATE;
	}



	public void setDEL_DATE(String DEL_DATE) {
		this.DEL_DATE = DEL_DATE;
	}



	public int getDEL_IDX() {
		return DEL_IDX;
	}



	public void setDEL_IDX(int DEL_IDX) {
		this.DEL_IDX = DEL_IDX;
	}



	@Override
	public String toString() {
		String codeDto = 	
		 "CodeDTO [" +
		 "CODE_IDX=" + CODE_IDX + 
		 ", PARENT_IDX=" + PARENT_IDX + 
		 ", CODE_ID=" + CODE_ID + 
		 ", CODE_NM=" + CODE_NM + 
		 ", CODE_DEPTH=" + CODE_DEPTH + 
		 ", CODE_STS=" + CODE_STS + 
		 ", CODE_SORT=" + CODE_SORT + 
		 ", REG_DATE=" + REG_DATE + 
		 ", REG_IDX=" + REG_IDX + 
		 ", MOD_DATE=" + MOD_DATE + 
		 ", MOD_IDX=" + MOD_IDX + 
		 ", DEL_DATE=" + DEL_DATE + 
		 ", DEL_IDX=" + DEL_IDX + 
		 "]";
		return codeDto;
	}


}
