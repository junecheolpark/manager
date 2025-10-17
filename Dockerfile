# 1. Tomcat 8.5 + JDK 11 공식 이미지 사용
FROM tomcat:8.5-jdk11

# 2. 기존 웹앱 제거
RUN rm -rf /usr/local/tomcat/webapps/*

# 3. WAR 파일 복사 (루트 경로로 배포)
COPY ROOT.war /usr/local/tomcat/webapps/ROOT.war

# 4. 8080 포트 노출
EXPOSE 8080

# 5. Tomcat 실행
CMD ["catalina.sh", "run"]