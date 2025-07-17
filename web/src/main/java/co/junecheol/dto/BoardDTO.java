package co.junecheol.dto;

import java.util.Date;

import co.junecheol.common.CommonFunc;

public class BoardDTO {
	private int BOARD_IDX;// 게시물
	private int MASTER_BOARD_IDX; // 게시판
	private int PARENT_IDX; // 상위게시물
	private int IS_NOTICE; // 공지구분
	private boolean IS_SECRET; // 비밀글 여부
	private String PWD; // 비밀번호
	private int BOARD_THREAD; // 게시물 정렬
	private int BOARD_DEPTH; // 기시물 단계
	private String REG_NM; // 작성자
	private int READ_CNT; // 조회수
	private String SUBJ; // 제목
	private String CONTS; // 내용
	private boolean IS_SHOW; // 노출여부
	private String REG_DATE; // 등록일시
	private int REG_IDX; // 등록자
	private String MOD_DATE; // 수정일시
	private int MOD_IDX; // 수정자 IDX
	private int FILE_IDX; // 
	public BoardDTO() {
	}

	public BoardDTO(int BOARD_IDX, int MASTER_BOARD_IDX, int PARENT_IDX, int IS_NOTICE, boolean IS_SECRET, String PWD,
			int BOARD_THREAD, int BOARD_DEPTH, String REG_NM, int READ_CNT, String SUBJ, String CONTS, boolean IS_SHOW,
			String REG_DATE, int REG_IDX
			, String MOD_DATE
			, int MOD_IDX
			, int FILE_IDX
			) {
		super();
		this.BOARD_IDX = BOARD_IDX;
		this.MASTER_BOARD_IDX = MASTER_BOARD_IDX;
		this.PARENT_IDX = PARENT_IDX;
		this.IS_NOTICE = IS_NOTICE;
		this.IS_SECRET = IS_SECRET;
		this.PWD = PWD;
		this.BOARD_THREAD = BOARD_THREAD;
		this.BOARD_DEPTH = BOARD_DEPTH;
		this.REG_NM = REG_NM;
		this.READ_CNT = READ_CNT;
		this.SUBJ = SUBJ;
		this.CONTS = CONTS;
		this.IS_SHOW = IS_SHOW;
		this.REG_DATE = REG_DATE;
		this.REG_IDX = REG_IDX;
		this.MOD_DATE = MOD_DATE;
		this.MOD_IDX = MOD_IDX;
		this.MOD_IDX = MOD_IDX;
		this.FILE_IDX = FILE_IDX;
	}

	public int getBOARD_IDX() {
		return BOARD_IDX;
	}

	public int getMASTER_BOARD_IDX() {
		return MASTER_BOARD_IDX;
	}

	public int getPARENT_IDX() {
		return PARENT_IDX;
	}

	public int getIS_NOTICE() {
		return IS_NOTICE;
	}

	public boolean isIS_SECRET() {
		return IS_SECRET;
	}

	public String getPWD() {
		return PWD;
	}

	public int getBOARD_THREAD() {
		return BOARD_THREAD;
	}

	public int getBOARD_DEPTH() {
		return BOARD_DEPTH;
	}

	public String getREG_NM() {
		return REG_NM;
	}

	public int getREAD_CNT() {
		return READ_CNT;
	}

	public String getSUBJ() {
		return SUBJ;
	}

	public String getCONTS() {
		return CONTS;
	}

	public boolean isIS_SHOW() {
		return IS_SHOW;
	}

	public String getREG_DATE() {
		return REG_DATE;
	}

	public int getREG_IDX() {
		return REG_IDX;
	}

	public String getMOD_DATE() {
		return MOD_DATE;
	}

	public int getMOD_IDX() {
		return MOD_IDX;
	}

	public void setBOARD_IDX(int BOARD_IDX) {
		this.BOARD_IDX = BOARD_IDX;
	}

	public void setMASTER_BOARD_IDX(int MASTER_BOARD_IDX) {
		this.MASTER_BOARD_IDX = MASTER_BOARD_IDX;
	}

	public void setPARENT_IDX(int PARENT_IDX) {
		this.PARENT_IDX = PARENT_IDX;
	}

	public void setIS_NOTICE(int IS_NOTICE) {
		this.IS_NOTICE = IS_NOTICE;
	}

	public void setIS_SECRET(boolean IS_SECRET) {
		this.IS_SECRET = IS_SECRET;
	}

	public void setPWD(String PWD) {
		this.PWD = PWD;
	}

	public void setBOARD_THREAD(int BOARD_THREAD) {
		this.BOARD_THREAD = BOARD_THREAD;
	}

	public void setBOARD_DEPTH(int BOARD_DEPTH) {
		this.BOARD_DEPTH = BOARD_DEPTH;
	}

	public void setREG_NM(String REG_NM) {
		this.REG_NM = REG_NM;
	}

	public void setREAD_CNT(int READ_CNT) {
		this.READ_CNT = READ_CNT;
	}

	public void setSUBJ(String SUBJ) {
		this.SUBJ = SUBJ;
	}

	public void setCONTS(String CONTS) {
		this.CONTS = CONTS;
	}

	public void setIS_SHOW(boolean IS_SHOW) {
		this.IS_SHOW = IS_SHOW;
	}

	public void setREG_DATE(Date REG_DATE) {
		this.REG_DATE = CommonFunc.calculateTime(REG_DATE);
	}

	public void setREG_DATE(String REG_DATE) {
		this.REG_DATE = REG_DATE;
	}
	
	public void setREG_IDX(int REG_IDX) {
		this.REG_IDX = REG_IDX;
	}

	public void setMOD_DATE(String MOD_DATE) {
		this.MOD_DATE = MOD_DATE;
	}

	public void setMOD_IDX(int MOD_IDX) {
		this.MOD_IDX = MOD_IDX;
	}
	
	public int getFILE_IDX() {
		return FILE_IDX;
	}

	public void setFILE_IDX(int FILE_IDX) {
		this.FILE_IDX = FILE_IDX;
	}

	@Override
	public String toString() {
		String boardDto =
		"BoardDTO ["
		+ "BOARD_IDX=" + BOARD_IDX + 
		", MASTER_BOARD_IDX=" + MASTER_BOARD_IDX + 
		", PARENT_IDX=" + PARENT_IDX + 
		", IS_NOTICE=" + IS_NOTICE + 
		", IS_SECRET=" + IS_SECRET + 
		", PWD=" + PWD + 
		", BOARD_THREAD=" + BOARD_THREAD + 
		", BOARD_DEPTH=" + BOARD_DEPTH + 
		", REG_NM=" + REG_NM + 
		", READ_CNT=" + READ_CNT + 
		", SUBJ=" + SUBJ + 
		", CONTS=" + CONTS + 
		", IS_SHOW=" + IS_SHOW + 
		", REG_DATE=" + REG_DATE + 
		", REG_IDX=" + REG_IDX + 
		", MOD_DATE=" + MOD_DATE + 
		", MOD_IDX=" + MOD_IDX
		+ "]";
		return boardDto;
	};

}
