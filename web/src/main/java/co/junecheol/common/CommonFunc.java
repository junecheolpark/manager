package co.junecheol.common;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.net.URLDecoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Random;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.util.Base64Utils;

import com.google.gson.JsonObject;

public class CommonFunc {
	
//	SHA 암호화
	public static String[] encryptSHA(Integer mdType, String pVal) {
		MessageDigest md;
		String[] arrReturn = new String[2];

		arrReturn[0] = "";
		arrReturn[1] = "";

		try {
			if (mdType == 2) {
				md = MessageDigest.getInstance("SHA-512");
				md.update(pVal.getBytes());
				arrReturn[0] = String.format("%0128x", new BigInteger(1, md.digest()));
			} else if (mdType == 3) {
				SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
				byte[] bytes = new byte[16];
				random.nextBytes(bytes);
				arrReturn[1] = new String(Base64.getEncoder().encode(bytes));

				md = MessageDigest.getInstance("SHA-256");
				md.update(arrReturn[1].getBytes());
				md.update(pVal.getBytes());
				arrReturn[0] = String.format("%064x", new BigInteger(1, md.digest()));
			} else {
				md = MessageDigest.getInstance("SHA-256");
				md.update(pVal.getBytes());
				arrReturn[0] = String.format("%064x", new BigInteger(1, md.digest()));
			}
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return arrReturn;
	}

	/*
	 * 양방향 암호화 : AES256
	 **/
	public static String alg = "AES/CBC/PKCS5Padding";
	private static final String key = "mHU2H9MHpaDX977GOfkqN2EQYYLIu76g"; // 32byte
	private static String iv = "ELm986gZpV9JnFR0"; // 16byte

//	암호화 AES256
	public static String encryptAES256(String text) throws Exception {
//		log.info("#######################");
//		log.info("text : " + text);
		
		Cipher cipher = Cipher.getInstance(alg);
		SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), "AES");
		IvParameterSpec ivParamSpec = new IvParameterSpec(iv.getBytes());
		cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivParamSpec);

		byte[] encrypted = cipher.doFinal(text.getBytes("UTF-8"));
		// String returnAES = Base64.getEncoder().encodeToString(encrypted);
		String returnAES = Base64Utils.encodeToUrlSafeString(encrypted);
//		log.info("returnAES : " + returnAES);
		
//		log.info("#######################");
		return returnAES;
	}

	/************************************/
	// 복호화 : AES256
	public static String decryptAES256(String cipherText) throws Exception {
//		log.info("#######################");
//		log.info("cipherText : " + cipherText);
		
		Cipher cipher = Cipher.getInstance(alg);
		SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), "AES");
		IvParameterSpec ivParamSpec = new IvParameterSpec(iv.getBytes());
		cipher.init(Cipher.DECRYPT_MODE, keySpec, ivParamSpec);

//		byte[] decodedBytes = Base64.getDecoder().decode(cipherText);
		byte[] decodedBytes = Base64Utils.decodeFromUrlSafeString(cipherText);
		byte[] decrypted = cipher.doFinal(decodedBytes);

		String returnAES = new String(decrypted, "UTF-8");
//		log.info("returnAES : " + returnAES);
		
