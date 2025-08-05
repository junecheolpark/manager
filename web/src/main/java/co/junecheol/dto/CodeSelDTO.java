package co.junecheol.dto;

public class CodeSelDTO {
	private int CODE_IDX;
	private int PARENT_IDX;
	private String CODE_ID;
	private String CODE_NM;
	
	public CodeSelDTO() {
		
	}
	
	public CodeSelDTO(
			int CODE_IDX,
			int PARENT_IDX,
			String CODE_ID,
			String CODE_NM) {		
		super();
		this.CODE_IDX = CODE_IDX;
		this.PARENT_IDX = PARENT_IDX;
		this.CODE_ID = CODE_ID;
		this.CODE_NM = CODE_NM;
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
	
	@Override
	public String toString() {
		String codeSelDto = 
				"CodeSelDTO [" +
				"CODE_IDX=" + CODE_IDX + 
				", PARENT_IDX=" + PARENT_IDX + 
				", CODE_ID=" + CODE_ID + 
				", CODE_NM=" + CODE_NM +
				"]";

		return codeSelDto;
	}
}
