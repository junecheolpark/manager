package co.junecheol.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.google.gson.JsonObject;

import co.junecheol.common.CommonFunc;
import co.junecheol.dto.CodeSelDTO;
import co.junecheol.dto.FileDTO;
import co.junecheol.service.CommonService;

@Controller
public class CommonController {
	Logger log = LoggerFactory.getLogger(this.getClass().getName());

	private final Properties apiProps = CommonFunc.apiProp();
	private final String cookieNm = CommonFunc.siteProp().getProperty("site.cookieNm");
	private final String uploadPath = CommonFunc.siteProp().getProperty("site.uploadPath");

	@Autowired
	MappingJackson2JsonView jsonView;

	@Autowired
	private CommonService commonService;

	// 메인사이트
	@RequestMapping(value = "/index")
	public String goIndex(HttpServletRequest request) {
		Boolean isLogin = false;
		// 쿠키 확인
		Cookie cokChk = findCookie(request, cookieNm);
		if (cokChk == null) {
			log.debug("쿠키 검색 안됨");
			isLogin = false;
		} else {
			isLogin = true;
		}

		if (isLogin) {
			return "/index";
		} else {
			return goErrorLogin();
		}
	}

	// 파라미터 에러
	@RequestMapping(value = "/errorParam")
	public String goErrorParam() {
		return "/exception/error_param";
	}

	// 에러
	@RequestMapping(value = "/error")
	public String goError() {
		return "/exception/error";
	}

	// 로그인 확인
	@RequestMapping(value = "/errorLogin")
	public String goErrorLogin() {
		return "/exception/error_login";
	}

	// 작업예정
	@RequestMapping(value = "/working")
	public String goWorking() {
		return "/exception/working";
	}

	/**
	 * 
	 * @Method Name : findCookie
	 * @작성일 : 2025. 7. 7.
	 * @작성자 : 박준철
	 * @Method 설명 :쿠키 조회
	 * @param request
	 * @param name
	 * @return
	 * 
	 */
	public Cookie findCookie(HttpServletRequest request, String name) {
		if (request.getCookies() == null) {
			return null;
		}
		return Arrays.stream(request.getCookies()).filter(cookie -> cookie.getName().equals(name)).findAny()
				.orElse(null);
	}

	// 코드 목록
	@RequestMapping(value = "/common/codeSelList", method = RequestMethod.GET)
	@ResponseBody
	public List<CodeSelDTO> codeSelList(@RequestParam Map<String, Object> map) throws Exception {
		//System.out.println("Controller codeSelList");

		// 전체 Map 출력
		log.info("map = " + map);
	    
		Integer pidx = Integer.valueOf(map.get("pidx").toString());
		String cid = (String) map.get("cid"), cnm = (String) map.get("cnm");
		CodeSelDTO dto = new CodeSelDTO();
		dto.setPARENT_IDX(pidx);
		dto.setCODE_ID(cid);
		dto.setCODE_NM(cnm);

		List<CodeSelDTO> list = new ArrayList<CodeSelDTO>();

		list = commonService.codeSelList(dto);
		log.info(list.toString());

		return list;
	}

	/*******************/
	/** 업무 보고 **/

	// 주간업무
	@RequestMapping(value = "/report/01")
	public String goReport01(HttpServletRequest request) {
		Boolean isLogin = false;

		// 쿠키 확인
		Cookie cokChk = findCookie(request, cookieNm);
		if (cokChk == null) {
			// log.info("쿠키 검색 안됨");
			isLogin = false;
		} else {
			isLogin = true;
		}

		if (isLogin) {
			return "/report/report_01";
		} else {
			return goErrorLogin();
		}
	}

	/*******************/
	/** 게시판 **/
	// 공지사항, 자료실, 업무공유
	@RequestMapping(value = "/clipboard/{type}")
	public String goClipboard01(@PathVariable String type, HttpServletRequest request) {
		Boolean isLogin = false;
		// 쿠키 확인
		Cookie cokChk = findCookie(request, cookieNm);
		if (cokChk == null) {
			// log.info("쿠키 검색 안됨");
			isLogin = false;
		} else {
			isLogin = true;
		}

		if (isLogin) {
			return "/clipboard/clipboard_01";
		} else {
			return goErrorLogin();
		}
	}