//		log.info("#######################");
		return returnAES;
	}
   /************************************/
    
	/*
	 * 공백 또는 null 체크
	 **/ 	
	public static boolean isEmpty(Object obj) {
		if (obj == null)
			return true;
		if ((obj instanceof String) && (((String) obj).trim().length() == 0)) {
			return true;
		}
		if (obj instanceof Map) {
			return ((Map<?, ?>) obj).isEmpty();
		}
		if (obj instanceof Map) {
			return ((Map<?, ?>) obj).isEmpty();
		}
		if (obj instanceof List) {
			return ((List<?>) obj).isEmpty();
		}
		if (obj instanceof Object[]) {
			return (((Object[]) obj).length == 0);
		}
		return false;
	}

	/*
	 * 세션 확인
	 **/ 
	public static boolean sessionChk(HttpSession session) {
		boolean isSession = false;
		
    	if (session.getAttribute("idx") != null) {
    		isSession = true;
    	} else {
    		isSession = false;
    	}
    	
		
		return isSession;
	}
	
	/*
	 * 년월일분초밀리초 반환
	 * 1: yyyy-MM-dd
	 * 2: yyyy-MM-dd HH:mm
	 * 3: yyyy-MM-dd HH:mm:ss
	 * 4: yyyy-MM-dd HH:mm:ss.SSS
	 * 5: yyyyMMdd
	 * 6: yyyyMMddHHmm
	 * 7: yyyyMMddHHmmss
	 * 8: yyyyMMddHHmmssSSS 
	 **/
	public static String datetimeStamp(Integer formatType) {
		String datetimeStamp = ""
				, format = "";
		
		if (formatType == 1) format = "yyyy-MM-dd";
		else if (formatType == 2) format = "yyyy-MM-dd HH:mm";
		else if (formatType == 3) format = "yyyy-MM-dd HH:mm:ss";
		else if (formatType == 4) format = "yyyy-MM-dd HH:mm:ss.SSS";
		else if (formatType == 5) format = "yyyyMMdd";
		else if (formatType == 6) format = "yyyyMMddHHmm";
		else if (formatType == 7) format = "yyyyMMddHHmmss";
		else if (formatType == 8) format = "yyyyMMddHHmmssSSS";

		SimpleDateFormat dateFormat = new SimpleDateFormat(format); // SSS가 밀리세컨드 표시
		Calendar calendar = Calendar.getInstance();
		datetimeStamp = dateFormat.format(calendar.getTime());

		return datetimeStamp;
	}
	
	public static String calculateTime(Date date) {
		Date nowDate = new Date();
		
		SimpleDateFormat simple = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return simple.format(date);
		
	}
	
	// 파일 용량 단위
    public static String fileSizeType(String bytes) {
        String retFormat = "0";
       Double size = Double.parseDouble(bytes);

        String[] s = { "Byte", "KB", "MB", "GB", "TB", "PB" };        

        if (bytes != "0") {
              int idx = (int) Math.floor(Math.log(size) / Math.log(1024));
              DecimalFormat df = new DecimalFormat("#,###.##");
              double ret = ((size / Math.pow(1024, Math.floor(idx))));
              retFormat = df.format(ret) + " " + s[idx];
         } else {
              retFormat += " " + s[0];
         }

         return retFormat;
    }	
    
    // 랜덤 문자열(문자+숫자+특수문자) 8자리 생성
    public static String excuteGenerate() {
    	final char[] passwordTable =  { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 
                'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
                'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 
                'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&', '*',
                '(', ')', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' };    	
    	
        Random random = new Random(System.currentTimeMillis());
        int pwdLength = 8
        		, tablelength = passwordTable.length;
        StringBuffer buf = new StringBuffer();
        
        for(int i = 0; i < pwdLength; i++) {
            buf.append(passwordTable[random.nextInt(tablelength)]);
        }
        
        return buf.toString();
    }
    
    // 숫자 여부 확인
    public static boolean isNumeric(String s) {
        try {
            Double.parseDouble(s);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

//    API 설정 값 호출
	public static Properties apiProp() {
		String path = "config/api.properties";
		Properties prop = new Properties();
		ClassLoader loader = Thread.currentThread().getContextClassLoader();
		InputStream inputStream = loader.getResourceAsStream(path);

		try {
			prop.load(inputStream);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return prop;
	}

//	사이트 설정 값 호출
	public static Properties siteProp() {
		String path = "config/site.properties";
		Properties prop = new Properties();
		ClassLoader loader = Thread.currentThread().getContextClassLoader();
		InputStream inputStream = loader.getResourceAsStream(path);

		try {
			prop.load(inputStream);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return prop;
	}    
    
	/*
	 * \uac00 → '가'
	 * \ub098 → '나'
	 * 결과: Hello가나
	 * */
	public static String unescapeJava(String escaped) {
		if (!escaped.contains("\\u")) {
			return escaped;
		} else {
			String processed = "";

			int position = escaped.indexOf("\\u");
			
			while (position != -1) {
				if (position != 0) {
					processed += escaped.substring(0, position);
				}
				
				String token = escaped.substring(position + 2, position + 6);
				
				escaped = escaped.substring(position + 6);
				processed += (char) Integer.parseInt(token, 16);
				position = escaped.indexOf("\\u");
			}
			
			processed += escaped;
			
			return processed;
		}
	}

//	QueryString 값을 Json 형태로 변경
	public static JsonObject querystringToJson(String qs) {
	    String myStringDecoded = "";
	    
		try {
			myStringDecoded = URLDecoder.decode(qs, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    //System.out.println("myStringDecoded : " + myStringDecoded);

	    // Then we can break it down to its parts
	    // The & is used to operate values
	    String[] parts = myStringDecoded.split("&");

	    JsonObject json = new JsonObject();

	    for(String part: parts){
	      String[] keyVal = part.split("="); // The equal separates key and values
	        json.addProperty(keyVal[0], keyVal[1]);
	    }

	    //System.out.println(json);
	    return json;
	}	
	
    /****************************/
    /** 컨트롤에서 경고창 전달시 사용  **/
    /****************************/

//	언어셋 설정
	public static void init(HttpServletResponse response) {
		response.setContentType("text/html; charset=utf-8");
		response.setCharacterEncoding("utf-8");
	}

//	alert창 메시지
	public static void alert(			
			String alertTxt
			, HttpServletResponse response) throws IOException {
		init(response);
		PrintWriter out = response.getWriter();
		out.println("<script>alert('" + alertTxt + "');</script> ");
		out.flush();
	}

//	alert창 메시지 
	
	public static void alertBackPage(
			String alertTxt
			, Integer backPage
			, HttpServletResponse response) throws IOException {
		init(response);
		PrintWriter out = response.getWriter();
		out.println("<script>alert('" + alertTxt + "'); history.go(" + backPage + ");</script>");
		out.flush();
	}

//	alert창 메시지
	
	public static void alertMovePage(
			String alertTxt
			, String movePage
			, HttpServletResponse response) throws IOException {
		init(response);
		PrintWriter out = response.getWriter();
		out.println("<script>alert('" + alertTxt + "'); location.href='" + movePage + "';</script> ");
		out.flush();
	}
	
	/****************************/
	
}
