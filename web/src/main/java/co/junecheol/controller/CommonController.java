package co.junecheol.controller;

import java.util.Properties;

import org.springframework.stereotype.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import co.junecheol.common.CommonFunc;

@Controller
public class CommonController {
	Logger log = LoggerFactory.getLogger(this.getClass().getName());

	private final Properties apiProps = CommonFunc.apiProp();
	private final String cookieNm = CommonFunc.siteProp().getProperty("site.cookieNm");
	private final String uploadPath = CommonFunc.siteProp().getProperty("site.uploadPath");
	
	public String goIndex(HttpServletRequest request) {

			return "/index";
	}
}