	/*******************/
	/** 일정 관리 **/
	// 사내일정
	@RequestMapping(value = "/schedule/01")
	public String goSchedule01(HttpServletRequest request) {
		Boolean isLogin = false;

		// 쿠키 확인
		Cookie cokChk = findCookie(request, cookieNm);
		if (cokChk == null) {
			// log.info("쿠키 검색 안됨");
			isLogin = false;
		} else {
			isLogin = true;
		}

		if (isLogin) {
			return "/schedule/schedule_01";
		} else {
			return goErrorLogin();
		}
	}

	// 프로젝트
	@RequestMapping(value = "/schedule/02")
	public String goSchedule02(HttpServletRequest request) {
		Boolean isLogin = false;

		// 쿠키 확인
		Cookie cokChk = findCookie(request, cookieNm);
		if (cokChk == null) {
			// log.info("쿠키 검색 안됨");
			isLogin = false;
		} else {
			isLogin = true;
		}

		if (isLogin) {
			return "/schedule/schedule_02";
		} else {
			return goErrorLogin();
		}
	}

	// 프로젝트 뷰
	@RequestMapping(value = "/schedule/02/view")
	public String goSchedule02View(HttpServletRequest request) {
		String pidx = request.getParameter("pidx");
		String cidx = request.getParameter("cidx");
		Boolean isLogin = false;

		// 쿠키 확인
		Cookie cokChk = findCookie(request, cookieNm);
		if (cokChk == null) {
			// log.info("쿠키 검색 안됨");
			isLogin = false;
		} else {
			isLogin = true;
		}

		if (isLogin) {
			if (CommonFunc.isEmpty(pidx) || CommonFunc.isEmpty(cidx)) {
				return goErrorParam();
			} else {
				return "/schedule/schedule_02_view";
			}
		} else {
			return goErrorLogin();
		}
	}

	/*******************/
	// 사용자 관리
	@RequestMapping(value = "/user/01")
	public String goCompany01(HttpServletRequest request) {
		Boolean isLogin = false;

		// 쿠키 확인
		Cookie cokChk = findCookie(request, cookieNm);
		if (cokChk == null) {
			// log.info("쿠키 검색 안됨");
			isLogin = false;
		} else {
			isLogin = true;
		}

		if (isLogin) {
			return "/user/user_01";
		} else {
			return goErrorLogin();
		}
	}

	/*******************/
	/** 시스템 관리 **/
	// 코드 관리
	@RequestMapping(value = "/system/01")
	public String goSystem01(HttpServletRequest request) {
		Boolean isLogin = false;

		// 쿠키 확인
		Cookie cokChk = findCookie(request, cookieNm);
		if (cokChk == null) {
			// log.info("쿠키 검색 안됨");
			isLogin = false;
		} else {
			isLogin = true;
		}

		if (isLogin) {
			return "/system/system_01";
		} else {
			return goErrorLogin();
		}
	}

	// 연차 관리
	@RequestMapping(value = "/system/02")
	public String goSystem02(HttpServletRequest request) {
		Boolean isLogin = false;

		// 쿠키 확인
		Cookie cokChk = findCookie(request, cookieNm);
		if (cokChk == null) {
			// log.info("쿠키 검색 안됨");
			isLogin = false;
		} else {
			isLogin = true;
		}

		if (isLogin) {
			return "/system/system_02";
		} else {
			return goErrorLogin();
		}
	}

	/*
	 * 파일 업로드 utype : 업로드 파일명 구분 - 1:UUID, 2:년월일시분초밀리초+실제 파일명 ufolder : 업로드할 폴더명
	 * uploadFiles : input[type=file] 요소
	 **/
	@PostMapping(value = "/common/fileupload", produces = "text/plain")
	public ModelAndView fileUpload(@RequestParam String utype, @RequestParam String ufolder, MultipartFile[] uploadFiles
	// , HttpServletRequest request
	) throws Exception {
		// String path = request.getServletContext().getRealPath("/");
		// log.info("path = " + path);
		// 응답용 객체를 생성하고, jsonView 를 사용하도록 합니다.
		ModelAndView model = new ModelAndView();
		model.setView(jsonView);

		// log.info("utype = " + utype);
		// log.info("ufolder = " + ufolder);

		if (ufolder.equals("")) {
			ufolder = "none";
		}

		String uploadFolder = uploadPath + "\\" + ufolder + "\\" + CommonFunc.datetimeStamp(5).substring(0, 6),
				fileRealNm = "", fileExt = "", fileNm = "", uniqueNm = "";
		int fidx = 1;
		long size = 0;
		File folder = new File(uploadFolder);

		if (!folder.exists()) {
			try {
				folder.mkdirs(); // 폴더 생성합니다.
				// log.info("폴더가 생성되었습니다.");
			} catch (Exception e) {
				e.getStackTrace();
			}
		} else {
			// log.info("이미 폴더가 생성되어 있습니다.");
		}

		List<FileDTO> list = new ArrayList<FileDTO>();

		for (MultipartFile multipartFile : uploadFiles) {
			size = multipartFile.getSize(); // 파일 사이즈
			fileRealNm = multipartFile.getOriginalFilename();
			System.out.println(fileRealNm);
			fileExt = fileRealNm.substring(fileRealNm.lastIndexOf("."), fileRealNm.length()); // 서버에 저장할 파일 확장자
			fileNm = "";

			if (utype.equals("2") || utype.equals("multi")) {
				uniqueNm = CommonFunc.datetimeStamp(8);
				fileNm = uniqueNm + "____" + fileRealNm;
			} else {
				UUID uuid = UUID.randomUUID();
				uniqueNm = uuid.toString();
				fileNm = uniqueNm + fileExt;
			}
			log.info("fileNm! : " + fileNm);
			FileDTO dto = new FileDTO();
			dto.setFILE_IDX(fidx);
			dto.setREAL_FILE_NM(fileRealNm);
			dto.setFILE_PATH(
					URLEncoder.encode(CommonFunc.encryptAES256(uploadFolder.replace(uploadPath, "")), "UTF-8"));
			dto.setFILE_NM(URLEncoder.encode(CommonFunc.encryptAES256(fileNm), "UTF-8"));
			dto.setFILE_SIZE(size);

			log.info("uploadPath : " + uploadFolder.replace(uploadPath, ""));
			log.info("fileRealNm : " + fileRealNm);
			log.info("uploadFolder : " + uploadFolder);
			log.info("fileNm : " + fileNm);
			log.info("fileExt : " + fileExt);
			log.info("size(byte) : " + size);

			File saveFile = new File(uploadFolder + "\\" + fileNm);

			try {
				multipartFile.transferTo(saveFile);

				dto.setUPLOAD_ST(1);
			} catch (IllegalStateException e) {
				dto.setUPLOAD_ST(2);
				e.printStackTrace();
			} catch (IOException e) {
				dto.setUPLOAD_ST(2);
				e.printStackTrace();
			}

			list.add(dto);

			fidx++;
		}

		model.addObject(list);

		return model;
	}

	// 파일 다운로드
	@RequestMapping(value = "/common/filedownload")
	public void fileDownload(HttpServletRequest request, HttpServletResponse response) throws Exception {
		log.debug("#########################");
		// ===전달 받은 정보를 가지고 파일객체 생성(S)===//
		String fpt = request.getParameter("fpt") // 저장된 경로
				, fnm = request.getParameter("fnm") // 저장된 파일이름
				, rfnm = request.getParameter("rfnm"); // 원래 파일이름
		log.debug(fpt);
		log.debug(fnm);
		log.debug(rfnm);
		try {
			fpt = CommonFunc.decryptAES256(fpt);
			fnm = CommonFunc.decryptAES256(fnm);

			// 웹사이트 루트디렉토리의 실제 디스크상의 경로 알아내기.
			String path = uploadPath + "\\" + fpt, fullPath = path + "\\" + fnm;
			log.debug("path : " + path);
			log.debug("fullPath : " + fullPath);
			File downloadFile = new File(fullPath);

			// ===전달 받은 정보를 가지고 파일객체 생성(E)===//

			// 파일 다운로드를 위해 컨테츠 타입을 application/download 설정
			// response.setContentType("application/download; charset=utf-8");

			// 파일 사이즈 지정
			response.setContentLength((int) downloadFile.length());

			// 다운로드 창을 띄우기 위한 헤더 조작
			response.setContentType("application/octet-stream; charset=utf-8");
			response.setHeader("Content-Disposition",
					"attachment;filename=" + new String(rfnm.getBytes("UTF-8"), "8859_1"));
			response.setHeader("Content-Transfer-Encoding", "binary");
			/*
			 * Content-disposition 속성 1) "Content-disposition: attachment" 브라우저 인식 파일확장자를
			 * 포함하여 모든 확장자의 파일들에 대해 , 다운로드시 무조건 "파일 다운로드" 대화상자가 뜨도록 하는 헤더속성이다 2)
			 * "Content-disposition: inline" 브라우저 인식 파일확장자를 가진 파일들에 대해서는 웹브라우저 상에서 바로 파일을
			 * 열고, 그외의 파일들에 대해서는 "파일 다운로드" 대화상자가 뜨도록 하는 헤더속성이다.
			 */

			FileInputStream fin = new FileInputStream(downloadFile);
			ServletOutputStream sout = response.getOutputStream();

			byte[] buf = new byte[1024];
			int size = -1;

			while ((size = fin.read(buf, 0, buf.length)) != -1) {
				sout.write(buf, 0, size);
			}

			fin.close();
			sout.close();
		} catch (IllegalStateException e) {
			log.error("error", e);
		} catch (IOException e) {
			log.error("error", e);
		}
		log.debug("#########################");
	}

	@RequestMapping(value = "/common/uploadImgOne")
	@ResponseBody
	public void communityImageUpload(HttpServletRequest req, HttpServletResponse resp,
			MultipartHttpServletRequest multiFile) throws Exception {
		PrintWriter printWriter = null; // 스트림에 출력
		OutputStream out = null;
		MultipartFile file = multiFile.getFile("upload");

		if (file != null) {
			if (file.getSize() > 0 && StringUtils.isNotBlank(file.getName())) { // String이 비어 있지 않고 null이 아닌지 확인할 뿐만 아니라
																				// 공백 문자열 이 아닌지
				if (file.getContentType().toLowerCase().startsWith("image/")) { // 지정한 문자로 시작하는지
					try {

						String fileName = file.getOriginalFilename(); // 업로드 되는 파일의 이름
						byte[] bytes = file.getBytes(); // getBytes -> 한글 정보손실방지

//						String path = req.getSession().getServletContext().getRealPath("/resources/images/upImg"); // 저장경로
						String path = uploadPath + "/ckeditor";
						log.debug("uploadPath:" + path);

						File uploadFile = new File(path);
						if (!uploadFile.exists()) { // 존재하지 않으면 생성
							uploadFile.mkdir();
						}
						String fileName2 = UUID.randomUUID().toString(); // 고유식별자
						path = path + "/" + fileName2;// + fileName;

						out = new FileOutputStream(new File(path)); // 파일 생성
						out.write(bytes);

						printWriter = resp.getWriter();
						String fileUrl = "/ckeditor/" + fileName2;// +"_"+ fileName; // url경로
						log.debug("fileUrl :" + fileUrl);
						JsonObject json = new JsonObject();
						json.addProperty("uploaded", 1);
						json.addProperty("fileName", fileName);
						json.addProperty("url", fileUrl);
						printWriter.print(json);
						log.debug(json.toString());
					} catch (IOException e) {
						log.error("error", e);
					} finally {
						if (out != null) {
							out.close();
						}
						if (printWriter != null) {
							printWriter.close();
						}
					}
				}

			}

		}
	}

}
